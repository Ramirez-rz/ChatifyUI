import './Channels.css'

function Channels({ channels }) {
  return (
    <aside className="channels-panel">
      <div className="channels-panel__header">
        <div>
          <p className="panel-kicker">Emerald Nexus</p>
          <h1 className="panel-title">Channel Sector</h1>
        </div>
        <button className="icon-button" aria-label="Expand server">
          ˅
        </button>
      </div>

      <div className="channel-group">
        <div className="channel-group__heading">
          <span>Text channels</span>
          <button className="icon-button" aria-label="Add channel">
            +
          </button>
        </div>

        <div className="channel-list">
          {channels.map((channel) => (
            <button
              key={channel.id}
              className={`channel-pill ${channel.active ? 'is-active' : ''}`}
              type="button"
            >
              <span className="channel-pill__hash">#</span>
              <span>{channel.label.replace('# ', '')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="channel-group">
        <div className="channel-group__heading">
          <span>Voice channels</span>
        </div>

        <div className="voice-card">
          <div className="voice-card__title">voice-lounge</div>
          <div className="voice-card__user">Kaelen linked in</div>
        </div>
      </div>

      <button className="invite-button" type="button">
        Invite Members
      </button>
    </aside>
  )
}

export default Channels
