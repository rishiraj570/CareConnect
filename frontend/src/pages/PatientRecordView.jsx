import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  ExternalLink, 
  Heart, 
  Phone, 
  ShieldCheck, 
  AlertCircle,
  Calendar,
  Stethoscope,
  Activity,
  MoreVertical,
  Search,
  CheckCircle,
  History
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const PatientRecordView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patient, records } = location.state || {};
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')) || {});

  if (!patient) {
    return (
      <div className="dashboard-container" style={{ background: 'var(--bg-body)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="dashboard-card glass text-center" style={{ maxWidth: '540px', padding: '4rem', border: '1px solid white' }}>
          <div style={{ background: '#fee2e2', color: '#ef4444', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <AlertCircle size={40} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Session Expired</h2>
          <p className="text-secondary mb-10" style={{ fontSize: '1.125rem' }}>The secure clinical session has been terminated for security. Please re-authenticate via the doctor portal.</p>
          <button 
            onClick={() => navigate('/doctor-dashboard')} 
            className="btn btn-primary w-full"
            style={{ height: '60px', fontWeight: '800' }}
          >
            Return to Doctor Portal
          </button>
        </div>
      </div>
    );
  }

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
          <div className="header-row" style={{ marginBottom: '3.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                width: '80px', 
                height: '80px', 
                borderRadius: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '2rem', 
                fontWeight: 900,
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
              }}>
                {patient.name[0]}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: '800', border: '1px solid var(--primary-glow)' }}>SECURE CLINICAL SESSION</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981' }}>
                    <CheckCircle size={14} />
                    <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>AGENT VERIFIED</span>
                  </div>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{patient.name}</h1>
              </div>
            </div>
            <button 
              onClick={() => navigate('/doctor-dashboard')} 
              className="btn btn-secondary"
              style={{ padding: '0 1.5rem', height: '52px' }}
            >
              <ArrowLeft size={20} /> Close Session
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
            <div className="dashboard-card glass" style={{ border: '1px solid white', borderLeft: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: '#fee2e2', color: '#ef4444', padding: '14px', borderRadius: '14px' }}>
                  <Heart size={28} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>BLOOD GROUP</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{patient.bloodGroup || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card glass" style={{ border: '1px solid white', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '14px', borderRadius: '14px' }}>
                  <Phone size={28} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>EMERGENCY CONTACT</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{patient.emergencyContact || 'None'}</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card glass" style={{ border: '1px solid white', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: '#f5f3ff', color: '#8b5cf6', padding: '14px', borderRadius: '14px' }}>
                  <History size={28} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>TOTAL ARTIFACTS</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{records?.length || 0} Records</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
            <div className="dashboard-card glass" style={{ border: '1px solid white', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <AlertCircle size={24} style={{ color: '#ef4444' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Allergies & Sensitivities</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {patient.allergies && patient.allergies.length > 0 ? (
                  patient.allergies.map((allergy, i) => (
                    <span key={i} style={{ background: '#fee2e2', color: '#ef4444', padding: '6px 14px', borderRadius: '100px', fontSize: '0.875rem', fontWeight: '700' }}>{allergy}</span>
                  ))
                ) : (
                  <p className="text-secondary" style={{ fontStyle: 'italic' }}>No known drug or environmental allergies reported.</p>
                )}
              </div>
            </div>

            <div className="dashboard-card glass" style={{ border: '1px solid white', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Activity size={24} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Active Medical Conditions</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {patient.medicalConditions && patient.medicalConditions.length > 0 ? (
                  patient.medicalConditions.map((condition, i) => (
                    <span key={i} style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.875rem', fontWeight: '700' }}>{condition}</span>
                  ))
                ) : (
                  <p className="text-secondary" style={{ fontStyle: 'italic' }}>No chronic medical conditions on record.</p>
                )}
              </div>
            </div>
          </div>

          <div className="dashboard-card glass" style={{ border: '1px solid white', padding: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-soft)', color: 'var(--text-primary)', padding: '10px', borderRadius: '12px' }}>
                  <Stethoscope size={24} />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Clinical Longitudinal Record</h3>
              </div>
              <div style={{ position: 'relative', width: '320px' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Filter by diagnosis or date..." 
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-soft)', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            {records && records.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '2.5rem' }}>
                {records.map((record) => (
                  <div key={record._id} className="glass-dark" style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '2.5rem', background: 'rgba(255,255,255,0.4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                      <div className="flex gap-4 items-center">
                        <div style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '16px' }}>
                          <FileText size={24} />
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>{record.title}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                            <Calendar size={12} />
                            {new Date(record.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}><MoreVertical size={20} /></button>
                    </div>
                    
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', minHeight: '3.2rem' }}>{record.description || 'Clinical observation notes not provided.'}</p>

                    {record.summary && (
                      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '18px', marginBottom: '2.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <Activity size={14} style={{ color: 'var(--primary)' }} />
                          <span style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI SYNTHETIC SUMMARY</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0 }}>{record.summary}</p>
                      </div>
                    )}

                    <a 
                      href={`http://127.0.0.1:5000${record.fileUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ width: '100%', height: '54px', gap: '0.75rem', fontWeight: '700' }}
                    >
                      <ExternalLink size={18} />
                      Analyze Full Document
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32" style={{ background: 'var(--bg-soft)', borderRadius: '32px', border: '2px dashed var(--border-color)' }}>
                <FileText size={64} style={{ color: 'var(--border-color)', marginBottom: '1.5rem' }} />
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Clinical Record Empty</h4>
                <p className="text-secondary" style={{ maxWidth: '360px', margin: '0 auto' }}>No historical health data has been synchronized for this patient profile.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientRecordView;
