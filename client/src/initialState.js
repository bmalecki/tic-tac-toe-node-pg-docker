import { updateToken } from './actions/token';

export default (store) => {
  store.dispatch(updateToken(null));
};
