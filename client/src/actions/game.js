import GAME_STATUS from '../constants/gameStatus';

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

export const joinRoom = (roomid, sign, player) => ({
  type: 'SHOW_MESSAGE',
  payload: {
    roomid,
    sign,
    player,
  }
});

export const clearRooms = () => ({
  type: 'CLEAR_ROOMS',
  payload: {}
});

export const showMessage = (roomid, message) => ({
  type: 'SHOW_MESSAGE',
  payload: {
    roomid,
    message
  }
});

const movePlayer = (roomid, playerId, id) => ({
  type: 'CHANGE_FIELD_STATUS',
  payload: {
    id,
    roomid,
    playerId
  }
});


export const move = (roomid, playerId, fieldId) => (dispatch, getState) => {
  const fields = getState().fields[roomid];

  if (!fields || (fields && !fields[fieldId])) {
    dispatch(movePlayer(roomid, playerId, fieldId));
    dispatch(showMessage(roomid, ''));
  } else {
    dispatch(showMessage(roomid, 'Field is not empty'));
  }
};


export const startGame = roomid => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.WAITING,
    roomid
  }
});
