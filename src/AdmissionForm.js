import React, { useState, useRef, useEffect } from 'react';

export default function AdmissionForm() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    dateOfBirth: '',
    address: '',
    admissionDate: '',
    fees: '',
    result10: '',
    result12: '',
    status: 'PENDING',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const prevPreviewRef = useRef(null);

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
      const formData = new FormData();
      // ensure the 'student' part is sent with application/json so Spring can parse it
      formData.append('student', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
      if (file) formData.append('file', file);

      const res = await fetch('http://localhost:8080/api/admission/registerStudent', {
        method: 'POST',
        body: formData,
      });

      const contentType = res.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) data = await res.json();
      else data = await res.text();

      if (!res.ok) throw new Error(JSON.stringify(data));
      setResp({ ok: true, data });
      // optional: clear form on success
      setStudent({
        name: '', email: '', phone: '', course: '', dateOfBirth: '', address: '', admissionDate: '', fees: '', result10: '', result12: '', status: 'PENDING'
      });
      setFile(null);
    } catch (err) {
      setResp({ ok: false, error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admission-form">
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <label className="field-label">Name</label>
          <input className="field-input" name="name" value={student.name} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label className="field-label">Email</label>
          <input className="field-input" name="email" type="email" value={student.email} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label className="field-label">Phone</label>
          <input className="field-input" name="phone" value={student.phone} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Course</label>
          <input className="field-input" name="course" value={student.course} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Date of Birth</label>
          <input className="field-input" name="dateOfBirth" type="date" value={student.dateOfBirth} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Address</label>
          <input className="field-input" name="address" value={student.address} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Admission Date</label>
          <input className="field-input" name="admissionDate" type="date" value={student.admissionDate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Fees</label>
          <input className="field-input" name="fees" type="number" value={student.fees} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Result 10</label>
          <input className="field-input" name="result10" type="number" value={student.result10} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Result 12</label>
          <input className="field-input" name="result12" type="number" value={student.result12} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="field-label">Status</label>
          <select className="field-input" name="status" value={student.status} onChange={handleChange}>
            <option>PENDING</option>
            <option>APPROVED</option>
            <option>REJECTED</option>
          </select>
        </div>

        <div className="form-row">
          <label className="field-label">File (optional)</label>
          <input className="field-input" type="file" accept="image/*,application/pdf" onChange={e => setFile(e.target.files && e.target.files[0])} />
        </div>

        {filePreview && (
          <div className="form-row file-preview">
            <label className="field-label">Preview</label>
            <img src={filePreview} alt="preview" style={{ maxWidth: 200, borderRadius: 6 }} />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn" disabled={loading}>{loading ? 'Sending...' : 'Submit'}</button>
          <button type="button" className="btn" onClick={() => { setStudent({ name: '', email: '', phone: '', course: '', dateOfBirth: '', address: '', admissionDate: '', fees: '', result10: '', result12: '', status: 'PENDING' }); setFile(null); setResp(null); }} style={{ background: '#777' }}>Reset</button>
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
