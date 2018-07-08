import { loginSuccessed } from './token';
import { addRoom } from './game';

const ROOT_URI = 'http://localhost:8080';
const USER_URI = `${ROOT_URI}/user`;
const USER_ROOMS_URI = username => `${ROOT_URI}/users/${username}/rooms`;

const getToken = () => window.localStorage.getItem('token');

export const getUsername = () => (dispatch, getState) => fetch(USER_URI, {
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  method: 'GET'
}).then((res) => {
  if (res.status === 200) {
    return res.json();
  }
  throw new Error();
}).then((body) => {
  dispatch(loginSuccessed({
    token: getToken(),
    username: body.username,
    status: true,
    failed: false
  }));
  return body.username;
});

export const getUserRooms = user => (dispatch, getState) => 
  fetch(USER_ROOMS_URI(user), {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    method: 'GET'
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error();
  }).then(body => body.forEach(room => dispatch(addRoom({
    roomId: room.roomid,
    player: user,
    sign: user.sign
  }))));

export const initSocket = socket => ({
  type: 'INIT_SOCKET_IO',
  payload: {
    socket,
  }
});
