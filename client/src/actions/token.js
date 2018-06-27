export const updateToken = token => (dispatch, getState) => {
  if (token !== null) {
    window.localStorage.setItem('token', token);
    dispatch({
      type: 'UPDATE_TOKEN',
      payload: {
        token
      }
    });
  } else {
    window.localStorage.removeItem('token');
  }
};

export const loginSuccessed = (status, token) => (dispatch, getState) => {
  dispatch({
    type: 'LOGIN_SUCCESSED',
    payload: {
      status
    }
  });
  dispatch(updateToken(token));
};

export const logout = () => (dispatch, getState) => {
  dispatch(loginSuccessed(false, null));
};

