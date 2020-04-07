import React from 'react';
import Message from './Message';
import './Messages.css';

const Messages = ({ messages,line, thisuser }) => (
  <div className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} line={line} thisuser={thisuser}/></div>)}
  </div>
);

export default Messages;