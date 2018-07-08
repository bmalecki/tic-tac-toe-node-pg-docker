
const defaultState = null;

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'IO_INIT':
      return action.payload.socket;
    case 'IO_DESTROY':
      return null;
    default:
      return state;
  }
};
