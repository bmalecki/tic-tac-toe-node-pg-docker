
const defaultState = {
  token: window.localStorage.token,
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
        token: '',
        login: action.payload.status
      };
    default:
      return state;
  }
};
