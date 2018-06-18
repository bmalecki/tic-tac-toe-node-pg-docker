import GAME_STATUS from '../constants/gameStatus';
import FIELD_STATUS from '../constants/fieldStatus';


export const showMessage = (roomId, message) => ({
  type: 'SHOW_MESSAGE',
  payload: {
    roomId,
    message
  }
});

const movePlayer = (roomId, id) => ({
  type: 'CHANGE_FIELD_STATUS',
  payload: {
    id,
    roomId,
    type: FIELD_STATUS.X
  }
});


export const move = (roomId, id) => (dispatch, getState) => {
  const fields = getState().fields[roomId];

  if (!fields || (fields && !fields[id])) {
    dispatch(movePlayer(roomId, id));
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
