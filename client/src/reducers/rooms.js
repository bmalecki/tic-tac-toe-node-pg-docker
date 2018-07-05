import room from './room';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
    case 'CHANGE_GAME_STATUS':
      return {
        ...state,
        [action.payload.roomId]: room(state[action.payload.roomId], action)
      };
    case 'ADD_ROOM':
      return {
        ...state,
        [action.payload.roomId]: room(null, action)
      };
    case 'LEAVE_ROOM':
      return {
        ...state
      };
    case 'CLEAR_ROOMS':
      return {};
    default:
      return state;
  }
};
