import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const Navbar = ({ userProfile }) => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 4rem',
      background: 'transparent',
      marginBottom: '1rem'
    }}>
      <div style={{ position: 'relative', width: '400px' }}>
        <Search style={{ 
          position: 'absolute', 
          left: '1rem', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: 'var(--text-muted)' 
        }} size={18} />
        <input 
          type="text" 
          placeholder="Global Search..." 
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 3rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-surface)',
            fontSize: '0.875rem'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ 
          background: 'var(--bg-surface)', 
          border: '1px solid var(--border-color)', 
          padding: '0.5rem', 
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          position: 'relative'
        }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '10px',
            height: '10px',
            background: 'var(--primary)',
            borderRadius: '50%',
            border: '2px solid var(--bg-surface)'
          }}></span>
        </button>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          padding: '0.5rem 1rem',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <User size={18} color="var(--primary)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              {userProfile?.name || 'User'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
              {userProfile?.role || 'Guest'}
            </span>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
