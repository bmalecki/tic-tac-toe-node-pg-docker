import GAME_STATUS from '../constants/gameStatus';

const defaultState = {
  roomId: null,
  player1: null,
  player2: null,
  gameStatus: GAME_STATUS.NEW,
  message: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_GAME_STATUS':
      return {
        ...state,
        gameStatus: action.payload.status,
        message: ''
      };
    case 'SHOW_MESSAGE':
      return {
        ...state,
        message: action.payload.message
      };

    case 'ADD_ROOM': {
      const { roomId, sign, player, opponent, gameStatus, message } = action.payload;
      return {
        roomId,
        player1: sign === 'o' ? player : (opponent || null),
        player2: sign === 'x' ? player : (opponent || null),
        gameStatus: gameStatus || GAME_STATUS.NEW,
        message: message || '',
      };
    }
    default:
      return state;
  }
};
