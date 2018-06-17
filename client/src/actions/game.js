import GAME_STATUS from '../constants/gameStatus';
import FIELD_STATUS from '../constants/fieldStatus';


export const wait = roomId => ({
  type: 'WAIT_FOR_OPPONENT',
  payload: {
    roomId
  }
});

export const move = (id, player) => ({
  type: 'CHANGE_FIELD_STATUS',
  payload: {
    id,
    player,
    type: FIELD_STATUS.X
  }
});

export const startGame = roomId => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.WAITING,
    roomId
  }
});
