import io from 'socket.io-client';
import { clearRooms } from './room';
import { getUserRooms } from './init';
import { initSocket, destroySocket } from './socket';

const SOCKET_URI = 'http://localhost:8080';


export const updateToken = token => (dispatch, getState) => {
  if (token !== null) {
    window.localStorage.setItem('token', token);
    dispatch({
      type: 'UPDATE_TOKEN',
      payload: {
        token
      }
    });
  } else {
    window.localStorage.removeItem('token');
  }
};

export const loginSuccessed = ({ token, ...props }) => (dispatch, getState) => {
  dispatch({
    type: 'LOGIN_SUCCESSED',
    payload: {
      ...props
    }
  });
  dispatch(updateToken(token));
  if (props.username) {
    dispatch(initSocket(io(SOCKET_URI)));
    dispatch(getUserRooms(props.username));
  }
};

export const logout = () => (dispatch, getState) => {
  dispatch(loginSuccessed({
    status: false,
    token: null,
    username: null,
    failed: false
  }));
  getState().socket.emit('destroy');
  dispatch(destroySocket());
  dispatch(clearRooms());
};

