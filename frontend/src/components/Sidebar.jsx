import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Utensils, 
  LogOut,
  Activity,
  ChevronRight,
  Clock,
  LayoutDashboard,
  QrCode
} from 'lucide-react';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isDoctor = user.role === 'doctor';

  const patientItems = [
    { icon: Clock, label: 'Medical Timeline', path: '/patient-dashboard' },
    { icon: FileText, label: 'Medical Reports', path: '/my-reports' },
    { icon: Activity, label: 'Upload Records', path: '/upload-record' },
    { icon: QrCode, label: 'Share Access', path: '/share-access' },
    { icon: Utensils, label: 'Diet', path: '/diet-planner' },
  ];

  const doctorItems = [
    { icon: LayoutDashboard, label: 'Doctor Access', path: '/doctor-dashboard' },
    { icon: FileText, label: 'Patient Logs', path: '/patient-logs' },
  ];

  const menuItems = isDoctor ? doctorItems : patientItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div style={{ 
          background: 'var(--primary)', 
          padding: '8px', 
          borderRadius: '12px', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Activity size={24} />
        </div>
        <span style={{ color: 'var(--text-primary)', fontWeight: '800' }}>CareConnect</span>
      </div>
      
      <nav className="nav-links" style={{ flex: '1' }}>
        <p style={{ 
          fontSize: '0.75rem', 
          fontWeight: '700', 
          color: 'var(--text-muted)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          padding: '0 1.25rem 1rem 1.25rem'
        }}>Menu</p>
        
        {menuItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`nav-link ${(location.pathname + location.hash) === item.path ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span style={{ flex: '1' }}>{item.label}</span>
            {location.pathname === item.path && <ChevronRight size={16} />}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          onClick={handleLogout} 
          className="nav-link" 
          style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
