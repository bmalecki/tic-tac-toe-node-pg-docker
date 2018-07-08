import { combineReducers } from 'redux';
import fields from './fields';
import rooms from './rooms';
import players from './players';
import authorization from './authorization';
import socketio from './socketio';

export default combineReducers({
  authorization,
  fields,
  rooms,
  players,
  socketio,
});
