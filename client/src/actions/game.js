import GAME_STATUS from '../constants/gameStatus';

const ROOT_URI = 'http://localhost:8080';
const ROOMS_URI = `${ROOT_URI}/rooms`;

export const addRoom = props => ({
  type: 'ADD_ROOM',
  payload: {
    ...props
  }
});

export const addNewRoom = ({ roomId, sign, player, }) => ({
  type: 'ADD_ROOM',
  payload: {
    roomId,
    sign,
    player,
  }
});

export const requestAddNewRoom = sign =>
  (dispatch, getState) => fetch(ROOMS_URI, {
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
      roomId: body.roomid,
    }));

    const { socket } = getState();
    socket.emit('join_room', {
      sign,
      player: getState().authorization.username,
      roomId: body.roomid,
    });
    socket.on('room message', (data) => {
      console.log(data);
    });
  });


export const joinRoom = (roomId, sign, player) => ({
  type: 'SHOW_MESSAGE',
  payload: {
    roomId,
    sign,
    player,
  }
});

export const clearRooms = () => ({
  type: 'CLEAR_ROOMS',
  payload: {}
});

export const showMessage = (roomId, message) => ({
  type: 'SHOW_MESSAGE',
  payload: {
    roomId,
    message
  }
});

const movePlayer = (roomId, playerId, id) => ({
  type: 'CHANGE_FIELD_STATUS',
  payload: {
    id,
    roomId,
    playerId
  }
});


export const move = (roomId, playerId, fieldId) => (dispatch, getState) => {
  const fields = getState().fields[roomId];

  if (!fields || (fields && !fields[fieldId])) {
    dispatch(movePlayer(roomId, playerId, fieldId));
    dispatch(showMessage(roomId, ''));
  } else {
    dispatch(showMessage(roomId, 'Field is not empty'));
  }
};


export const startGame = roomId => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.WAITING,
    roomId
  }
});
