import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import MyReports from './pages/MyReports';
import UploadRecord from './pages/UploadRecord';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientLogs from './pages/PatientLogs';
import PatientRecordView from './pages/PatientRecordView';
import DietPlanner from './pages/DietPlanner';
import ShareAccess from './pages/ShareAccess';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/upload-record" element={<UploadRecord />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-logs" element={<PatientLogs />} />
        <Route path="/view-patient-records" element={<PatientRecordView />} />
        <Route path="/diet-planner" element={<DietPlanner />} />
        <Route path="/share-access" element={<ShareAccess />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
