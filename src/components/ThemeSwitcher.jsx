import React from 'react';

const themes = [
  { id: 'solar-graphite', name: 'Solar Graphite', color: '#f0b454' },
  { id: 'circuit-mint', name: 'Circuit Mint', color: '#32e6c6' },
  { id: 'ion-sky', name: 'Ion Sky', color: '#5aa8ff' },
  { id: 'oxide-coral', name: 'Oxide Coral', color: '#ff6b6b' },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div className="theme-switcher" role="group" aria-label="Theme">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onThemeChange(theme.id)}
          title={theme.name}
          aria-label={theme.name}
          aria-pressed={currentTheme === theme.id}
          className={`theme-dot ${currentTheme === theme.id ? 'is-active' : ''}`}
          style={{ backgroundColor: theme.color, '--theme-color': theme.color }}
        />
      ))}
    </div>
  );
}
