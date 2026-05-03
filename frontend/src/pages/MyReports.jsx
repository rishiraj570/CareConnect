import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  FileSearch,
  Calendar,
  MoreVertical,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MyReports = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:5000/api/patient/records', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecords(res.data);
      } catch (err) {
        console.error('Failed to fetch records', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecords();
  }, []);

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
          <div className="header-row" style={{ marginBottom: '2.5rem', alignItems: 'flex-end' }}>
            <div className="welcome-section">
              <p className="text-secondary mb-1">Vault Storage</p>
              <h1 style={{ fontSize: '2.25rem', color: 'var(--text-primary)' }}>Medical Reports</h1>
            </div>
            <button 
              onClick={() => navigate('/upload-record')} 
              className="btn btn-primary" 
              style={{ padding: '0.875rem 2rem', height: 'fit-content' }}
            >
              <Plus size={20} />
              Upload New Report
            </button>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '2.5rem',
            background: 'white',
            padding: '1rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search by title or content..."
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem 0.75rem 3rem', 
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-soft)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <button className="btn btn-secondary" style={{ padding: '0 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Filter size={18} />
              Filter
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-pulse" style={{ color: 'var(--primary)', fontWeight: '700' }}>Decrypting records...</div>
            </div>
          ) : records.length === 0 ? (
            <div className="dashboard-card text-center py-24" style={{ background: 'var(--bg-soft)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-2xl)' }}>
              <FileSearch size={64} className="mx-auto mb-6 text-muted" style={{ opacity: 0.3 }} />
              <h3 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Your Vault is Empty</h3>
              <p className="text-secondary mb-8" style={{ maxWidth: '400px', margin: '0 auto 2rem' }}>You haven't uploaded any medical documents yet. Start building your digital health history today.</p>
              <button onClick={() => navigate('/upload-record')} className="btn btn-primary">
                <Plus size={20} /> Upload My First Report
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
              {records.map((record) => (
                <div key={record._id} className="dashboard-card glass" style={{ border: '1px solid white', borderLeft: '4px solid var(--primary)', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                      <div style={{ 
                        background: 'var(--primary-light)', 
                        color: 'var(--primary)', 
                        width: '52px', 
                        height: '52px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FileText size={24} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)' }}>{record.title}</h4>
                        <span className="text-xs text-secondary font-semibold uppercase tracking-wider" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                          <Calendar size={12} /> {new Date(record.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-secondary mb-6" style={{ minHeight: '3rem', lineHeight: '1.6' }}>
                    {record.description || 'No additional notes provided for this record.'}
                  </p>

                  {record.summary && (
                    <div style={{ 
                      background: 'rgba(59, 130, 246, 0.05)', 
                      padding: '1.25rem', 
                      borderRadius: '14px', 
                      marginBottom: '1.75rem', 
                      border: '1px solid rgba(59, 130, 246, 0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <strong className="text-xs uppercase tracking-widest text-primary font-bold">Smart Analysis</strong>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed">{record.summary}</p>
                    </div>
                  )}

                  {/* ✅ FIXED LINE ONLY */}
                  <a 
                    href={record.fileUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary w-full"
                    style={{ gap: '0.75rem', height: '48px' }}
                  >
                    <ExternalLink size={18} />
                    View Document
                  </a>

                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyReports;