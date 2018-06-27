export const updateToken = token => ({
  type: 'UPDATE_TOKEN',
  payload: {
    token
  }
});

export const loginFailed = () => ({
  type: 'LOGIN_FAILED'
});

