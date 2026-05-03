import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  Zap, 
  Lock, 
  Utensils, 
  ArrowRight,
  Globe,
  Database
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-body)', 
      color: 'var(--text-primary)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Navbar Overlay */}
      <nav style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        background: 'rgba(248, 250, 252, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            background: 'var(--primary)', 
            padding: '8px', 
            borderRadius: '12px', 
            color: 'white',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Activity size={20} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'var(--primary)' }}>CareConnect</span>
        </div>
        
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#features" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem' }}>Features</a>
          <a href="#security" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem' }}>Security</a>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              background: 'var(--primary)', 
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.75rem', 
              borderRadius: '100px', 
              fontWeight: '700', 
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            Portal Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '640px', zIndex: 2 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'var(--primary-light)', 
            color: 'var(--primary)', 
            padding: '6px 16px', 
            borderRadius: '100px',
            fontSize: '0.75rem',
            fontWeight: '800',
            marginBottom: '2rem'
          }}>
            <Sparkles size={14} />
            <span>AI-POWERED HEALTHCARE REBOOTED</span>
          </div>
          
          <h1 style={{ 
            fontSize: '5.5rem', 
            fontWeight: '900', 
            lineHeight: '1.05', 
            marginBottom: '2rem',
            letterSpacing: '-0.04em'
          }}>
            Your Health, <br/>
            <span style={{ color: 'var(--primary)' }}>Securely</span> Unified.
          </h1>
          
          <p style={{ 
            fontSize: '1.35rem', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.6', 
            marginBottom: '3.5rem',
            maxWidth: '540px'
          }}>
            The world's first decentralized medical repository with real-time AI clinical analysis and instant emergency protocols.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{ 
                padding: '1.25rem 3rem', 
                background: 'var(--primary)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '16px', 
                fontSize: '1.125rem', 
                fontWeight: '800', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 20px 40px rgba(0, 102, 255, 0.25)'
              }}
            >
              Get Started <ArrowRight size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex' }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    border: '2px solid white', 
                    marginLeft: i === 1 ? 0 : '-12px',
                    background: i === 1 ? '#0066FF' : i === 2 ? '#00C2FF' : '#10B981'
                  }} />
                ))}
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Joined by 20k+ Patients</span>
            </div>
          </div>
        </div>

        {/* Visual Element */}
        <div style={{ position: 'absolute', right: '0', top: '0', width: '60%', height: '100%', zIndex: 1 }}>
          <img 
            src="/nurse_hero.png" 
            alt="Medical Professional" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '80% 0%' }}
          />
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(to right, var(--bg-body) 0%, transparent 40%)' 
          }} />
        </div>

        <div style={{ 
          position: 'absolute', 
          bottom: '3rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
          color: 'var(--text-muted)'
        }}>
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '10rem 6rem', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>Engineered for Total Care</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            A comprehensive ecosystem designed to bridge the gap between patients, doctors, and split-second medical decisions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Zap size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>AI Clinical Analysis</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Our proprietary AI models automatically summarize complex medical documents, flagging critical vitals for immediate professional review.</p>
          </div>

          <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
            <div style={{ background: '#f5f3ff', color: '#8b5cf6', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Lock size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Secure Health Vault</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>E2E encrypted storage for your entire medical history. You own the keys; you control who accesses your life-saving data.</p>
          </div>

          <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
            <div style={{ background: '#ecfdf5', color: '#10b981', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Utensils size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Precision Nutrition</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Smart BMI-integrated meal planning that adapts to your physiological changes and medical requirements in real-time.</p>
          </div>

          <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
            <div style={{ background: '#fff7ed', color: '#f97316', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Activity size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Telehealth Direct</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Instant video consultations with verified medical professionals. Skip the waiting room and get care from anywhere.</p>
          </div>

          <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
            <div style={{ background: '#fdf2f8', color: '#db2777', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Family Health Hub</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>One central place to manage health records for your entire family. Track immunizations and checkups for everyone.</p>
          </div>

          <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
            <div style={{ background: '#f0fdf4', color: '#16a34a', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <ShieldCheck size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Smart Meds Tracker</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Intelligent medication reminders and refill alerts. Never miss a dose with our automated logging system.</p>
          </div>
        </div>
      </section>

      {/* Feature Section: AI Intelligence */}
      <section style={{ padding: '8rem 6rem', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '6rem', alignItems: 'center' }}>
        <div>
          <img 
            src="/ai_features.png" 
            alt="AI Nodes" 
            style={{ width: '100%', borderRadius: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}
          />
        </div>
        <div>
          <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>INTELLIGENT DIAGNOSTICS</div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '2rem' }}>AI that understands your health history.</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem' }}>Gone are the days of manual record sorting. Our AI engine processes uploaded documents in seconds, translating medical jargon into actionable health summaries.</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            {[
              'Real-time document synthesis',
              'Critical vital trend tracking',
              'Multi-format file compatibility'
            ].map((feature, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: '600' }}>
                <ShieldCheck size={20} style={{ color: 'var(--primary)' }} /> {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Feature Section: Secure Vault */}
      <section id="security" style={{ padding: '8rem 6rem', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '6rem', alignItems: 'center', background: '#F1F5F9' }}>
        <div>
           <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>ZERO-TRUST SECURITY</div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '2rem' }}>Military-grade protection for your vitals.</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem' }}>We utilize end-to-end encryption protocols to ensure that your private medical data remains private. Not even our servers can see your records without your permission.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Database size={24} style={{ color: 'var(--primary)' }} />
              <div>
                <div style={{ fontWeight: '800' }}>Persistent</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Offsite Backups</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Globe size={24} style={{ color: 'var(--primary)' }} />
              <div>
                <div style={{ fontWeight: '800' }}>Decentralized</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Global Access</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <img 
            src="/secure_vault.png" 
            alt="Secure Vault" 
            style={{ width: '100%', borderRadius: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '6rem', background: 'var(--bg-body)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Activity size={24} style={{ color: 'var(--primary)' }} />
              <span style={{ fontWeight: '800', fontSize: '1.5rem' }}>CareConnect</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Redefining the digital health experience through intelligence and security.</p>
          </div>
          <div style={{ display: 'flex', gap: '6rem' }}>
            <div>
              <h4 style={{ marginBottom: '1.5rem' }}>Product</h4>
              <nav style={{ display: 'grid', gap: '0.75rem' }}>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Features</a>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Security</a>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Portal</a>
              </nav>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem' }}>Legal</h4>
              <nav style={{ display: 'grid', gap: '0.75rem' }}>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Privacy</a>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Terms</a>
              </nav>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          © 2026 CareConnect Systems. All identifiers verified.
        </div>
      </footer>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
            40% {transform: translateY(-10px) translateX(-50%);}
            60% {transform: translateY(-5px) translateX(-50%);}
          }
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
    </div>
  );
};

export default Landing;
