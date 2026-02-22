import './App.css';
import AdmissionForm from './AdmissionForm';
import StudentDetails from './StudentDetails';
import HomePage from './HomePage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Admission Demo</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studentregist" element={<AdmissionForm />} />
        <Route path="/studentregist/:id" element={<AdmissionForm />} />
        <Route path="/students" element={<StudentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
