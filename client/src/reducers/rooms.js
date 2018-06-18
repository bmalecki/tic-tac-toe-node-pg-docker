import GAME_STATUS from '../constants/gameStatus';
import room from './room';

const defaultState = {
  a1: {
    roomId: 'a1',
    player1: 'player1',
    player2: 'player2',
    gameStatus: GAME_STATUS.NEW,
    message: ''
  },
  a2: {
    roomId: 'a2',
    player1: 'player3',
    player2: 'player4',
    gameStatus: GAME_STATUS.PLAYING,
    message: ''
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
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
