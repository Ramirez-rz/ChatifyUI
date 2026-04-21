import './Chats.css'

function Chats({ activeChannel, messages, isConnected }) {
  return (
    <section className="chat">
      <header className="chat-header">
        <h2>{activeChannel}</h2>
        <span>{isConnected ? 'Online' : 'Offline'}</span>
      </header>

      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isOwn ? 'own' : 'other'}`}
          >
            {!message.isOwn && <strong>{message.senderName}</strong>}
            <p>{message.text}</p>
            <small>{message.timeLabel}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Chatss