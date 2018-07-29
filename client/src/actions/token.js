import io from 'socket.io-client';
import { clearRooms } from './room';
import { getUserRooms } from './init';
import { initSocket, destroySocket } from './socket';

const SOCKET_URI = 'http://localhost:8080';
const URI = 'http://localhost:8080/users';

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
    return dispatch(getUserRooms(props.username));
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

export const registerUser = (username, password) => (dispatch, getState) => fetch(URI, {
  body: JSON.stringify({
    username,
    password
  }),
  cache: 'no-cache',
  headers: {
    'content-type': 'application/json'
  },
  method: 'POST',
}).then((res) => {
  if (res.status === 201) {
    return res.json();
  }

  throw new Error('Error');
}).then(body => dispatch(loginSuccessed({
  token: body.token,
  username: body.username,
  status: true,
  failed: false
})))
  .then(() => {
    console.log('login succ')

    // window.location.href = '/';
  })
  .catch((message) => {
    console.log(message)
    // this.setState({ registerErrorMessage: message });
    loginSuccessed(null);
  });
