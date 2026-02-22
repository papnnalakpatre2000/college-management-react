import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <section style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 40, marginBottom: 12, color: '#1976d2' }}>College Management System</h2>
        <p style={{ color: '#666', fontSize: 18 }}>
          Manage student admissions, view student records, and manage library books all in one place.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 32 }}>
        <Link to="/studentregist" style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          borderRadius: 8,
          textDecoration: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onMouseOver={e => e.target.style.transform = 'translateY(-4px)'}
        onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
          <h3 style={{ fontSize: 20, margin: 0 }}>Student Registration</h3>
          <p style={{ fontSize: 14, margin: '4px 0 0 0' }}>Register new students</p>
        </Link>

        <Link to="/students" style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          color: 'white',
          borderRadius: 8,
          textDecoration: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onMouseOver={e => e.target.style.transform = 'translateY(-4px)'}
        onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>
          <h3 style={{ fontSize: 20, margin: 0 }}>View Students</h3>
          <p style={{ fontSize: 14, margin: '4px 0 0 0' }}>Manage student details</p>
        </Link>

        <Link to="/library" style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
          color: 'white',
          borderRadius: 8,
          textDecoration: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onMouseOver={e => e.target.style.transform = 'translateY(-4px)'}
        onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>📚</div>
          <h3 style={{ fontSize: 20, margin: 0 }}>Library Management</h3>
          <p style={{ fontSize: 14, margin: '4px 0 0 0' }}>Manage books and issues</p>
        </Link>
      </section>

      <section style={{ marginTop: 40, color: '#666', background: '#f9f9f9', padding: 24, borderRadius: 8 }}>
        <h3 style={{ fontSize: 22, color: '#333', marginBottom: 16 }}>Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
          <div>
            <h4>📋 Admission Management</h4>
            <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
              <li>Register new students</li>
              <li>Update student records</li>
              <li>Delete student records</li>
            </ul>
          </div>
          <div>
            <h4>👥 Student Management</h4>
            <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
              <li>Search students by name</li>
              <li>View student details</li>
              <li>Edit & delete students</li>
            </ul>
          </div>
          <div>
            <h4>📚 Library Management</h4>
            <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
              <li>Manage books & inventory</li>
              <li>Issue & return books</li>
              <li>Track borrowing history</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
