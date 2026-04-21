import { useState } from 'react'
import './MyForm.css'

function MyForm({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!message.trim()) {
      return
    }
    onSendMessage(message)
    setMessage('')
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <button className="composer__icon" type="button" aria-label="Add attachment">
        +
      </button>

      <input
        type="text"
        name="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="composer__input"
        placeholder="Message #general-chat"
        disabled={disabled}
      />

      <div className="composer__actions">
        <button className="composer__tool" type="button" aria-label="Gallery">
          🖼
        </button>
        <button className="composer__tool" type="button" aria-label="GIF">
          GIF
        </button>
        <button className="composer__tool" type="button" aria-label="Emoji">
          ☺
        </button>
        <button className="composer__send" type="submit" disabled={disabled}>
          Send
        </button>
      </div>
    </form>
  )
}

export default MyForm
