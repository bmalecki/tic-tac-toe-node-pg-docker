import GAME_STATUS from '../constants/gameStatus';


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
