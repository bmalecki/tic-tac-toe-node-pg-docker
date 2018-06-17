const defaultState = {
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_GAME_STATUS':
      return {
        ...state,
        gameStatus: action.payload.status
      };
    case 'WAIT_FOR_OPPONENT':
      return {
        ...state,
        message: 'Wait for opponent'
      };
    default:
      return state;
  }
};
