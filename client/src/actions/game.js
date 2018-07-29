import GAME_STATUS from '../constants/gameStatus';


export const showMessage = (roomid, message) => ({
  type: 'SHOW_MESSAGE',
  payload: {
    roomid,
    message
  }
});

export const changeFieldStatus = ({ roomid, playerId, fieldId }) => ({
  type: 'CHANGE_FIELD_STATUS',
  payload: {
    fieldId,
    roomid,
    playerId,
  }
});


export const waitForOpponent = roomid => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.WAITING,
    roomid,
    message: 'WAIT'
  }
});


export const move = (roomid, playerId, fieldId) => (dispatch, getState) => {
  const { fields } = getState().rooms[roomid];

  if (!fields || (fields && !fields[fieldId])) {
    const { socket } = getState();
    socket.emit('MOVE', {
      fieldId,
      roomid,
      playerId,
    });

    dispatch(changeFieldStatus({ roomid, playerId, fieldId }));
    dispatch(waitForOpponent(roomid));
  } else {
    dispatch(showMessage(roomid, 'Field is not empty'));
  }
};


export const play = roomid => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.PLAYING,
    roomid,
    message: 'PLAY'
  }
});

export const waitForNewOpponent = roomid => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.NEW,
    roomid
  }
});

