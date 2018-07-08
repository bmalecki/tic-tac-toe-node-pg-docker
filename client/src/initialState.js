import io from 'socket.io-client';
import { getUsername, initSocket } from './actions/init';

const SOCKET_URI = 'http://localhost:8080';

export default ({ dispatch }) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    dispatch(getUsername());
    dispatch(initSocket(io(SOCKET_URI)));
  }
};
