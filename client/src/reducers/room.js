import GAME_STATUS from '../constants/gameStatus';

const defaultState = {
  roomid: null,
  playerId: null,
  player1: null,
  player2: null,
  fields: {},
  gameStatus: 'NEW',
  message: ''
};

function getMessage(user, player1, player2, gameStatus) {
  const message = (player) => {
    return user === player ? 'PLAY' : 'WAIT';
  };

  switch (gameStatus) {
    case 'move_player1': return message(player1);
    case 'move_player2': return message(player2);
    default: return 'error';
  }
}

function getGameStatus(user, player1, player2, gameStatus) {
  let gs = 'WRONG';

  if (gameStatus === 'NEW') {
    gs = GAME_STATUS.NEW;
  }
  if (gameStatus === 'move_player1' && user === player1) {
    gs = GAME_STATUS.PLAYING;
  }
  if (gameStatus === 'move_player2' && user === player2) {
    gs = GAME_STATUS.PLAYING;
  }
  if (gameStatus === 'move_player1' && user === player2) {
    gs = GAME_STATUS.WAITING;
  }
  if (gameStatus === 'move_player2' && user === player1) {
    gs = GAME_STATUS.WAITING;
  }

  return gs;
}

function getPlayerId(user, player1, player2) {
  if (user === player1) return 'player1';
  if (user === player2) return 'player2';
  throw new Error();
}

export default (_state, action) => {
  const state = _state || defaultState;

  switch (action.type) {
    case 'CHANGE_FIELD_STATUS':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.fieldId]: action.payload.playerId,
        }
      };
    case 'CHANGE_GAME_STATUS':
      return {
        ...state,
        gameStatus: action.payload.status,
        message: action.payload.message
      };
    case 'SHOW_MESSAGE':
      return {
        ...state,
        message: action.payload.message
      };
    case 'ADD_ROOM': {
      const { user, roomid, player1, player2, gameStatus } = action.payload;
      return {
        ...state,
        roomid,
        playerId: getPlayerId(user, player1, player2),
        player1,
        player2,
        gameStatus: getGameStatus(user, player1, player2, gameStatus),
        message: getMessage(user, player1, player2, gameStatus),
      };
    }
    default:
      return state;
  }
};
