export const updateToken = token => (dispatch, getState) => {
  if (token !== null) {
    window.localStorage.token = token;
    dispatch({
      type: 'UPDATE_TOKEN',
      payload: {
        token
      }
    });
  } else {
    delete window.localStorage.token;
  }
};

export const loginSuccessed = status => ({
  type: 'LOGIN_SUCCESSED',
  payload: {
    status
  }
});

