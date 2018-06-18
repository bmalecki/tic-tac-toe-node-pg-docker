
const defaultState = {
  a2: {
    B2: 'O',
    B3: 'O',
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD_STATUS':
      return {
        ...state,
        [action.payload.roomId]: {
          ...state[action.payload.roomId],
          [action.payload.id]: action.payload.type
        }
      };
    default:
      return state;
  }
};
