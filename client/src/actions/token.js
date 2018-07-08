import { clearRooms } from './game';
import { getUserRooms } from './init';

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

export const loginSuccessed = ({ token, ...props }) => (dispatch, getState) => {
  dispatch({
    type: 'LOGIN_SUCCESSED',
    payload: {
      ...props
    }
  });
  dispatch(updateToken(token));
  if (props.username) {
    dispatch(getUserRooms(props.username));
  }
};

export const logout = () => (dispatch, getState) => {
  dispatch(loginSuccessed({
    status: false,
    token: null,
    username: null,
    failed: false
  }));
  dispatch(clearRooms());
};

