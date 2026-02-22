import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function StudentDetails() {
  const [id, setId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
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
      
      // Debug: log the entire response to see field names
      console.log('Student response:', body);
      
      // Extract student object (might be wrapped)
      const student = body.student || body;
      console.log('Student object:', student);
      
      // Check common field names for image/photo
      const photoFields = ['photo', 'image', 'profilePhoto', 'profileImage', 'picture', 'file', 'fileData', 'imageData', 'photoData'];
      for (const field of photoFields) {
        if (student[field]) {
          console.log(`Found image in field: ${field}`, student[field]);
          if (typeof student[field] === 'string') {
            if (student[field].startsWith('data:')) {
              setPhotoUrl(student[field]);
              return; // Stop after finding first image
            } else {
              // Assume it's base64
              setPhotoUrl(`data:image/jpeg;base64,${student[field]}`);
              return;
            }
          }
        }
      }
      
      // If no photo found in response, try the separate endpoint
      await fetchProfilePhoto(id);
    } catch (err) {
      setData({ ok: false, error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    if (!window.confirm(`Are you sure you want to delete student ${id}? This action cannot be undone.`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/admission/deleteStudent/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const contentType = res.headers.get('content-type') || '';
      let body;
      if (contentType.includes('application/json')) body = await res.json();
      else body = await res.text();
      if (!res.ok) throw new Error(JSON.stringify(body));
      // Clear form after successful deletion
      setId('');
      setData({ ok: true, body: { message: body } });
      setPhotoUrl(null);
    } catch (err) {
      setData({ ok: false, error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    if (!searchName) return;
    setLoading(true);
    setSearchResults(null);
    try {
      const res = await fetch(`http://localhost:8080/api/admission/searchStudents?name=${encodeURIComponent(searchName)}`);
      const contentType = res.headers.get('content-type') || '';
      let body;
      if (contentType.includes('application/json')) body = await res.json();
      else body = await res.text();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setSearchResults({ ok: true, results: Array.isArray(body) ? body : [body] });
    } catch (err) {
      setSearchResults({ ok: false, error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteFromSearch(studentId) {
    if (!studentId) return;
    if (!window.confirm(`Are you sure you want to delete student ${studentId}? This action cannot be undone.`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/admission/deleteStudent/${encodeURIComponent(studentId)}`, {
        method: 'DELETE',
      });
      const contentType = res.headers.get('content-type') || '';
      let body;
      if (contentType.includes('application/json')) body = await res.json();
      else body = await res.text();
      if (!res.ok) throw new Error(JSON.stringify(body));
      // Refresh search results after deletion
      if (searchResults) {
        const updatedResults = searchResults.results.filter(s => (s.id || s.admissionId) !== studentId);
        setSearchResults({ ok: true, results: updatedResults });
      }
    } catch (err) {
      setSearchResults({ ok: false, error: err.message || String(err) });
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

      <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #ddd' }}>
        <h2>Search Student by Name</h2>
        <div className="student-controls">
          <input placeholder="Student Name" value={searchName} onChange={e => setSearchName(e.target.value)} />
          <button onClick={handleSearch} disabled={loading} className="btn">{loading ? 'Searching...' : 'Search'}</button>
        </div>
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
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <Link to={`/studentregist/${encodeURIComponent(id)}`} className="btn">Edit Student</Link>
                  <button onClick={handleDelete} disabled={loading} className="btn" style={{ background: '#d32f2f' }}>
                    {loading ? 'Deleting...' : 'Delete Student'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 8 }}>{data.error}</pre>
          )
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 8 }}>No data</pre>
        )}
      </div>

      {searchResults && (
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #ddd' }}>
          <h3>Search Results</h3>
          {searchResults.ok ? (
            searchResults.results && searchResults.results.length > 0 ? (
              <div style={{ display: 'grid', gap: 16 }}>
                {searchResults.results.map((student, idx) => {
                  // Find image from common field names
                  const photoFields = ['photo', 'image', 'profilePhoto', 'profileImage', 'picture', 'file', 'fileData', 'imageData', 'photoData'];
                  let photoUrl = null;
                  for (const field of photoFields) {
                    if (student[field]) {
                      if (typeof student[field] === 'string') {
                        photoUrl = student[field].startsWith('data:') ? student[field] : `data:image/jpeg;base64,${student[field]}`;
                        break;
                      }
                    }
                  }
                  
                  return (
                    <div key={idx} className="student-card">
                      <div className="student-photo-wrap">
                        {photoUrl ? (
                          <img 
                            className="profile-photo" 
                            src={photoUrl} 
                            alt="Profile" 
                          />
                        ) : (
                          <div className="profile-placeholder">No Photo</div>
                        )}
                      </div>
                      <div className="student-info">
                        <div><strong>ID:</strong> {student.id || student.admissionId || 'N/A'}</div>
                        <div><strong>Name:</strong> {student.name || 'N/A'}</div>
                        <div><strong>Email:</strong> {student.email || 'N/A'}</div>
                        <div><strong>Phone:</strong> {student.phone || 'N/A'}</div>
                        <div><strong>Course:</strong> {student.course || 'N/A'}</div>
                        <div><strong>Address:</strong> {student.address || 'N/A'}</div>
                        <div><strong>DOB:</strong> {student.dateOfBirth || 'N/A'}</div>
                        <div><strong>Admission Date:</strong> {student.admissionDate || 'N/A'}</div>
                        <div><strong>Fees:</strong> {student.fees || 'N/A'}</div>
                        <div><strong>Result10:</strong> {student.result10 || 'N/A'}</div>
                        <div><strong>Result12:</strong> {student.result12 || 'N/A'}</div>
                        <div><strong>Status:</strong> {student.status || 'N/A'}</div>
                        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                          <Link to={`/studentregist/${encodeURIComponent(student.id || student.admissionId)}`} className="btn">Edit Student</Link>
                          <button onClick={() => handleDeleteFromSearch(student.id || student.admissionId)} disabled={loading} className="btn" style={{ background: '#d32f2f' }}>
                            {loading ? 'Deleting...' : 'Delete Student'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 8 }}>No students found with that name</pre>
            )
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap', background: '#fff3f3', padding: 8, color: '#900' }}>{searchResults.error}</pre>
          )}
        </div>
      )}
    </div>
  );
}
