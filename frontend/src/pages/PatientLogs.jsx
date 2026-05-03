import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  History, 
  ArrowLeft,
  User,
  Calendar,
  ChevronRight,
  Search
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const PatientLogs = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
  
  // Mock data for patient logs
  const [logs] = useState([
    { id: 1, name: 'John Doe', date: '2026-03-10', time: '14:30', status: 'Completed', type: 'General Checkup' },
    { id: 2, name: 'Jane Smith', date: '2026-03-08', time: '10:15', status: 'Completed', type: 'Clinical Audit' },
    { id: 3, name: 'Robert Brown', date: '2026-03-05', time: '16:45', status: 'Revoked', type: 'Report Review' },
  ]);

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              onClick={() => navigate('/doctor-dashboard')}
              style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border-color)', 
                padding: '0.5rem', 
                borderRadius: '12px',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0 }}>Patient Access Logs</h2>
          </div>

          <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>History of Consultations</h3>
                <p className="text-secondary text-sm">Detailed record of all patients who shared access via CareConnect</p>
              </div>
              <div style={{ position: 'relative', width: '300px' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Filter by name..." 
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-soft)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '1.25rem', 
                    background: 'var(--bg-soft)', 
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '12px', 
                    background: 'var(--primary-light)', 
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1.5rem'
                  }}>
                    <User size={24} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '700' }}>{log.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{log.type}</p>
                  </div>

                  <div style={{ textAlign: 'right', marginRight: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.25rem' }}>
                      <Calendar size={14} />
                      {log.date}
                    </div>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      background: log.status === 'Completed' ? '#dcfce7' : '#fee2e2', 
                      color: log.status === 'Completed' ? '#166534' : '#991b1b',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: '700'
                    }}>
                      {log.status}
                    </span>
                  </div>

                  <ChevronRight size={20} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientLogs;
