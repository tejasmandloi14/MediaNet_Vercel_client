import React from 'react';
// import CreateRoom from './CreateRoom';
// import JoinRoom from './JoinRoom';
import './Home.css';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const Home = ({ setJoinedRoom }) => {
  return (
    <div className="home-container">
      <div className="nav-top">MediaNet</div>
      <div className="section">
        <h2>Create Room</h2>
        <CreateRoom />
      </div>
      <div className="section">
        <h2>Join Room</h2>
        <JoinRoom setJoinedRoom={setJoinedRoom} />
      </div>
    </div>
  );
};

export default Home;
