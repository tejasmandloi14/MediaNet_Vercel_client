import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      sendMessage(content, 'text');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
