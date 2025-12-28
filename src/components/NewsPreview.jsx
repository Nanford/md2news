import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'

const splitMarkdown = (markdown) => {
  const blocks = markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  if (blocks.length === 0) {
    return { headline: 'Daily Briefing', standfirst: '', body: '' }
  }

  let headline = ''
  let standfirst = ''
  let bodyBlocks = []

  if (/^#\s+/.test(blocks[0])) {
    headline = blocks[0].replace(/^#\s+/, '').trim()
    standfirst = blocks[1] || ''
    bodyBlocks = blocks.slice(2)
  } else {
    headline = 'Daily Briefing'
    standfirst = blocks[0]
    bodyBlocks = blocks.slice(1)
  }

  if (standfirst && /^#+\s+/.test(standfirst)) {
    bodyBlocks.unshift(standfirst)
    standfirst = ''
  }

  return {
    headline: headline || 'Daily Briefing',
    standfirst: standfirst.trim(),
    body: bodyBlocks.join('\n\n'),
  }
}

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)

const getIssueNumber = (date) => {
  const start = new Date(Date.UTC(date.getFullYear(), 0, 0))
  const current = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const diff = current - start
  return Math.floor(diff / 86400000)
}

export default function NewsPreview({ content }) {
  const today = useMemo(() => new Date(), [])
  const dateLabel = useMemo(() => formatDate(today), [today])
  const issueNumber = useMemo(() => getIssueNumber(today), [today])
  const { headline, standfirst, body } = useMemo(() => splitMarkdown(content), [content])
  const issueLabel = issueNumber.toString().padStart(3, '0')

  return (
    <article className="news-page">
      <header className="news-masthead" data-animate="1">
        <div className="masthead-title">
          <span className="masthead-title-cn">{'AI\u98ce\u5411\u6807\u4fe1\u606f\u5dee'}</span>
          <span className="masthead-title-en">AI INFORMATION GAP</span>
        </div>
        <div className="masthead-meta">
          <span className="meta-pill">Issue {issueLabel}</span>
          <span className="meta-date">{dateLabel}</span>
        </div>
      </header>

      <section className="news-hero" data-animate="2">
        <div className="hero-tag">Lead Story</div>
        <h1 className="hero-headline">{headline}</h1>
        {standfirst ? (
          <div className="hero-deck">
            <ReactMarkdown>{standfirst}</ReactMarkdown>
          </div>
        ) : (
          <p className="hero-lede hero-empty">Add a lead paragraph to open the story.</p>
        )}
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">Edition</span>
            <span className="hero-meta-value">{issueLabel}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Desk</span>
            <span className="hero-meta-value">AI Systems</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Signal</span>
            <span className="hero-meta-value">Realtime</span>
          </div>
        </div>
      </section>

      <section className="news-body" data-animate="3">
        {body ? (
          <ReactMarkdown>{body}</ReactMarkdown>
        ) : (
          <p className="news-empty">Add sections below the lead story to fill the columns.</p>
        )}
      </section>

      <footer className="news-footer" data-animate="4">
        <span className="footer-rule" aria-hidden="true" />
        End of Page
      </footer>
    </article>
  )
}


