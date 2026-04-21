import './Chats.css'

function Chats({ activeChannel, messages, isConnected }) {
  return (
    <section className="chat-shell">
      <header className="chat-header desktop-only">
        <div className="chat-header__channel">
          <span className="chat-header__hash">#</span>
          <span>{activeChannel.replace('# ', '')}</span>
        </div>

        <div className="chat-header__search">
          <input type="text" placeholder="Search archives..." readOnly />
        </div>

        <div className="chat-header__actions">
          <span className={`presence-pill ${isConnected ? 'is-online' : ''}`}>
            {isConnected ? 'ONLINE' : 'OFFLINE'}
          </span>
          <button className="icon-button" type="button" aria-label="Notifications">
            🔔
          </button>
          <button className="icon-button" type="button" aria-label="Pinned">
            📌
          </button>
          <button className="icon-button" type="button" aria-label="Members">
            👥
          </button>
        </div>
      </header>

      <header className="chat-header-mobile mobile-only">
        <div className="chat-header-mobile__top">
          <button className="icon-button" type="button" aria-label="Menu">
            ☰
          </button>
          <div className="chat-header-mobile__title">
            <span className="chat-header__hash">#</span>
            <span>General</span>
          </div>
          <div className="chat-header-mobile__icons">
            <button className="icon-button" type="button" aria-label="Notifications">
              🔔
            </button>
            <button className="icon-button" type="button" aria-label="Search">
              ⌕
            </button>
          </div>
        </div>
      </header>

      <div className="messages-area">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`message-row ${message.isOwn ? 'message-row--own' : ''}`}
          >
            {message.groupLabel ? (
              <div className="history-label">{message.groupLabel}</div>
            ) : null}

            <div className="message-meta">
              {!message.isOwn ? (
                <div className="message-avatar">{message.senderName.charAt(0)}</div>
              ) : null}

              <div className="message-stack">
                <div className={`message-author ${message.isOwn ? 'message-author--own' : ''}`}>
                  <span>{message.senderName}</span>
                  {message.senderRole ? (
                    <span className="message-role">{message.senderRole}</span>
                  ) : null}
                  <span className="message-time">{message.timeLabel}</span>
                </div>

                <div
                  className={`message-bubble ${message.isOwn ? 'message-bubble--own' : ''} ${
                    message.highlight ? 'message-bubble--highlight' : ''
                  }`}
                >
                  <p>{message.text}</p>
                  {message.image ? (
                    <img
                      className="message-image"
                      src={message.image}
                      alt="Shared visual reference"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <nav className="mobile-nav mobile-only" aria-label="Primary">
        <button className="mobile-nav__item mobile-nav__item--active" type="button">
          Chat
        </button>
        <button className="mobile-nav__item" type="button">
          Friends
        </button>
        <button className="mobile-nav__item" type="button">
          Explore
        </button>
        <button className="mobile-nav__item" type="button">
          Settings
        </button>
      </nav>
    </section>
  )
}

export default Chats
