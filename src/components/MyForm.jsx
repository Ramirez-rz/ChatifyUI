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
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Escribe un mensaje"
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>
        Send
      </button>
    </form>
  )
}

export default MyForm