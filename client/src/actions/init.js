import { loginSuccessed } from './token';

const ROOT_URI = 'http://localhost:8080';
const USER_URI = `${ROOT_URI}/user`;

const token = window.localStorage.getItem('token');

export const getUsername = () => (dispatch, getState) => fetch(USER_URI, {
  headers: {
    Authorization: `Bearer ${token}`
  },
  method: 'GET'
}).then((res) => {
  if (res.status === 200) {
    return res.json();
  }
  throw new Error();
}).then(body => dispatch(loginSuccessed({
  token,
  username: body.username,
  status: true,
  failed: false
})));

export const aaaa = null;

