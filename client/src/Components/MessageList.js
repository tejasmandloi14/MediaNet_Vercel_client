// import React from 'react';

// const MessageList = ({ messages }) => {
//   return (
//     <div>
//       {messages.map((message) => (
//         <div key={message._id}>
//           <strong>{message.sender}</strong>: {message.content}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageList;


import React from 'react';
import './MessageList.css'
const MessageList = ({ messages, username }) => {
  return (
    <div className="messages">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sender === username ? 'sent' : 'received'}`}
        >
          <strong>{message.sender}:</strong> {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
