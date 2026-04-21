function Users({ onlineUsers, offlineUsers }) {
  return (
    <aside className="users">
      <h3>Online</h3>
      {onlineUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}

      <h3>Offline</h3>
      {offlineUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </aside>
  )
}

export default Users