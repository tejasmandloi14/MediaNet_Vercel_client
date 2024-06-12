import React, { useState } from 'react';
import axios from 'axios';
// import socket from '../socket';
// import socket from '../socket';

const JoinRoom = ({ setJoinedRoom }) => {
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');

  const handleJoinRoom = async () => {
    try {
      
      const response = await axios.post('https://media-net-vercel-server.vercel.app/api/rooms/join', { code: roomCode, username:username });
      // socket.emit('joinRoom', { roomId: roomCode, username });
      setJoinedRoom({ roomCode, username });
      console.log('Joined room:', response.data);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return (
    <div>
      <input type="text" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="Enter room code" />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
