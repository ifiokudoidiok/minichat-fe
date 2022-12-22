import styles from './styles.module.css';
import React, { useState } from 'react';
import appStore from "store/AppStore";
import axios from 'axios'

const SendMessage = () => {
  // const SendMessage = ({ socket, username, room }) => {
  const user = appStore((state) => state.user);
  const room = appStore((state) => state.room);
  const socket = appStore((state) => state.socket);
  const message = appStore((state) => state.message);
  // const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message, __createdtime__ });
      // axios.post('//localhost:5055/chat/new-message', {username, room, message})
       axios.post('https://minichat-api-ifiokudoidiok.vercel.app:5055/chat/new-message', {username, room, message})
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
    });
      setMessage('');
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;