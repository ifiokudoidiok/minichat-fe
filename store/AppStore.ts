import { IUser } from 'interfaces/users';
import { Socket } from 'socket.io-client';
import create from 'zustand';
import { IMessage } from 'interfaces/messages';

interface IAppStore {
  socket: Socket | Record<string, any>;
  user: IUser | null;
  token: string | null,
  room: string;
  message: IMessage | null;
  messagesRecieved: IMessage | null;
  reset: () => void;
}

const storeDefaults = {
  socket: {},
  user: null,
  token: null,
  room: null,
  message: null,
  messagesRecieved: null
};

const appStore = create(
  (set: any): IAppStore => ({
    ...storeDefaults,
    // Reset function to reset store values to default
    reset: () =>
      set({
        ...storeDefaults,
      }),
  }),
);

export default appStore;
