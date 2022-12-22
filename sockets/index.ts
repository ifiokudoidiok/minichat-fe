import io from 'socket.io-client';
import appStore from '../store/AppStore';

export const initSocket = () => {
  const SOCKET_URL = `${process.env.NEXT_PUBLIC_RCF_APP_URL}:5056`;
  const socket = io(SOCKET_URL);
  // Wait for socket to be connected to save in store.
  socket.on('connect', () => {
    appStore.setState({
      socket,
    });
  });
};
