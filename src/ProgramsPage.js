import React, { useState, useEffect } from 'react';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function fetchPrograms() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('http://localhost:8080/api/programs');
      const body = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setPrograms(Array.isArray(body) ? body : [body]);
      setMessage({ ok: true, msg: 'Programs loaded' });
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', background: '#f5f7fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', fontSize: 36, marginBottom: 32 }}>Programs</h1>

      {message && (
        <div style={{ color: message.ok ? 'green' : 'red', marginBottom: 16, padding: 8 }}>
          {message.msg}
        </div>
      )}

      {loading && <div style={{ textAlign: 'center', padding: 20 }}>Loading programs...</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
        {/* Left Sidebar */}
        <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: 16 }}>
          <div style={{ background: '#FFC107', color: 'white', padding: 12, borderRadius: 4, marginBottom: 16, fontWeight: 'bold', textAlign: 'center' }}>
            PROGRAMS
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {programs.map((prog, idx) => (
              <li key={idx} style={{ padding: 8, borderBottom: '1px solid #eee', cursor: 'pointer', color: '#1976d2' }}>
                ▸ {prog.name || prog.courseName || 'Program'}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content Area */}
        <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: 24 }}>
          <h2 style={{ color: '#FFC107', marginTop: 0, marginBottom: 24, textAlign: 'center' }}>Programs Details</h2>

          {programs.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No programs available</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#FFC107', color: 'white' }}>
                  <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left', fontWeight: 'bold' }}>Sr.No</th>
                  <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left', fontWeight: 'bold' }}>Course</th>
                  <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left', fontWeight: 'bold' }}>Duration</th>
                  <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left', fontWeight: 'bold' }}>Intake</th>
                  <th colSpan="3" style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center', fontWeight: 'bold' }}>Syllabus</th>
                </tr>
                <tr style={{ background: '#FFC107', color: 'white' }}>
                  <th style={{ border: '1px solid #ddd', padding: 12 }}></th>
                  <th style={{ border: '1px solid #ddd', padding: 12 }}></th>
                  <th style={{ border: '1px solid #ddd', padding: 12 }}></th>
                  <th style={{ border: '1px solid #ddd', padding: 12 }}></th>
                  <th style={{ border: '1px solid #ddd', padding: 12, fontWeight: 'bold' }}>I Year</th>
                  <th style={{ border: '1px solid #ddd', padding: 12, fontWeight: 'bold' }}>II Year</th>
                  <th style={{ border: '1px solid #ddd', padding: 12, fontWeight: 'bold' }}>III Year</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((prog, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <td style={{ border: '1px solid #ddd', padding: 12 }}>{idx + 1}</td>
                    <td style={{ border: '1px solid #ddd', padding: 12 }}>{prog.name || prog.courseName || '-'}</td>
                    <td style={{ border: '1px solid #ddd', padding: 12 }}>{prog.duration || '-'} Years</td>
                    <td style={{ border: '1px solid #ddd', padding: 12 }}>{prog.intake || '-'}</td>
                    <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>
                      {prog.syllabus1Year ? (
                        <a href={prog.syllabus1Year} target="_blank" rel="noopener noreferrer" style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold' }}>
                          Download
                        </a>
                      ) : (
                        <span style={{ color: '#999' }}>-</span>
                      )}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>
                      {prog.syllabus2Year ? (
                        <a href={prog.syllabus2Year} target="_blank" rel="noopener noreferrer" style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold' }}>
                          Download
                        </a>
                      ) : (
                        <span style={{ color: '#999' }}>-</span>
                      )}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>
                      {prog.syllabus3Year ? (
                        <a href={prog.syllabus3Year} target="_blank" rel="noopener noreferrer" style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold' }}>
                          Download
                        </a>
                      ) : (
                        <span style={{ color: '#999' }}>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
