import GAME_STATUS from '../constants/gameStatus';


export const showMessage = (roomid, message) => ({
  type: 'SHOW_MESSAGE',
  payload: {
    roomid,
    message
  }
});


const movePlayer = (roomid, playerId, fieldId) => ({
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
    roomid
  }
});


export const move = (roomid, playerId, fieldId) => (dispatch, getState) => {
  const { fields } = getState().rooms[roomid];

  if (!fields || (fields && !fields[fieldId])) {
    dispatch(movePlayer(roomid, playerId, fieldId));
    dispatch(waitForOpponent(roomid));
    dispatch(showMessage(roomid, ''));
  } else {
    dispatch(showMessage(roomid, 'Field is not empty'));
  }
};


export const play = roomid => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.PLAYING,
    roomid
  }
});

export const waitForNewOpponent = roomid => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.NEW,
    roomid
  }
});

