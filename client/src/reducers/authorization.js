
const defaultState = {
  token: window.localStorage.token || null,
  failed: false
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
        login: action.payload.status
      };
    default:
      return state;
  }
};
