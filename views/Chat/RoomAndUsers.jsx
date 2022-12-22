import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import appStore from "store/AppStore";
import io from "socket.io-client";

// const socket = io.connect("http://localhost:5056");

// const RoomAndUsers = ({ socket, username, room, messagesRecieved, setMessagesReceived }) => {
  const RoomAndUsers = (props) => {
  const user = appStore((state) => state.user);
  const room = appStore((state) => state.room);
  const socket = appStore((state) => state.socket);
  const message = appStore((state) => state.message);
  const [roomUsers, setRoomUsers] = useState([]);


  const router = useRouter();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setRoomUsers(data);
      console.log('room users', data)
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    socket.on('receive_message', (data) => {
        console.log(data);
        setMessagesReceived((state) => [
            ...state,
            {
                message: data.message,
                username: data.username,
                __createdtime__: data.__createdtime__,
            },
        ]);
    });
    console.log('Baba don leave oh')
    router.push("/");
    socket.off('receive_message')
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{room}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='btn btn-outline' onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;