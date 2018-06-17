import GAME_STATUS from '../constants/gameStatus';
import FIELD_STATUS from '../constants/fieldStatus';

export const insertingShip = (type, roomId) => ({
  type: 'INSERTING',
  payload: {
    type,
    roomId
  }
});

export const inserting = (id, player) => ({
  type: 'CHANGE_FIELD_STATUS',
  payload: {
    id,
    player,
    type: FIELD_STATUS.INSERTING
  }
});

export const shoot = (id, player) => ({
  type: 'CHANGE_FIELD_STATUS',
  payload: {
    id,
    player,
    type: FIELD_STATUS.SHOOTED
  }
});

export const startGame = roomId => ({
  type: 'CHANGE_GAME_STATUS',
  payload: {
    status: GAME_STATUS.NEW,
    roomId
  }
});
