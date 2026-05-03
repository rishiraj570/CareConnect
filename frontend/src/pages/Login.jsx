import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Stethoscope, User, Activity, ChevronRight } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/login', {
        ...formData,
        role
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      if (role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/doctor-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ background: 'var(--bg-body)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '40px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem',
        zIndex: '10'
      }}>
        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px', color: 'white' }}>
          <Activity size={20} />
        </div>
        <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '1.25rem' }}>CareConnect</span>
      </div>

      <div className="auth-form-side" style={{ background: 'transparent' }}>
        <div className="auth-card glass" style={{ padding: '3.5rem', borderRadius: 'var(--radius-2xl)', border: '1px solid white' }}>
          <div className="auth-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Login</h2>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Enter your details to access your account</p>
          </div>

          {error && (
            <div className="alert alert-danger mb-6" style={{ borderRadius: 'var(--radius-md)' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            <button 
              onClick={() => setRole('patient')}
              style={{
                flex: '1',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid',
                borderColor: role === 'patient' ? 'var(--primary)' : 'var(--border-color)',
                background: role === 'patient' ? 'var(--primary-light)' : 'white',
                color: role === 'patient' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <User size={20} />
              Patient
            </button>
            <button 
              onClick={() => setRole('doctor')}
              style={{
                flex: '1',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid',
                borderColor: role === 'doctor' ? 'var(--primary)' : 'var(--border-color)',
                background: role === 'doctor' ? 'var(--primary-light)' : 'white',
                color: role === 'doctor' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Stethoscope size={20} />
              Doctor
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: '700' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="name@company.com"
                  style={{ paddingLeft: '3rem', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', height: '54px' }}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: '700' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  style={{ paddingLeft: '3rem', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', height: '54px' }}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" style={{ height: '56px', fontSize: '1rem', fontWeight: '800' }} disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ChevronRight size={18} />}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
            New user? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '700' }}>Create an account</Link>
          </p>
        </div>
      </div>
      
      <div className="auth-image-side" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #00C2FF 100%)', position: 'relative' }}>
        <div style={{ 
          position: 'absolute', 
          inset: '0', 
          background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '5rem',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '2rem' }}>
            Managed Care <br/> with Confidence
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: '0.8', maxWidth: '400px', lineHeight: '1.6' }}>
            A premium digital ecosystem for medical professionals and patients to manage health history securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
