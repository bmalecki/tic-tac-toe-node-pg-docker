
const defaultState = {
  token: window.localStorage.token || null,
  failed: false,
  username: null,
  status: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return {
        ...state,
        token: action.payload.token,
      };
    case 'LOGIN_SUCCESSED':
      return {
        ...state,
        token: null,
        ...action.payload
      };
    default:
      return state;
  }
};
