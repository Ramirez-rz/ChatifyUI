function ManageConnnection({ connected, onConnect, onDisconnect }) {
  return (
    <div className="connection-dock">
      <div className="connection-dock__status">
        <span className={`connection-dot ${connected ? 'is-online' : ''}`} />
        <span>{connected ? 'Live relay active' : 'Relay paused'}</span>
      </div>

      <div className="connection-dock__actions">
        <button type="button" onClick={onConnect}>
          Connect
        </button>
        <button type="button" onClick={onDisconnect}>
          Disconnect
        </button>
      </div>
    </div>
  )
}

export default ManageConnnection
