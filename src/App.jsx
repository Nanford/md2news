import { useState, useEffect, useMemo } from 'react'
import Editor from './components/Editor'
import NewsPreview from './components/NewsPreview'
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
  { id: 'signal-amber', name: 'Signal Cyan', swatches: ['#4fd2ff', '#7ae3ff', '#0a1018'] },
  { id: 'circuit-mint', name: 'Circuit Mint', swatches: ['#3fe0d0', '#7ef3ff', '#07141c'] },
  { id: 'ion-sky', name: 'Ion Sky', swatches: ['#5aa8ff', '#88d7ff', '#0a121f'] },
  { id: 'oxide-coral', name: 'Oxide Blue', swatches: ['#54c7ff', '#63ffd1', '#0c111b'] },
  { id: 'solar-graphite', name: 'Solar Ice', swatches: ['#6fe1ff', '#9bffdd', '#0f131a'] },
]

const hashString = (value) => {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash + value.charCodeAt(i) * (i + 1)) % 100000
  }
  return hash
}

const getThemeForDate = (date) => {
  const key = date.toISOString().slice(0, 10)
  const index = hashString(key) % THEMES.length
  return THEMES[index]
}

function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [viewMode, setViewMode] = useState('split')

  const today = useMemo(() => new Date(), [])
  const themeForToday = useMemo(() => getThemeForDate(today), [today])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeForToday.id)
  }, [themeForToday.id])

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

          <div className="palette-chip" aria-label={`Daily palette ${themeForToday.name}`}>
            <span className="palette-label">Daily palette</span>
            <span className="palette-name">{themeForToday.name}</span>
            <span className="palette-swatches">
              {themeForToday.swatches.map((swatch, index) => (
                <span
                  key={`${themeForToday.id}-${index}`}
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



