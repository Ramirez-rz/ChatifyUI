import './Channels.css'

function Channels({ channels }) {
  return (
    <aside className="channels">
      <h2>Chats</h2>

      {channels.map((channel) => (
        <button
          key={channel.id}
          className={channel.active ? 'channel active' : 'channel'}
          type="button"
        >
          {channel.label}
        </button>
      ))}
    </aside>
  )
}

export default Channels