const defaultState = {
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_GAME_STATUS':
      return {
        ...state,
        gameStatus: action.payload.status
      };
    case 'INSERTING':
      return {
        ...state,
        insert: { now: true, type: action.payload.type }
      };
    default:
      return state;
  }
};
