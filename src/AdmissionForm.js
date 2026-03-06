import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AdmissionForm() {
  const { id: editId } = useParams();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    course: '', // default selected course
    dateOfBirth: '',
    address: '',
    gender: '',
    admissionDate: '',
    fees: '',
    result10: '',
    result12: '',
    status: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const prevPreviewRef = useRef(null);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
        async function fetchPrograms() {
          try {
            const res = await fetch('http://localhost:8080/api/programs');
            if (res.ok) {
              const body = await res.json();
              setPrograms(Array.isArray(body) ? body : [body]);
            }
          } catch (err) {
            console.log('Failed to load programs');
          }
        }
        fetchPrograms();
      }, []);

      useEffect(() => {
    if (file && file.type && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);
      if (prevPreviewRef.current) URL.revokeObjectURL(prevPreviewRef.current);
      prevPreviewRef.current = url;
    } else {
      setFilePreview(null);
    }
    return () => {
      if (prevPreviewRef.current) {
        URL.revokeObjectURL(prevPreviewRef.current);
        prevPreviewRef.current = null;
      }
    };
  }, [file]);

  // If editing, fetch existing student data
  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!editId) return;
      try {
        const res = await fetch(`http://localhost:8080/api/admission/getStudent/${encodeURIComponent(editId)}`);
        const contentType = res.headers.get('content-type') || '';
        let body;
        if (contentType.includes('application/json')) body = await res.json();
        else body = await res.text();
        if (!res.ok) throw new Error(JSON.stringify(body));
        // backend might wrap student in `student` property
        const s = body.student || body;
        if (!mounted) return;
        setStudent({
          name: s.name || '',
          email: s.email || '',
          phone: s.phone || '',
          course: s.course || 'BCA',
          dateOfBirth: s.dateOfBirth ? s.dateOfBirth.split('T')[0] : (s.dateOfBirth || ''),
          address: s.address || '',
          gender: s.gender || 'Male',
          admissionDate: s.admissionDate ? s.admissionDate.split('T')[0] : (s.admissionDate || ''),
          fees: s.fees || '',
          result10: s.result10 || '',
          result12: s.result12 || '',
          status: s.status || 'PENDING',
        });
      } catch (err) {
        // ignore - user can still edit manually
        setResp({ ok: false, error: err.message || String(err) });
      }
    }
    load();
    return () => { mounted = false; };
  }, [editId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResp(null);

    const payload = {
      ...student,
      fees: student.fees ? Number(student.fees) : undefined,
      result10: student.result10 ? Number(student.result10) : undefined,
      result12: student.result12 ? Number(student.result12) : undefined,
    };

    try {
      let res;
      // If editing (editId present) call PUT multipart/form-data API
      if (editId) {
        // follow the backend's multipart/form-data update API (same as registration)
        const formData = new FormData();
        formData.append('student', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
        if (file) formData.append('file', file);

        res = await fetch(`http://localhost:8080/api/admission/updateStudent/${encodeURIComponent(editId)}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        const formData = new FormData();
        // ensure the 'student' part is sent with application/json so Spring can parse it
        formData.append('student', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
        if (file) formData.append('file', file);

        res = await fetch('http://localhost:8080/api/admission/registerStudent', {
          method: 'POST',
          body: formData,
        });
      }

      const contentType = res.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) data = await res.json();
      else data = await res.text();

      if (!res.ok) throw new Error(JSON.stringify(data));
      setResp({ ok: true, data });
      // optional: clear form on success
      if (!editId) {
        setStudent({ name: '', email: '', phone: '', course: '', dateOfBirth: '', address: '', gender: 'Male', admissionDate: '', fees: '', result10: '', result12: '', status: 'PENDING' });
        setFile(null);
      }
    } catch (err) {
      setResp({ ok: false, error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admission-form">
      <h2>{editId ? 'Update Student' : 'Register Student'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <label className="field-label">Full Name</label>
          <input className="field-input" name="name" placeholder="Enter your full name" value={student.name} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label className="field-label">Email</label>
          <input className="field-input" name="email" type="email" placeholder="Enter email address" value={student.email} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label className="field-label">Phone</label>
          <input className="field-input" name="phone" placeholder="Enter phone number" value={student.phone} onChange={handleChange} />
        </div>
       

        <div className="form-row">
          <label className="field-label">Course</label>
          <select className="field-input" name="course" value={student.course} onChange={handleChange}>
            <option value="">-- Select Course --</option>
            <option >BCA</option>
            <option >BBA</option>
            <option >MCA</option>
            <option >MSC</option>
            <option >BSC</option>
            <option >BCOM</option>
            {programs.map((prog, idx) => (
              <option key={idx} value={prog.name || prog.courseName}>
                {prog.name || prog.courseName}
              </option>
            ))}
            
          </select>
        </div>

        <div className="form-row">
          <label className="field-label">Date of Birth</label>
          <input className="field-input" name="dateOfBirth" type="date" value={student.dateOfBirth} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Address</label>
          <input className="field-input" name="address" placeholder="Enter address" value={student.address} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Gender</label>
          <select className="field-input" name="gender" value={student.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-row">
          <label className="field-label">Admission Date</label>
          <input className="field-input" name="admissionDate" type="date" value={student.admissionDate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Fees</label>
          <input className="field-input" name="fees" type="number" placeholder="Enter fees amount" value={student.fees} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">10th Percentage</label>
          <input className="field-input" name="result10" type="number" placeholder="Enter 10th result" value={student.result10} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">12th Percentage</label>
          <input className="field-input" name="result12" type="number" placeholder="Enter 12th result" value={student.result12} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Status</label>
          <select className="field-input" name="status" value={student.status} onChange={handleChange}>
            <option>REGISTER</option>
            <option>WITHDRAW</option>
            <option>GRADUATED</option>
            <option>REMOVED</option>
            <option>REJECTED</option>
            <option>REGISTERED</option>
            <option>PENDING</option>

          </select>
        </div>
        

        <div className="form-row">
          <label className="field-label">Upload Profile Photo</label>
          <input className="field-input" type="file" accept="image/*,application/pdf" onChange={e => setFile(e.target.files && e.target.files[0])} />
        </div>

        {filePreview && (
          <div className="form-row file-preview">
            <label className="field-label">Preview</label>
            <img src={filePreview} alt="preview" style={{ maxWidth: 200, borderRadius: 6 }} />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn" disabled={loading}>{loading ? (editId ? 'Updating...' : 'Sending...') : (editId ? 'Update' : 'Submit')}</button>
          <button type="button" className="btn" onClick={() => { setStudent({ name: '', email: '', phone: '', course: 'BCA', dateOfBirth: '', address: '', admissionDate: '', fees: '', result10: '', result12: '', status: 'Register' }); setFile(null); setResp(null); }} style={{ background: '#777' }}>Reset</button>
        </div>
      </form>

      <div style={{ marginTop: 16 }}>
        <h3>Response</h3>
        {resp ? (
          resp.ok ? (
            <div className="response-success">
              <div>Student registered successfully.</div>
              <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 8 }}>{JSON.stringify(resp.data, null, 2)}</pre>
            </div>
          ) : (
            <div className="response-error">
              <strong>Error:</strong>
              <pre style={{ whiteSpace: 'pre-wrap', background: '#fff3f3', padding: 8, color: '#900' }}>{resp.error}</pre>
            </div>
          )
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 8 }}>No response yet</pre>
        )}
      </div>
    </div>
  );
}
