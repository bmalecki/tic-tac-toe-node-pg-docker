
const defaultState = {
  header: '',
  failed: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return {
        ...state,
        header: `Bearer ${action.payload.token}`,
        failed: false
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        header: '',
        failed: true
      };
    default:
      return state;
  }
};
