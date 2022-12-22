import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import appStore from "store/AppStore";
import io from "socket.io-client";

// const socket = io.connect("http://localhost:5056");

// const Messages = ({ socket, messages, setMessages, messagesRecieved, setMessagesReceived }) => {
    const Messages = () => {
    // const [messagesRecieved, setMessagesReceived] = useState([]);
    const user = appStore((state) => state.user);
    const room = appStore((state) => state.room);
    const socket = appStore((state) => state.socket);
    const messages = appStore((state) => state.message);
    const messagesRecieved = appStore((state) => state.messagesRecieved);
    const messagesColumnRef = useRef(null); // Add this


    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
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

        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket]);


    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className={styles.messagesColumn}>
            {messages?.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.msgMeta}>{msg.username}</span>
                        <span className={styles.msgMeta}>
                            {formatDateFromTimestamp(msg.__createdtime__)}
                        </span>
                    </div>
                    <p className={styles.msgText}>{msg.message}</p>
                    <br />
                </div>
            ))}
            {messagesRecieved?.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.msgMeta}>{msg.username}</span>
                        <span className={styles.msgMeta}>
                            {formatDateFromTimestamp(msg.__createdtime__)}
                        </span>
                    </div>
                    <p className={styles.msgText}>{msg.message}</p>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Messages;