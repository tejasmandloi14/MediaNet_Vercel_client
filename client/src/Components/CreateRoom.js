import React, { useState } from 'react';
import axios from 'axios';
// const dotenv = require('dotenv')
// dotenv.config();
const CreateRoom = () => {
  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = async () => {
    console.log(process.env.REACT_APP_SERVER_URL);
    try {
      const response = await axios.post('https://media-net-vercel-server.vercel.app/api/rooms/create', { code: roomCode });
      console.log('Room created:', response.data);
      alert(`Room Created with code : ${roomCode}`);
      setRoomCode(''); // Clear the input after creating the room
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Error Creating Room');
    }
  };

  return (
    <div>
      <input type="text" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="Enter room code" />
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default CreateRoom;
