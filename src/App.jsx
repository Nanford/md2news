import { useState, useEffect, useMemo } from 'react'
import Editor from './components/Editor'
import NewsPreview from './components/NewsPreview'
import ThemeSwitcher from './components/ThemeSwitcher'
import './styles/main.css'

const DEFAULT_MARKDOWN = `# Future of AI: The Dawn of AGI

**Beijing, China** -- In a groundbreaking announcement today, researchers unveiled a new paradigm in artificial intelligence.

## The Quantum Leap

Quantum computing has merged with neural networks to create a system capable of simulating human intuition. 

> "This is not just faster processing; it's a new form of digital consciousness," says Dr. Li, lead researcher.

### Key Features
- **Instant Learning**: Models adapt in real-time.
- **Energy Efficiency**: Consumes 99% less power.
- **Ethics Engine**: Built-in safeguards against misuse.

Click [here](https://example.com) to read the full technical paper.
`

const THEMES = [
  { id: 'solar-graphite', name: 'Solar Graphite', swatches: ['#f0b454', '#ffd079', '#131217'] },
  { id: 'circuit-mint', name: 'Circuit Mint', swatches: ['#32e6c6', '#7ff6e8', '#07141c'] },
  { id: 'ion-sky', name: 'Ion Sky', swatches: ['#5aa8ff', '#8ec7ff', '#0a1224'] },
  { id: 'oxide-coral', name: 'Oxide Coral', swatches: ['#ff6b6b', '#ff9a7a', '#1a0f17'] },
]

const getThemeForDate = (date) => {
  const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  const utcStart = Date.UTC(date.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((utcDate - utcStart) / 86400000)
  const index = dayOfYear % THEMES.length
  return THEMES[index]
}

function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [viewMode, setViewMode] = useState('split')
  const [themeOverride, setThemeOverride] = useState(null)

  const today = useMemo(() => new Date(), [])
  const themeForToday = useMemo(() => getThemeForDate(today), [today])
  const activeTheme = useMemo(() => {
    if (!themeOverride) {
      return themeForToday
    }
    return THEMES.find((theme) => theme.id === themeOverride) || themeForToday
  }, [themeForToday, themeOverride])
  const paletteLabel = themeOverride ? 'Locked palette' : 'Daily palette'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme.id)
  }, [activeTheme.id])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7l9-4 9 4-9 4-9-4z" />
              <path d="M3 17l9 4 9-4" />
              <path d="M3 12l9 4 9-4" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">{'AI\u98ce\u5411\u6807\u4fe1\u606f\u5dee'}</span>
            <span className="brand-sub">AI INFORMATION GAP</span>
          </div>
        </div>

        <div className="header-controls">
          <div className="view-toggle" role="tablist" aria-label="View mode">
            {['split', 'edit', 'preview'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`toggle-button ${viewMode === mode ? 'is-active' : ''}`}
                aria-pressed={viewMode === mode}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="theme-controls">
            <ThemeSwitcher currentTheme={activeTheme.id} onThemeChange={setThemeOverride} />
            <button
              type="button"
              className="theme-reset"
              onClick={() => setThemeOverride(null)}
              disabled={!themeOverride}
            >
              Daily
            </button>
          </div>

          <div
            className={`palette-chip ${themeOverride ? 'is-locked' : ''}`}
            aria-label={`${paletteLabel} ${activeTheme.name}`}
          >
            <span className="palette-label">{paletteLabel}</span>
            <span className="palette-name">{activeTheme.name}</span>
            <span className="palette-swatches">
              {activeTheme.swatches.map((swatch, index) => (
                <span
                  key={`${activeTheme.id}-${index}`}
                  className="palette-swatch"
                  style={{ backgroundColor: swatch }}
                />
              ))}
            </span>
          </div>
        </div>
      </header>

      <main className={`app-main view-${viewMode}`}>
        {(viewMode === 'split' || viewMode === 'edit') && (
          <section className="pane editor-pane">
            <Editor value={markdown} onChange={setMarkdown} />
          </section>
        )}

        {(viewMode === 'split' || viewMode === 'preview') && (
          <section className="pane preview-pane">
            <NewsPreview content={markdown} />
          </section>
        )}
      </main>
    </div>
  )
}

export default App



