import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  ArrowLeft, 
  FileText, 
  CheckCircle,
  AlertCircle,
  X,
  ShieldCheck,
  Info
} from 'lucide-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const UploadRecord = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Blood Report'
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      const fileData = new FormData();
      fileData.append('file', file);
      
      const uploadRes = await axios.post('http://127.0.0.1:5000/api/upload', fileData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });

      const fileUrl = uploadRes.data.fileUrl;

      await axios.post('http://127.0.0.1:5000/api/patient/records', {
        ...formData,
        fileUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      setTimeout(() => navigate('/my-reports'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload record');
    } finally {
      setIsLoading(false);
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

        <div style={{ padding: '0 4rem', maxWidth: '1000px' }}>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-secondary" 
            style={{ marginBottom: '2rem', padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
          >
            <ArrowLeft size={18} /> Back to Records
          </button>

          <div className="dashboard-card glass" style={{ padding: '3rem', border: '1px solid white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
              <div>
                <p className="text-secondary mb-1" style={{ fontWeight: '600', letterSpacing: '0.05em' }}>VAULT DEPOSIT</p>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>New Health Record</h1>
              </div>
              <div style={{ 
                color: 'var(--primary)', 
                background: 'var(--primary-light)', 
                padding: '16px', 
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.1)'
              }}>
                <ShieldCheck size={40} />
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mb-8" style={{ borderRadius: 'var(--radius-lg)' }}>
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success mb-8" style={{ borderRadius: 'var(--radius-lg)' }}>
                <CheckCircle size={20} />
                <span>Document successfully secured and analyzed.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', marginBottom: '3rem' }}>
                <div className="form-group mb-0">
                  <label className="form-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Document Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Annual Lab Results - September 2024"
                    style={{ height: '54px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  
                  <label className="form-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Record Category</label>
                  <select 
                    className="form-input" 
                    style={{ height: '54px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', fontWeight: '600' }}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Blood Report">Blood Report</option>
                    <option value="MRI Scan">MRI Scan</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="Doctor Prescription">Doctor Prescription</option>
                    <option value="Billing/Invoice">Billing/Invoice</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Clinical Context (Optional)</label>
                  <textarea 
                    className="form-input" 
                    placeholder="Summarize the reason for this visit or any specific concerns..."
                    style={{ minHeight: '140px', resize: 'vertical', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', paddingTop: '1rem' }}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Physical Document</label>
                  <div 
                    className="upload-zone"
                    style={{ 
                      border: '2px dashed var(--border-color)', 
                      borderRadius: 'var(--radius-2xl)',
                      padding: '4rem 2rem',
                      background: 'var(--bg-soft)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('file-input').click()}
                  >
                    {!file ? (
                      <>
                        <div style={{ 
                          background: 'white', 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          margin: '0 auto 1.5rem',
                          boxShadow: 'var(--shadow-md)'
                        }}>
                          <Upload size={32} style={{ color: 'var(--primary)' }} />
                        </div>
                        <p className="font-extrabold mb-1" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Select Document</p>
                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Drag and drop PDF, PNG, or JPG (up to 10MB)</p>
                      </>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                        <div style={{ 
                          background: 'var(--primary-light)', 
                          padding: '24px', 
                          borderRadius: '20px',
                          color: 'var(--primary)'
                        }}>
                          <FileText size={48} />
                        </div>
                        <div className="text-left">
                          <p className="font-extrabold" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{file.name}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ 
                              background: 'var(--primary)', 
                              color: 'white', 
                              padding: '2px 8px', 
                              borderRadius: '6px', 
                              fontSize: '0.65rem', 
                              fontWeight: '800' 
                            }}>READY</span>
                            <p className="text-xs text-secondary font-bold">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          style={{ 
                            padding: '12px', 
                            background: '#fee2e2', 
                            border: 'none', 
                            borderRadius: '50%', 
                            color: '#ef4444', 
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                          }}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                    <input 
                      id="file-input"
                      type="file" 
                      hidden 
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#f8fafc', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-xl)', 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '3rem',
                border: '1px solid #e2e8f0'
              }}>
                <Info size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Our AI engine will automatically scan your document for vital health indicators and provide a summary for your dashboard.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => navigate(-1)} 
                  className="btn btn-secondary" 
                  style={{ flex: 1, height: '60px', fontWeight: '700' }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ flex: 2, height: '60px', fontWeight: '800', fontSize: '1rem' }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing Document...' : 'Securely Upload Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadRecord;
