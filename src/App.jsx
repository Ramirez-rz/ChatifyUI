import { useState, useEffect } from 'react'
import { socket } from './socket'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)
    const onMessage = (msg) => {
      setMessages((prev) => [...prev, msg])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('chat message', onMessage)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('chat message', onMessage)
    }
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    socket.emit('chat message', message)
    setMessage('')
  }

  return (
    <div className="app">
      <div className="sidebar place-items-center place-content-center">
        <div className='bg-white w-[90%] h-[90%] rounded-xl shadow-xl'>

        </div>
      </div>

      <div className="chat-section">
        <div className="chat-box">
          <div className="chat-header">
            <h2>QUEONDA</h2>
            <span className={isConnected ? 'status connected' : 'status disconnected'}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <div className="messages">
            {messages.length === 0 ? (
              <p className="empty-text">Ghosteado</p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className="message">
                  {msg}
                </div>
              ))
            )}
          </div>

          <form className="message-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe mensaje"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App