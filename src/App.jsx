import { useState, useEffect } from 'react'
import { socket } from './socket'

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('chat message')
    }
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    socket.emit('chat message', message)
    setMessage('')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{isConnected ? 'Connected' :  'Disconnected'}</h2>

      <div style={{ marginBottom: 20 }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe mensaje"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App