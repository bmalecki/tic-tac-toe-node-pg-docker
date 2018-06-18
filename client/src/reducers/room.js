const defaultState = {
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
    default:
      return state;
  }
};
