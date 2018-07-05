import { updateToken } from './actions/token';
import { getUsername, getUserRooms } from './actions/init';

export default ({ dispatch }) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    dispatch(getUsername())
      .then(username => dispatch(getUserRooms(username)));
  }

  // dispatch(updateToken(null));
};
