import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function StudentDetails() {
  const [id, setId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [allStudents, setAllStudents] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('fetchById');
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
    setSearchResults(null);
    setPhotoUrl(null);
    setActiveTab('fetchById');
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
    if (!searchName) {
      return;
    }
    setLoading(true);
    setSearchResults(null);
    setData(null);
    setActiveTab('searchByName');
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

  async function handleFetchAllStudents() {
    setLoading(true);
    setAllStudents(null);
    setData(null);
    setSearchResults(null);
    setActiveTab('viewAll');
    try {
      const res = await fetch(`http://localhost:8080/api/admission/getAllStudents`);
      const contentType = res.headers.get('content-type') || '';
      let body;
      if (contentType.includes('application/json')) body = await res.json();
      else body = await res.text();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setAllStudents({ ok: true, results: Array.isArray(body) ? body : [body] });
    } catch (err) {
      setAllStudents({ ok: false, error: err.message || String(err) });
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
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', background: '#f5f7fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', fontSize: 36, marginBottom: 32 }}>Student Management</h1>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: '3px solid #ddd', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            setActiveTab('fetchById');
            setSearchResults(null);
          }}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: activeTab === 'fetchById' ? '#1976d2' : '#f0f0f0',
            color: activeTab === 'fetchById' ? 'white' : '#666',
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0',
            fontWeight: activeTab === 'fetchById' ? 'bold' : 'normal',
            fontSize: 16,
            transition: 'all 0.3s'
          }}
        >
          🔍 Search by ID
        </button>
        <button
          onClick={() => {
            setActiveTab('searchByName');
            setData(null);
            setPhotoUrl(null);
          }}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: activeTab === 'searchByName' ? '#28a745' : '#f0f0f0',
            color: activeTab === 'searchByName' ? 'white' : '#666',
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0',
            fontWeight: activeTab === 'searchByName' ? 'bold' : 'normal',
            fontSize: 16,
            transition: 'all 0.3s'
          }}
        >
          🔎 Search by Name
        </button>
        <button
          onClick={() => {
            handleFetchAllStudents();
          }}
          disabled={loading}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: activeTab === 'viewAll' ? '#ff9800' : '#f0f0f0',
            color: activeTab === 'viewAll' ? 'white' : '#666',
            cursor: loading ? 'not-allowed' : 'pointer',
            borderRadius: '8px 8px 0 0',
            fontWeight: activeTab === 'viewAll' ? 'bold' : 'normal',
            fontSize: 16,
            transition: 'all 0.3s'
          }}
        >
          {loading && activeTab === 'viewAll' ? '⏳ Loading...' : '👥 View All Students'}
        </button>
      </div>

      {/* Fetch by ID Section */}
      {activeTab === 'fetchById' && (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#333', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28 }}>🔍</span> Fetch Student by ID
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Enter Student ID"
              value={id}
              onChange={e => setId(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleGet()}
              style={{
                flex: 1,
                minWidth: 200,
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: 8,
                fontSize: 14,
                transition: 'border-color 0.3s',
                outline: 'none'
              }}
              onFocus={e => e.target.style.borderColor = '#1976d2'}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            />
          <button
            onClick={handleGet}
            disabled={loading}
            style={{
              padding: '12px 28px',
              background: loading ? '#ccc' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: 14,
              transition: 'background 0.3s'
            }}
            onMouseOver={e => !loading && (e.target.style.background = '#1565c0')}
            onMouseOut={e => !loading && (e.target.style.background = '#1976d2')}
          >
            {loading ? '⏳ Fetching...' : '🔍 Fetch'}
          </button>
          </div>
        </div>
      )}

      {/* Search by Name Section */}
      {activeTab === 'searchByName' && (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#333', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28 }}>🔎</span> Search Students by Name
          </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            placeholder="Enter Student Name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              minWidth: 200,
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = '#28a745'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: '12px 28px',
              background: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: 14,
              transition: 'background 0.3s'
            }}
            onMouseOver={e => !loading && (e.target.style.background = '#218838')}
            onMouseOut={e => !loading && (e.target.style.background = '#28a745')}
          >
            {loading ? '⏳ Searching...' : '🔍 Search'}
          </button>
        </div>
        </div>
      )}

      {/* Results Section */}

      {/* Get Student Result */}
      {activeTab === 'fetchById' && data && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#333', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28 }}>👤</span> Fetched Student Details
          </h2>
          {data.ok ? (
            <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'start' }}>
                {/* Photo */}
                <div style={{ textAlign: 'center' }}>
                  {photoUrl ? (
                    <img
                      className="profile-photo"
                      src={photoUrl}
                      alt="Profile"
                      style={{ width: 200, height: 200, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                  ) : (
                    <div style={{ width: 200, height: 200, borderRadius: 12, background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 40 }}>
                      📷
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                    {[
                      { label: 'Name', value: data.body.name || data.body.student?.name },
                      { label: 'Email', value: data.body.email || data.body.student?.email },
                      { label: 'Phone', value: data.body.phone || data.body.student?.phone },
                      { label: 'Course', value: data.body.course || data.body.student?.course },
                      { label: 'Gender', value: data.body.gender || data.body.student?.gender },
                      { label: 'Address', value: data.body.address || data.body.student?.address },
                      { label: 'Date of Birth', value: data.body.dateOfBirth || data.body.student?.dateOfBirth },
                      { label: 'Admission Date', value: data.body.admissionDate || data.body.student?.admissionDate },
                      { label: 'Fees', value: data.body.fees || data.body.student?.fees },
                      { label: 'Result 10th', value: data.body.result10 || data.body.student?.result10 },
                      { label: 'Result 12th', value: data.body.result12 || data.body.student?.result12 },
                      { label: 'Status', value: data.body.status || data.body.student?.status },
                    ].map((field, idx) => (
                      <div key={idx} style={{ padding: 12, background: '#f9f9f9', borderRadius: 8, borderLeft: '4px solid #1976d2' }}>
                        <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{field.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{field.value || 'N/A'}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Link
                      to={`/studentregist/${encodeURIComponent(id)}`}
                      style={{
                        padding: '12px 20px',
                        background: '#007bff',
                        color: 'white',
                        borderRadius: 8,
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background 0.3s'
                      }}
                      onMouseOver={e => e.target.style.background = '#0056b3'}
                      onMouseOut={e => e.target.style.background = '#007bff'}
                    >
                      ✏️ Edit Student
                    </Link>
                    <button
                      onClick={handleDelete}
                      disabled={loading}
                      style={{
                        padding: '12px 20px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: 8,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        transition: 'background 0.3s'
                      }}
                      onMouseOver={e => !loading && (e.target.style.background = '#c82333')}
                      onMouseOut={e => !loading && (e.target.style.background = '#dc3545')}
                    >
                      🗑️ Delete Student
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: '#fff3cd', padding: 16, borderRadius: 8, border: '1px solid #ffc107', color: '#856404' }}>
              ⚠️ {data.error}
            </div>
          )}
        </div>
      )}

      {activeTab === 'searchByName' && searchResults && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ color: '#333', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28 }}>📋</span> Search Results ({searchResults.results?.length || 0})
          </h2>
          {searchResults.ok ? (
            searchResults.results && searchResults.results.length > 0 ? (
              <div style={{ display: 'grid', gap: 20 }}>
                {searchResults.results.map((student, idx) => {
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
                    <div key={idx} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'start' }}>
                        {/* Photo */}
                        <div style={{ textAlign: 'center' }}>
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt="Profile"
                              style={{ width: 180, height: 180, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                            />
                          ) : (
                            <div style={{ width: 180, height: 180, borderRadius: 12, background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 36 }}>
                              📷
                            </div>
                          )}
                          <div style={{ marginTop: 12, fontSize: 13, color: '#666', fontWeight: 'bold' }}>
                            {student.admissionId || student.id || 'N/A'}
                          </div>
                        </div>

                        {/* Details */}
                        <div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 16 }}>
                            {[
                              { label: '👤 Name', value: student.name },
                              { label: '📧 Email', value: student.email },
                              { label: '📱 Phone', value: student.phone },
                              { label: '📚 Course', value: student.course },
                              { label: '⚤ Gender', value: student.gender },
                              { label: '🏠 Address', value: student.address },
                              { label: '🎂 DOB', value: student.dateOfBirth },
                              { label: '📅 Admission Date', value: student.admissionDate },
                              { label: '💰 Fees', value: student.fees },
                              { label: '📊 Result 10th', value: student.result10 },
                              { label: '📊 Result 12th', value: student.result12 },
                              { label: '✅ Status', value: student.status },
                            ].map((field, fIdx) => (
                              <div key={fIdx} style={{ padding: 12, background: '#f9f9f9', borderRadius: 6, borderLeft: '3px solid #28a745' }}>
                                <div style={{ fontSize: 12, color: '#666', marginBottom: 3 }}>{field.label}</div>
                                <div style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>{field.value || '—'}</div>
                              </div>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', borderTop: '1px solid #e0e0e0', paddingTop: 16 }}>
                            <Link
                              to={`/studentregist/${encodeURIComponent(student.id || student.admissionId)}`}
                              style={{
                                padding: '10px 18px',
                                background: '#007bff',
                                color: 'white',
                                borderRadius: 6,
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: 13,
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                              }}
                              onMouseOver={e => e.target.style.background = '#0056b3'}
                              onMouseOut={e => e.target.style.background = '#007bff'}
                            >
                              ✏️ Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteFromSearch(student.id || student.admissionId)}
                              disabled={loading}
                              style={{
                                padding: '10px 18px',
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: '600',
                                fontSize: 13,
                                transition: 'background 0.3s'
                              }}
                              onMouseOver={e => !loading && (e.target.style.background = '#c82333')}
                              onMouseOut={e => !loading && (e.target.style.background = '#dc3545')}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: '#e7f3ff', padding: 24, borderRadius: 8, border: '1px solid #b3d9ff', color: '#004085', textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>🔍</div>
                No students found with the name "{searchName}"
              </div>
            )
          ) : (
            <div style={{ background: '#f8d7da', padding: 16, borderRadius: 8, border: '1px solid #f5c6cb', color: '#721c24' }}>
              ❌ Error: {searchResults.error}
            </div>
          )}
        </div>
      )}

      {activeTab === 'viewAll' && allStudents && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ color: '#333', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28 }}>👥</span> All Students ({allStudents.results?.length || 0})
          </h2>
          {allStudents.ok ? (
            allStudents.results && allStudents.results.length > 0 ? (
              <div style={{ display: 'grid', gap: 20 }}>
                {allStudents.results.map((student, idx) => {
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
                    <div key={idx} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'start' }}>
                        {/* Photo */}
                        <div style={{ textAlign: 'center' }}>
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt="Profile"
                              style={{ width: 180, height: 180, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                            />
                          ) : (
                            <div style={{ width: 180, height: 180, borderRadius: 12, background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 36 }}>
                              📷
                            </div>
                          )}
                          <div style={{ marginTop: 12, fontSize: 13, color: '#666', fontWeight: 'bold' }}>
                            {student.admissionId || student.id || 'N/A'}
                          </div>
                        </div>

                        {/* Details */}
                        <div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 16 }}>
                            {[
                              { label: '👤 Name', value: student.name },
                              { label: '📧 Email', value: student.email },
                              { label: '📱 Phone', value: student.phone },
                              { label: '📚 Course', value: student.course },
                              { label: '⚤ Gender', value: student.gender },
                              { label: '🏠 Address', value: student.address },
                              { label: '🎂 DOB', value: student.dateOfBirth },
                              { label: '📅 Admission Date', value: student.admissionDate },
                              { label: '💰 Fees', value: student.fees },
                              { label: '📊 Result 10th', value: student.result10 },
                              { label: '📊 Result 12th', value: student.result12 },
                              { label: '✅ Status', value: student.status },
                            ].map((field, fIdx) => (
                              <div key={fIdx} style={{ padding: 12, background: '#f9f9f9', borderRadius: 6, borderLeft: '3px solid #ff9800' }}>
                                <div style={{ fontSize: 12, color: '#666', marginBottom: 3 }}>{field.label}</div>
                                <div style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>{field.value || '—'}</div>
                              </div>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', borderTop: '1px solid #e0e0e0', paddingTop: 16 }}>
                            <Link
                              to={`/studentregist/${encodeURIComponent(student.id || student.admissionId)}`}
                              style={{
                                padding: '10px 18px',
                                background: '#007bff',
                                color: 'white',
                                borderRadius: 6,
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: 13,
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                              }}
                              onMouseOver={e => e.target.style.background = '#0056b3'}
                              onMouseOut={e => e.target.style.background = '#007bff'}
                            >
                              ✏️ Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteFromSearch(student.id || student.admissionId)}
                              disabled={loading}
                              style={{
                                padding: '10px 18px',
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: '600',
                                fontSize: 13,
                                transition: 'background 0.3s'
                              }}
                              onMouseOver={e => !loading && (e.target.style.background = '#c82333')}
                              onMouseOut={e => !loading && (e.target.style.background = '#dc3545')}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: '#e7f3ff', padding: 24, borderRadius: 8, border: '1px solid #b3d9ff', color: '#004085', textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>📭</div>
                No students found in the system
              </div>
            )
          ) : (
            <div style={{ background: '#f8d7da', padding: 16, borderRadius: 8, border: '1px solid #f5c6cb', color: '#721c24' }}>
              ❌ Error: {allStudents.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
