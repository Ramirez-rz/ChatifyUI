import './Channels.css'

function Users({ onlineUsers, offlineUsers }) {
  return (
    <aside className="members-panel">
      <div className="members-panel__header">
        <span>Online - {onlineUsers.length}</span>
      </div>

      <div className="members-list">
        {onlineUsers.map((user) => (
          <div key={user.id} className="member-card">
            <div className={`member-avatar ${user.accent ? 'member-avatar--accent' : ''}`}>
              {user.name.charAt(0)}
            </div>
            <div>
              <div className={`member-name ${user.accent ? 'member-name--accent' : ''}`}>
                {user.name}
              </div>
              <div className="member-status">{user.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="members-panel__header members-panel__header--muted">
        <span>Offline - {offlineUsers.length}</span>
      </div>

      <div className="members-list members-list--dimmed">
        {offlineUsers.map((user) => (
          <div key={user.id} className="member-card member-card--offline">
            <div className="member-avatar member-avatar--offline">
              {user.name.charAt(0)}
            </div>
            <div className="member-name member-name--offline">{user.name}</div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Users
