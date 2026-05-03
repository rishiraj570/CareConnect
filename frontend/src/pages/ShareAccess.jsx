import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, 
  Clock, 
  ShieldAlert, 
  Activity, 
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const ShareAccess = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [otp, setOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        
        // Check if there's an existing valid OTP
        if (res.data.accessOtp && new Date(res.data.accessOtpExpires) > new Date()) {
          setOtp(res.data.accessOtp);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const generateOtp = async () => {
    setIsGenerating(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://127.0.0.1:5000/api/patient/generate-otp', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOtp(res.data.otp);
    } catch (err) {
      console.error('OTP Generation Error:', err);
      alert('Failed to generate sharing code.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRevokeAccess = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:5000/api/patient/revoke-otp', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOtp(null);
      alert('Medical access revoked successfully. Your records are now private.');
    } catch (err) {
      console.error('Revoke Error:', err);
      alert('Failed to revoke access.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="loading-screen" style={{ background: 'var(--bg-body)', color: 'var(--primary)' }}>
        <Activity size={48} className="animate-pulse" />
        <p style={{ marginTop: '1rem' }}>Loading Security Suite...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ background: 'var(--bg-body)' }}>
      <Sidebar handleLogout={handleLogout} />

      <main className="main-content" style={{ padding: '0 0 3rem 0', maxWidth: '100%', margin: '0' }}>
        <Navbar userProfile={profile} />

        <div style={{ padding: '0 4rem' }}>
          <div className="section-title" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Share Medical Access</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) 0.8fr', gap: '3rem', alignItems: 'start' }}>
            {/* Main Content Area */}
            <div className="dashboard-card" style={{ padding: '3.5rem', textAlign: 'center', background: 'var(--bg-surface)' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'var(--primary-light)', 
                color: 'var(--primary)', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 2rem'
              }}>
                <QrCode size={32} />
              </div>

              <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Secure Sharing Portal</h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                Generate a temporary, encrypted QR code and 6-digit PIN. The medical professional can choose to scan the QR or enter the PIN to view your records for a specific session.
              </p>

              <div style={{ 
                background: 'white', 
                padding: '3rem', 
                borderRadius: '32px', 
                display: 'inline-block',
                boxShadow: '0 30px 60px rgba(0, 102, 255, 0.12)',
                border: '1px solid var(--border-color)',
                marginBottom: '3rem',
                position: 'relative'
              }}>
                {otp ? (
                  <>
                    <QRCodeSVG value={String(otp)} size={280} level="H" includeMargin={true} />
                    <div style={{ 
                      marginTop: '2.5rem', 
                      fontSize: '4.5rem', 
                      fontWeight: '900', 
                      letterSpacing: '1rem',
                      fontFamily: 'monospace',
                      color: 'var(--primary)',
                      background: 'var(--primary-light)',
                      padding: '1rem 2rem',
                      borderRadius: '16px'
                    }}>
                      {otp}
                    </div>
                  </>
                ) : (
                  <div style={{ 
                    width: '300px', 
                    height: '300px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '1.5rem'
                  }}>
                    <div style={{ opacity: 0.2 }}>
                      <QrCode size={120} />
                    </div>
                    <button 
                      onClick={generateOtp}
                      disabled={isGenerating}
                      className="btn btn-primary" 
                      style={{ padding: '1rem 2.5rem', borderRadius: '100px', fontSize: '1.1rem' }}
                    >
                      {isGenerating ? <RefreshCw className="animate-spin" /> : <ShieldCheck size={20} />}
                      {isGenerating ? 'Generating...' : 'Generate QR & PIN'}
                    </button>
                  </div>
                )}
              </div>

              {otp && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                  <button 
                    onClick={generateOtp}
                    disabled={isGenerating}
                    className="btn btn-secondary" 
                    style={{ padding: '0.875rem 2rem', borderRadius: '12px' }}
                  >
                    <RefreshCw size={18} />
                    Regenerate
                  </button>
                  <button 
                    onClick={handleRevokeAccess}
                    className="btn"
                    style={{ 
                      background: 'rgba(239, 68, 68, 0.1)', 
                      color: '#ef4444', 
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      padding: '0.875rem 2rem',
                      borderRadius: '12px',
                      fontWeight: '700'
                    }}
                  >
                    <ShieldAlert size={18} />
                    Stop Access
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar info area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="dashboard-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#f0f9ff', color: '#0066FF', padding: '10px', borderRadius: '10px' }}>
                    <Info size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem' }}>How it works</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { title: 'One-Time Session', desc: 'Codes are valid for a single 60-minute window.' },
                    { title: 'Zero-Trace', desc: 'Once revoked or expired, the doctor no longer has access.' },
                    { title: 'Encrypted', desc: 'All data shared through this code is E2E encrypted.' }
                  ].map((tip, i) => (
                    <li key={i}>
                      <p style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{tip.title}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{tip.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dashboard-card" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', border: 'none' }}>
                <ShieldCheck size={48} style={{ opacity: 0.4, marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Privacy First</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: '1.7' }}>
                  CareConnect never stores your health records in an unencrypted format. Your sharing codes are part of a decentralized identity verification system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShareAccess;
