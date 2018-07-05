import { updateToken } from './actions/token';
import { getUsername } from './actions/init';

export default ({ dispatch }) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    dispatch(getUsername());
  }

  // dispatch(updateToken(null));
};
