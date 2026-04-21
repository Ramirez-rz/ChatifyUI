function ManageConnnection({ connected, onConnect, onDisconnect }) {
  return (
    <div className="connection">
      <span>{connected ? 'Conectado' : 'Desconectado'}</span>

      <div className="connection-buttons">
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