const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_AVAILABLE_ROOMS':
      return action.payload.body;
    case 'CLEAR_AVAILABLE_ROOMS':
      return [];
    default:
      return state;
  }
};
