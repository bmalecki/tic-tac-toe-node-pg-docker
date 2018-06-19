
const defaultState = {
  a2: {
    B2: 'player4',
    B3: 'player3',
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD_STATUS':
      return {
        ...state,
        [action.payload.roomId]: {
          ...state[action.payload.roomId],
          [action.payload.id]: action.payload.playerId
        }
      };
    default:
      return state;
  }
};
