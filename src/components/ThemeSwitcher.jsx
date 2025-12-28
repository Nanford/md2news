import React from 'react';

const themes = [
  { id: 'quantum-blue', name: 'Quantum Blue', color: '#00f0ff' },
  { id: 'neon-city', name: 'Neon City', color: '#ff00ff' },
  { id: 'synthetic-gold', name: 'Synthetic Gold', color: '#ffd700' },
  { id: 'clean-future', name: 'Clean Future', color: '#0ea5e9' },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      padding: '10px',
      background: 'var(--bg-secondary)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          title={theme.name}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: theme.color,
            border: currentTheme === theme.id ? `2px solid var(--text-primary)` : 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: currentTheme === theme.id ? `0 0 10px ${theme.color}` : 'none',
            transform: currentTheme === theme.id ? 'scale(1.1)' : 'scale(1)'
          }}
        />
      ))}
    </div>
  );
}
