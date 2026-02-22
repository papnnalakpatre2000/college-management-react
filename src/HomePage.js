import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
      <section style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 32, marginBottom: 8 }}>Welcome to College Management</h2>
        <p style={{ color: '#555', fontSize: 16 }}>
          Manage student admissions quickly and easily. Register new students,
          or view registered student details.
        </p>
      </section>

      <section style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <Link to="/studentregist" style={{
          padding: '12px 20px',
          background: '#1976d2',
          color: 'white',
          borderRadius: 6,
          textDecoration: 'none'
        }}>
          Student Registration
        </Link>

        <Link to="/students" style={{
          padding: '12px 20px',
          background: '#eee',
          color: '#333',
          borderRadius: 6,
          textDecoration: 'none'
        }}>
          View Students
        </Link>
      </section>

      <section style={{ marginTop: 28, color: '#666' }}>
        <h3 style={{ fontSize: 18 }}>Quick Start</h3>
        <ul>
          <li>Click "Student Registration" to add a new student.</li>
          <li>Click "View Students" to see saved student details.</li>
        </ul>
      </section>
    </div>
  );
}
