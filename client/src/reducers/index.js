import { combineReducers } from 'redux';
import fields from './fields';
import rooms from './rooms';
import players from './players';

export default combineReducers({
  fields,
  rooms,
  players
});
