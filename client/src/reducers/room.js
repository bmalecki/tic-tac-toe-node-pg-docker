const defaultState = {
  roomid: null,
  player1: null,
  player2: null,
  gameStatus: 'new',
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

export default (state = defaultState, action) => {
  switch (action.type) {
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
        roomid,
        player1,
        player2,
        gameStatus,
        message: getMessage(user, player1, player2, gameStatus),
      };
    }
    default:
      return state;
  }
};
