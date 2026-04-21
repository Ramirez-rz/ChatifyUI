import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket'
import ManageConnnection from './components/ManageConnnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels'
import Chats from './components/Chats'
import Users from './components/Users'
import heroImage from './assets/hero.png'

const STORAGE_KEY = 'chatify-device-id'

const createDeviceId = () => {
  if (typeof window === 'undefined') {
    return 'device-ssr'
  }

  const savedId = window.localStorage.getItem(STORAGE_KEY)

  if (savedId) {
    return savedId
  }

  const nextId =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `device-${Date.now()}-${Math.random().toString(16).slice(2)}`

  window.localStorage.setItem(STORAGE_KEY, nextId)
  return nextId
}

const CHANNELS = [
  { id: 'general-chat', label: '# general-chat', active: true },
  { id: 'development', label: '# development' },
  { id: 'design-system', label: '# design-system' },
]

const ONLINE_USERS = [
  { id: 'emerald-master', name: 'Emerald Master', status: 'Watching the core...', accent: true },
  { id: 'void-runner', name: 'Void Runner', status: 'Active now' },
  { id: 'neon-novice', name: 'Neon Novice', status: 'Syncing uplink' },
]

const OFFLINE_USERS = [
  { id: 'binary-bard', name: 'Binary Bard' },
  { id: 'ghost-protocol', name: 'Ghost Protocol' },
]

const createSeedMessages = (localDeviceId) => [
  {
    id: 'seed-1',
    senderName: 'Void Runner',
    senderRole: '',
    senderId: 'void-runner-device',
    text: 'The core resonance is stabilizing at 440Hz. Are we ready to initiate the Bio-Lab sync protocols?',
    timeLabel: '10:42 AM',
    groupLabel: 'Beginning of History - Sector 42',
  },
  {
    id: 'seed-2',
    senderName: 'Emerald Master',
    senderRole: 'ADMIN',
    senderId: 'emerald-master-device',
    text: "Proceed with caution. The luminous engine hasn't been stress-tested for a full sync since the last blackout. I'll monitor the Void Core from the command deck.",
    timeLabel: '10:44 AM',
  },
  {
    id: 'seed-3',
    senderName: 'Neon Novice',
    senderRole: '',
    senderId: 'neon-novice-device',
    text: "I've patched the auxiliary power rails. We should have 15% more overhead now. Lightning included.",
    timeLabel: '10:45 AM',
  },
  {
    id: 'seed-4',
    senderName: 'Tú',
    senderRole: 'YOU',
    senderId: localDeviceId,
    text: 'Perfecto. Dejo el canal listo para pruebas cruzadas entre dispositivos.',
    timeLabel: '10:46 AM',
    highlight: true,
  },
  {
    id: 'seed-5',
    senderName: 'Neon Novice',
    senderRole: '',
    senderId: 'neon-novice-device',
    text: 'Componente visual recibido. Lo dejo anclado al historial para revisión.',
    timeLabel: '10:47 AM',
    image: heroImage,
  },
]

const normalizeMessage = (incomingMessage, localDeviceId) => {
  if (typeof incomingMessage === 'string') {
    return {
      id: `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      senderName: 'Remote Node',
      senderRole: '',
      senderId: 'remote-device',
      text: incomingMessage,
      timeLabel: new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      }),
      isOwn: false,
    }
  }

  const text =
    incomingMessage?.text ||
    incomingMessage?.message ||
    incomingMessage?.content ||
    ''

  const senderId = incomingMessage?.senderId || 'remote-device'

  return {
    id:
      incomingMessage?.id ||
      `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    senderName: incomingMessage?.senderName || 'Remote Node',
    senderRole: incomingMessage?.senderRole || '',
    senderId,
    text,
    image: incomingMessage?.image || null,
    highlight: Boolean(incomingMessage?.highlight),
    timeLabel:
      incomingMessage?.timeLabel ||
      new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      }),
    groupLabel: incomingMessage?.groupLabel || '',
    isOwn: senderId === localDeviceId,
  }
}

function App() {
  const [deviceId] = useState(createDeviceId)
  const [messages, setMessages] = useState(() =>
    createSeedMessages(deviceId).map((message) => ({
      ...message,
      isOwn: message.senderId === deviceId,
    })),
  )
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    const onMessage = (incomingMessage, serverOffset) => {
      socket.auth.serverOffset = serverOffset
      setMessages((previous) => [
        ...previous,
        normalizeMessage(incomingMessage, deviceId),
      ])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('chat message', onMessage)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('chat message', onMessage)
    }
  }, [deviceId])

  const handleSendMessage = (text) => {
    const trimmedMessage = text.trim()

    if (!trimmedMessage) {
      return
    }

    const outgoingMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      senderName: 'Tú',
      senderRole: 'YOU',
      senderId: deviceId,
      text: trimmedMessage,
      timeLabel: new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      }),
    }

    socket.emit('chat message', outgoingMessage)
  }

  return (
    <div className="shell">
      <div className="app-frame">
        <aside className="app-rail">
          <button className="rail-badge rail-badge--active">L</button>
          <button className="rail-icon" aria-label="Home">
            ⌂
          </button>
          <button className="rail-icon" aria-label="Channels">
            ✦
          </button>
          <button className="rail-icon" aria-label="Launch">
            ⌁
          </button>
          <button className="rail-icon" aria-label="Signals">
            ☄
          </button>
          <div className="rail-spacer" />
          <button className="rail-icon rail-icon--small" aria-label="Settings">
            ⚙
          </button>
          <button className="rail-avatar" aria-label="Profile">
            🧑🏻
          </button>
        </aside>

        <div className="app-layout">
          <div className="left">
            <Channels channels={CHANNELS} />
          </div>

          <div className="center">
            <Chats
              activeChannel="# general-chat"
              messages={messages}
              isConnected={isConnected}
            />
            <MyForm onSendMessage={handleSendMessage} disabled={!isConnected} />
            <ManageConnnection
              connected={isConnected}
              onConnect={() => socket.connect()}
              onDisconnect={() => socket.disconnect()}
            />
          </div>

          <div className="right">
            <Users onlineUsers={ONLINE_USERS} offlineUsers={OFFLINE_USERS} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
