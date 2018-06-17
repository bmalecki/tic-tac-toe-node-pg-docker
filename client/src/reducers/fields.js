
const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD_STATUS':
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          [action.payload.id]: action.payload.type
        }
      };
    default:
      return state;
  }
};
