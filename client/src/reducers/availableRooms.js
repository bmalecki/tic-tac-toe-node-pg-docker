import room from './room';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_AVAILABLE_ROOM':
      return {
        ...state,
        [action.payload.roomId]: room(state[action.payload.roomId], action)
      };
    case 'CLEAR_AVAILABLE_ROOMS':
      return {};
    default:
      return state;
  }
};
