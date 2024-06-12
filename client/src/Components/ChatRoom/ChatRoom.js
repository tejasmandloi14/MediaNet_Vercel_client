// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import socket from '../../socket';
// import MessageList from '../MessageList';
// import MessageInput from '../MessageInput';
// // import socket from '../socket';
// // import MessageList from './MessageList';
// // import MessageInput from './MessageInput';

// const ChatRoom = ({ roomCode, username }) => {
//   const [messages, setMessages] = useState([]);
//   const [canSendMessages, setCanSendMessages] = useState(false);

//   useEffect(() => {
//     const fetchMessages = async () => {
//         console.log(roomCode,username);
//       try {
//         const response = await axios.get(`http://localhost:3000/api/rooms/${roomCode}/messages`,{
//             roomID:roomCode,username:username.username
//         });
//         console.log(username);
//         setMessages(response.data);
//         setCanSendMessages(true);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setCanSendMessages(false);
//       }
//     };

//     fetchMessages();

//     socket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, [roomCode]);

//   const sendMessage = async (content, fileType) => {
//     console.log(username,content,fileType,roomCode);
//     try {
//       const message = { sender: username, content, fileType, roomId: roomCode };
//       await axios.post(`http://localhost:3000/api/rooms/${roomCode}/messages`, message);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Room: {roomCode}</h1>
//       <MessageList messages={messages} />
//       {canSendMessages && <MessageInput sendMessage={sendMessage} />}
//     </div>
//   );
// };

// export default ChatRoom;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import socket from '../../socket';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import './ChatRoom.css'; // Import the CSS file

const ChatRoom = ({ roomCode, username }) => {
  const [messages, setMessages] = useState([]);
  const [canSendMessages, setCanSendMessages] = useState(false);
  const [v,setV] = useState(1);
  // var val = 1;
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://media-net-vercel-server.vercel.app/api/rooms/${roomCode}/messages`, {
          params: { username }
        });
        setMessages(response.data);
        setCanSendMessages(true);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setCanSendMessages(false);
      }
    };

    fetchMessages();
    // socket.emit('joinRoom', { roomCode,username });

    // socket.on('message', (message) => {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });

    // return () => {
    //   socket.off('message');
    // };
  }, [roomCode, username,v]);

  const sendMessage = async (content, fileType) => {
    try {
      const message = { sender: username, content, fileType, roomId: roomCode };
      await axios.post(`https://media-net-vercel-server.vercel.app/api/rooms/${roomCode}/messages`, message);
      // val = 1-val;
      setV(1-v);
      // socket.emit('sendMessage', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
    <div className="chat-room-container">
      <h1 className='room'>Room: {roomCode}</h1>
      
      <MessageList  messages={messages} username={username} />
      {canSendMessages && <MessageInput sendMessage={sendMessage} />}
    </div>
    </>
  );
};

export default ChatRoom;
