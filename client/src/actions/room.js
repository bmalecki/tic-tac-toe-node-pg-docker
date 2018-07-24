const ROOT_URI = 'http://localhost:8080';
const ROOMS_URI = `${ROOT_URI}/rooms`;


export const addRoom = props => ({
  type: 'ADD_ROOM',
  payload: props
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
  const user = getState().authorization.username;
  dispatch(addRoom({
    user,
    player1: sign === 'x' ? user : null,
    player2: sign === 'o' ? user : null,
    roomid: body.roomid,
    gameStatus: 'new'
  }));

  const { socket } = getState();
  socket.emit('CREATE_ROOM', {
    sign,
    player: user,
    roomid: body.roomid,
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
    return dispatch(requestAvailable());
  }
  throw new Error();
}).then(() => {
  const { socket } = getState();
  socket.emit('JOIN_ROOM', {
    sign,
    player: getState().authorization.username,
    roomid,
  }, () => { });
});


export const clearRooms = () => ({
  type: 'CLEAR_ROOMS',
  payload: {}
});
