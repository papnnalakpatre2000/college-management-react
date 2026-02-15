import React, { useState, useRef } from 'react';

export default function StudentDetails() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const photoUrlRef = useRef(null);

  async function fetchProfilePhoto(studentId) {
    if (!studentId) return;
    try {
      const res = await fetch(`http://localhost:8080/api/admission/getProfilePhoto/${encodeURIComponent(studentId)}`);
      if (!res.ok) {
        // no photo or error
        return null;
      }
      const contentType = res.headers.get('content-type') || '';
      if (contentType.startsWith('image/')) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        // revoke previous
        if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
        photoUrlRef.current = url;
        setPhotoUrl(url);
        return url;
      }
      // maybe backend returns JSON with url
      if (contentType.includes('application/json')) {
        const body = await res.json();
        if (body && body.url) {
          if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
          photoUrlRef.current = body.url;
          setPhotoUrl(body.url);
          return body.url;
        }
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  async function handleGet() {
    if (!id) return;
    setLoading(true);
    setData(null);
    setPhotoUrl(null);
    try {
      const res = await fetch(`http://localhost:8080/api/admission/getStudent/${encodeURIComponent(id)}`);
      const contentType = res.headers.get('content-type') || '';
      let body;
      if (contentType.includes('application/json')) body = await res.json();
      else body = await res.text();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setData({ ok: true, body });
      // try fetch profile photo (best-effort)
      await fetchProfilePhoto(id);
    } catch (err) {
      setData({ ok: false, error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="student-area">
      <h2>Get Student</h2>
      <div className="student-controls">
        <input placeholder="Student ID" value={id} onChange={e => setId(e.target.value)} />
        <button onClick={handleGet} disabled={loading} className="btn">{loading ? 'Loading...' : 'Fetch'}</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Result</h3>
        {data ? (
          data.ok ? (
            <div className="student-card">
              <div className="student-photo-wrap">
                {photoUrl ? (
                  <img className="profile-photo" src={photoUrl} alt="Profile" />
                ) : (
                  <div className="profile-placeholder">No Photo</div>
                )}
              </div>
              <div className="student-info">
                <div><strong>Name:</strong> {data.body.name || data.body.student?.name}</div>
                <div><strong>Email:</strong> {data.body.email || data.body.student?.email}</div>
                <div><strong>Phone:</strong> {data.body.phone || data.body.student?.phone}</div>
                <div><strong>Course:</strong> {data.body.course || data.body.student?.course}</div>
                <div><strong>Address:</strong> {data.body.address || data.body.student?.address}</div>
                <div><strong>DOB:</strong> {data.body.dateOfBirth || data.body.student?.dateOfBirth}</div>
                <div><strong>Admission Date:</strong> {data.body.admissionDate || data.body.student?.admissionDate}</div>
                <div><strong>Fees:</strong> {data.body.fees || data.body.student?.fees}</div>
                <div><strong>Result10:</strong> {data.body.result10 || data.body.student?.result10}</div>
                <div><strong>Result12:</strong> {data.body.result12 || data.body.student?.result12}</div>
                <div><strong>Status:</strong> {data.body.status || data.body.student?.status}</div>
              </div>
            </div>
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 8 }}>{data.error}</pre>
          )
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 8 }}>No data</pre>
        )}
      </div>
    </div>
  );
}
