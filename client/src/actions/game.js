import GAME_STATUS from '../constants/gameStatus';


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
