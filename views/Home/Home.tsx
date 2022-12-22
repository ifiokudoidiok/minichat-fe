import styles from "./styles.module.css";
// import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/router";
import axios from "axios";
import appStore from "store/AppStore";
import io from "socket.io-client";

// const socketConnect = io.connect("http://localhost:5056");

// const Home = ({ username, setUsername, room, setRoom, socket, messages, setMessages }) => {
const Home = () => {
  // const navigate = useNavigate();
  const user = appStore((state) => state.user);
  const room = appStore((state) => state.room);
  const socket = appStore((state) => state.socket);
  const message = appStore((state) => state.message);
  // const loggedInUser: IUser | null = appStore((state) => state.user);

  const router = useRouter();
  const joinRoom = () => {
    if (room !== "" && user !== "") {
      socketConnect.emit("join_room", { username: user.username, room });
      //  axios.post('https://minichat-api-ifiokudoidiok.vercel.app:5055/chat/room', { room })
      axios
        .post("//localhost:5055/chat/room", { room })
        .then((res) => {
          setMessages(res.data);
          console.log(`Status: ${res.status}`);
          console.log("Body: ", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    router.push("/chat");
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) =>
            appStore.setState({
              user: { username: e.target.value },
            })
          }
        />

        <select
          className={styles.input}
          onChange={(e) =>
            appStore.setState({
              room: e.target.value,
            })
          } 
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="sample-room">Sample</option>
          <option value="react">React</option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
