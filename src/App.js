import './App.css';
import AdmissionForm from './AdmissionForm';
import StudentDetails from './StudentDetails';
import HomePage from './HomePage';
import LibraryDashboard from './LibraryDashboard';
import DepartmentPage from './DepartmentPage';
import ProgramsPage from './ProgramsPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* Header/Navbar */}
      <header style={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: 'white',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        marginBottom: 0
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Logo/Icon */}
          <div style={{
            fontSize: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            flexShrink: 0
          }}>
            🎓
          </div>
          
          {/* College Info */}
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 4px 0', fontSize: 32, fontWeight: 'bold' }}>ITM College</h1>
            <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>Institute of Technology & Management</p>
          </div>

          {/* Tagline/Contact */}
          <div style={{ textAlign: 'right', fontSize: 14 }}>
            <p style={{ margin: '4px 0' }}>📞 Excellence in Education</p>
            <p style={{ margin: '4px 0', opacity: 0.9 }}>Empowering Future Leaders</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/studentregist" element={<AdmissionForm />} />
          <Route path="/studentregist/:id" element={<AdmissionForm />} />
          <Route path="/students" element={<StudentDetails />} />
          <Route path="/library" element={<LibraryDashboard />} />
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#1976d2',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: 40,
        borderTop: '4px solid #1565c0'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ margin: '8px 0' }}>© 2024 ITM College. All rights reserved.</p>
          <p style={{ margin: '8px 0', fontSize: 13, opacity: 0.9 }}>College Management System | Dedicated to Academic Excellence</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
