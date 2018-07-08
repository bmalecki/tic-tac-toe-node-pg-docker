
const defaultState = null;

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'INIT_SOCKET_IO':
      return action.payload.socket;
    case 'DESTROY_SOCKET_IO':
      return null;
    default:
      return state;
  }
};