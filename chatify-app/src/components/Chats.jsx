import React, { useEffect } from 'react'
import { socket } from '../../socket';
import './Chats.css'

function Chats() {

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log("Mensaje desde el server:", msg)
    });
  }, []);

  return (
    <div className='chats-container'>
      <div className='chats'>
        <p> # fortnite</p>
      </div>
    </div>
  )
}

export default Chats
