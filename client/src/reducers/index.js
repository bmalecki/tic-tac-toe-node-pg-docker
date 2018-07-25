import { combineReducers } from 'redux';
import rooms from './rooms';
import availableRooms from './availableRooms';
import authorization from './authorization';
import socket from './socketio';

export default combineReducers({
  authorization,
  rooms,
  availableRooms,
  socket,
});
