import React from 'react'

export default function Editor({ value, onChange }) {
  return (
    <div className="editor-shell">
      <div className="editor-title">Editor</div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="editor-textarea"
        placeholder="# Type your markdown here..."
        aria-label="Markdown editor"
      />
    </div>
  )
}
