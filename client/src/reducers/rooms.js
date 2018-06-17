import GAME_STATUS from '../constants/gameStatus';
import room from './room';

const defaultState = {
  a1: {
    roomId: 'a1',
    player1: 'id1',
    player2: 'id2',
    gameStatus: GAME_STATUS.BEFORE_START,
    insert: { now: false, type: null }
  },
  a2: {
    roomId: 'a2',
    player1: 'player3',
    player2: 'player4',
    gameStatus: GAME_STATUS.BEFORE_START,
    insert: { now: false, type: null }
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'INSERTING':
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
