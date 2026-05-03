import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Save, 
  Heart, 
  Phone, 
  AlertCircle,
  CheckCircle,
  ShieldCheck,
  Stethoscope,
  Info
} from 'lucide-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const EmergencyProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bloodGroup: '',
    emergencyContact: '',
    allergies: '',
    medicalConditions: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;
        setFormData({
          bloodGroup: data.bloodGroup || '',
          emergencyContact: data.emergencyContact || '',
          allergies: data.allergies?.join(', ') || '',
          medicalConditions: data.medicalConditions?.join(', ') || ''
        });
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://127.0.0.1:5000/api/patient/profile', {
        ...formData,
        allergies: formData.allergies.split(',').map(s => s.trim()).filter(s => s !== ''),
        medicalConditions: formData.medicalConditions.split(',').map(s => s.trim()).filter(s => s !== '')
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: 'Health directives updated in your secure profile.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update directives.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (isLoading) return (
    <div className="loading-screen" style={{ background: 'var(--bg-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="animate-pulse" style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.25rem' }}>Authenticating Vault Profile...</div>
    </div>
  );

  return (
    <div className="dashboard-container" style={{ background: 'var(--bg-body)' }}>
      <Sidebar handleLogout={handleLogout} />

      <main className="main-content" style={{ padding: '0 0 3rem 0', maxWidth: '100%', margin: '0' }}>
        <Navbar userProfile={user} />

        <div style={{ padding: '0 4rem', maxWidth: '1000px' }}>
          <div className="header-row" style={{ marginBottom: '2.5rem', alignItems: 'flex-start' }}>
            <div className="welcome-section">
              <p className="text-secondary mb-1">Critical Information</p>
              <h1 style={{ fontSize: '2.25rem', color: 'var(--text-primary)' }}>Emergency Profile</h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', maxWidth: '500px' }}>
                This information is shared with medical professionals during emergency access sessions.
              </p>
            </div>
            <div style={{ 
              color: 'var(--primary)', 
              background: 'var(--primary-light)', 
              padding: '16px', 
              borderRadius: '20px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <ShieldCheck size={40} />
            </div>
          </div>

          <div className="dashboard-card glass" style={{ padding: '3rem', border: '1px solid white' }}>
            {message.text && (
              <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-10`} style={{ borderRadius: 'var(--radius-lg)' }}>
                {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
                <div className="form-group mb-0">
                  <label className="form-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Blood Group</label>
                  <div style={{ position: 'relative' }}>
                    <Heart size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#ef4444' }} />
                    <select 
                      className="form-input" 
                      style={{ paddingLeft: '3.5rem', height: '56px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', fontWeight: '600' }}
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                      required
                    >
                      <option value="">Select Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Emergency Contact</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="+1 (555) 000-0000"
                      style={{ paddingLeft: '3.5rem', height: '56px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', fontWeight: '600' }}
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Known Allergies</label>
                  <div style={{ position: 'relative' }}>
                     <ShieldAlert size={20} style={{ position: 'absolute', left: '1.25rem', top: '1.5rem', color: '#f59e0b' }} />
                     <textarea 
                      className="form-input" 
                      placeholder="e.g., Peanuts, Penicillin, Latex... (Separate with commas)"
                      style={{ minHeight: '120px', paddingLeft: '3.5rem', paddingTop: '1.25rem', background: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}
                      value={formData.allergies}
                      onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Pre-existing Conditions</label>
                  <div style={{ position: 'relative' }}>
                     <Stethoscope size={20} style={{ position: 'absolute', left: '1.25rem', top: '1.5rem', color: '#3b82f6' }} />
                     <textarea 
                      className="form-input" 
                      placeholder="e.g., Asthma, Diabetes Type 1, Hypertension... (Separate with commas)"
                      style={{ minHeight: '120px', paddingLeft: '3.5rem', paddingTop: '1.25rem', background: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}
                      value={formData.medicalConditions}
                      onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#f8fafc', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-xl)', 
                display: 'flex', 
                gap: '1.25rem', 
                marginBottom: '3rem',
                border: '1px solid #e2e8f0',
                alignItems: 'center'
              }}>
                <Info size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Updating these fields will immediately synchronize with your emergency QR code and smart medical ID cards.
                </p>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSaving} 
                style={{ padding: '0 4rem', height: '64px', width: 'fit-content', fontSize: '1.125rem', fontWeight: '800' }}
              >
                <Save size={22} />
                {isSaving ? 'Synchronizing...' : 'Update Emergency Profile'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyProfile;
