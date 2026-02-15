import './App.css';
import AdmissionForm from './AdmissionForm';
import StudentDetails from './StudentDetails';
import { useState } from 'react';

function App() {
  const [view, setView] = useState('form');

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Admission Demo</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setView('form')} style={{ marginRight: 8 }}>Register Student</button>
        <button onClick={() => setView('get')}>Get Student</button>
      </div>
      <div>
        {view === 'form' ? <AdmissionForm /> : <StudentDetails />}
      </div>
    </div>
  );
}

export default App;
