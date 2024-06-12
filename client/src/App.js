import React, { useState } from 'react';
// import Home from './components/Home';
// import ChatRoom from './components/ChatRoom';
import './index.css';
import ChatRoom from './Components/ChatRoom/ChatRoom';
import Home from './Components/Home';
// import Home from './Components/Home';

const App = () => {
  const [joinedRoom, setJoinedRoom] = useState(null);

  return (
    <div className="App">
      {joinedRoom ? (
        <ChatRoom roomCode={joinedRoom.roomCode} username={joinedRoom.username} />
      ) : (
        <Home setJoinedRoom={setJoinedRoom} />
      )}
    </div>
  );
};

export default App;
