import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const navigate = useNavigate();

  const departments = [
    { id: 'management', name: 'Management Department', path: '/departments' },
    { id: 'computer', name: 'Computer Department', path: '/departments' },
    { id: 'hospitality', name: 'Hospitality Study Department', path: '/departments' },
  ];

  const handleDepartmentClick = (dept) => {
    navigate(dept.path, { state: { selectedDept: dept.id } });
    setShowDeptDropdown(false);
  };
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("https://images.unsplash.com/photo-1427504494785-cddc0c3c8271?w=1200&h=900&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      {/* Overlay for better text visibility */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }}></div>

      {/* Content Container */}
      <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
      <section style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 40, marginBottom: 12, color: '#fff' }}>College Management System</h2>
        <p style={{ color: '#e0e0e0', fontSize: 18 }}>
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

        <div
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
            color: 'white',
            borderRadius: 8,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={() => setShowDeptDropdown(true)}
          onMouseLeave={() => setShowDeptDropdown(false)}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏛️</div>
          <h3 style={{ fontSize: 20, margin: 0 }}>Departments</h3>
          <p style={{ fontSize: 14, margin: '4px 0 0 0' }}>Manage academic departments</p>

          {/* Dropdown Menu */}
          {showDeptDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                color: '#333',
                borderRadius: '0 0 8px 8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                marginTop: 8,
                zIndex: 100,
                overflow: 'hidden',
              }}
            >
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => handleDepartmentClick(dept)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    transition: 'background-color 0.2s',
                    backgroundColor: '#fff',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                >
                  {dept.name}
                </div>
              ))}
            </div>
          )}
        </div>
        </section>

      <section style={{ marginTop: 40, color: '#000', background: 'rgba(255,255,255,0.95)', padding: 24, borderRadius: 8 }}>
        <h3 style={{ fontSize: 22, color: '#000', marginBottom: 16 }}>Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
          <div>
            <h4 style={{ color: '#000' }}>📋 Admission Management</h4>
            <ul style={{ margin: '8px 0', paddingLeft: 20, color: '#000' }}>
              <li>Register new students</li>
              <li>Update student records</li>
              <li>Delete student records</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#000' }}>👥 Student Management</h4>
            <ul style={{ margin: '8px 0', paddingLeft: 20, color: '#000' }}>
              <li>Search students by name</li>
              <li>View student details</li>
              <li>Edit & delete students</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#000' }}>📚 Library Management</h4>
            <ul style={{ margin: '8px 0', paddingLeft: 20, color: '#000' }}>
              <li>Manage books & inventory</li>
              <li>Issue & return books</li>
              <li>Track borrowing history</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#000' }}>🏛️ Department Management</h4>
            <ul style={{ margin: '8px 0', paddingLeft: 20, color: '#000' }}>
              <li>Create & update departments</li>
              <li>List all departments</li>
              <li>Delete departments</li>
            </ul>
          </div>
          
        </div>
      </section>
      </div>
    </div>
  );
}
