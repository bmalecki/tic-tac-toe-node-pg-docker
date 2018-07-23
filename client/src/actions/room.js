import { getUserRooms } from './init';

const ROOT_URI = 'http://localhost:8080';
const ROOMS_URI = `${ROOT_URI}/rooms`;


export const addRoom = props => ({
  type: 'ADD_ROOM',
  payload: {
    ...props
  }
});


export const addNewRoom = ({ roomid, sign, player, }) => ({
  type: 'ADD_ROOM',
  payload: {
    roomid,
    sign,
    player,
  }
});


export const requestAddNewRoom = sign => (dispatch, getState) => fetch(ROOMS_URI, {
  body: JSON.stringify({
    sign
  }),
  cache: 'no-cache',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${window.localStorage.getItem('token')}`
  },
  method: 'POST'
}).then((res) => {
  if (res.status === 201) {
    return res.json();
  }
  throw new Error();
}).then((body) => {
  dispatch(addNewRoom({
    sign,
    player: getState().authorization.username,
    roomid: body.roomid,
  }));

  const { socket } = getState();
  socket.emit('join_room', {
    sign,
    player: getState().authorization.username,
    roomid: body.roomid,
  });
  socket.on('room message', (data) => {
    console.log(data);
  });
});


export const requestAvailable = () => (dispatch, getState) => fetch(`${ROOMS_URI}?available`, {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${window.localStorage.getItem('token')}`
  },
  method: 'GET'
}).then((res) => {
  if (res.status === 200) {
    return res.json();
  }
  throw new Error();
}).then((body) => {
  dispatch({
    type: 'ADD_AVAILABLE_ROOMS',
    payload: {
      body
    }
  });
});


export const joinRoom = (roomid, sign, username) => (dispatch, getState) => fetch(ROOMS_URI, {
  body: JSON.stringify({
    sign,
    roomid,
    username
  }),
  cache: 'no-cache',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${window.localStorage.getItem('token')}`
  },
  method: 'PUT',
}).then((res) => {
  if (res.status === 201) {
    Promise.all([
      dispatch(getUserRooms(username)),
      dispatch(requestAvailable())
    ]);
    return res.text();
  }
  throw new Error();
});


export const clearRooms = () => ({
  type: 'CLEAR_ROOMS',
  payload: {}
});
