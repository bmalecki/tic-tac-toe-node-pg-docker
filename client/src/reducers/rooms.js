import GAME_STATUS from '../constants/gameStatus';
import room from './room';

const defaultState = {
  a1: {
    roomId: 'a1',
    player1: 'id1',
    player2: 'id2',
    gameStatus: GAME_STATUS.PLAYING,
    message: ''
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'WAIT_FOR_OPPONENT':
    case 'CHANGE_GAME_STATUS':
      return {
        ...state,
        [action.payload.roomId]: room(state[action.payload.roomId], action)
      };
    case 'ADD_ROOM':
      return {
        ...state
      };
    case 'LEAVE_ROOM':
      return {
        ...state
      };
    default:
      return state;
  }
};
