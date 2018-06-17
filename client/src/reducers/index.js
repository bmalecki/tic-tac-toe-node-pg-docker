import { combineReducers } from 'redux';
import fields from './fields';
import rooms from './rooms';

export default combineReducers({
  fields,
  rooms
});
