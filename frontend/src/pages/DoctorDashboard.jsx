import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  QrCode,
  ScanLine,
  Activity,
  History,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [patientEmail, setPatientEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSimulatingScan, setIsSimulatingScan] = useState(false);

  const handleVerifyAccess = async (otpToVerify) => {
    const code = otpToVerify || accessCode;
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://127.0.0.1:5000/api/doctor-access/verify', {
        patientEmail,
        otp: code
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      navigate('/view-patient-records', { state: res.data });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired access code');
    } finally {
      setIsLoading(false);
      setIsSimulatingScan(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container" style={{ background: 'var(--bg-body)' }}>
      <Sidebar handleLogout={handleLogout} />

      <main className="main-content" style={{ padding: '0 0 3rem 0', maxWidth: '100%', margin: '0' }}>
        <Navbar userProfile={user} />

        <div style={{ padding: '0 4rem' }}>
          <div className="section-title" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Doctor Access</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) 0.8fr', gap: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Search Section */}
              <div className="dashboard-card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Patient Search Bar</h3>
                <div style={{ position: 'relative' }}>
                  <Search style={{ 
                    position: 'absolute', 
                    left: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: 'var(--text-muted)' 
                  }} size={20} />
                  <input 
                    type="text" 
                    placeholder="Enter Patient Name or ID..." 
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3.5rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-soft)',
                      fontSize: '1rem'
                    }}
                  />
                  <button className="btn btn-primary" style={{
                    position: 'absolute',
                    right: '8px',
                    top: '8px',
                    bottom: '8px',
                    padding: '0 1.5rem',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    Search
                  </button>
                </div>
              </div>

              {/* PIN Access Card */}
              <div className="dashboard-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Verify Secure Session</h3>
                  <p className="text-sm text-secondary">Enter the patient's email and the 6-digit session PIN.</p>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontWeight: '700' }}>Patient Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="patient@example.com"
                    style={{ height: '54px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                  />
                </div>

                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="000000"
                    maxLength="6"
                    style={{ 
                      textAlign: 'center',
                      fontSize: '2rem', 
                      letterSpacing: '1rem', 
                      fontWeight: '800',
                      fontFamily: 'monospace',
                      height: '80px',
                      background: 'var(--bg-soft)',
                      border: '2px solid var(--border-color)'
                    }}
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                <button 
                  onClick={() => handleVerifyAccess()}
                  className="btn btn-primary w-full" 
                  style={{ height: '56px', fontSize: '1rem' }}
                  disabled={isLoading || accessCode.length !== 6}
                >
                  <UserCheck size={20} />
                  {isLoading ? 'Verifying Access...' : 'Authorize Access'}
                </button>

                {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
              </div>
            </div>

            {/* QR Section */}
            <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--bg-body)', border: '1px dashed var(--border-color)' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>QR Code Area</h3>
                <p className="text-secondary text-sm">Scan patient's QR code for instant access</p>
              </div>

              <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: 'var(--shadow-xl)',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                border: '1px solid var(--border-color)'
              }}>
                <QrCode size={120} strokeWidth={1.5} />
              </div>

              <button className="btn btn-secondary w-full" style={{ padding: '1rem' }}>
                <ScanLine size={18} />
                Open QR Scanner
              </button>

              <div style={{ marginTop: 'auto', paddingTop: '2rem', width: '100%' }}>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <ShieldCheck size={20} color="var(--primary)" style={{ margin: '0 auto' }} />
                    <span className="text-xs font-bold">Encrypted</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <History size={20} color="var(--primary)" style={{ margin: '0 auto' }} />
                    <span className="text-xs font-bold">Auto-Expire</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
