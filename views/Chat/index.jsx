import styles from './styles.module.css';
import MessagesReceived from './Messages';
import SendMessage from './SendMessage';
import RoomAndUsersColumn from './RoomAndUsers';
import appStore from "store/AppStore";

// const Chat = ({ username, room, socket, messages, messagesRecieved, setMessagesReceived}) => {
  const Chat = () => {
  const user = appStore((state) => state.user);
  const room = appStore((state) => state.room);
  const socket = appStore((state) => state.socket);
  const messages = appStore((state) => state.message);
  const messagesRecieved = appStore((state) => state.messagesRecieved);
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} messagesRecieved={messagesRecieved}
                setMessagesReceived={setMessagesReceived} />
      <div>
        <MessagesReceived socket={socket} messages={messages} messagesRecieved={messagesRecieved}
                setMessagesReceived={setMessagesReceived}/>
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;