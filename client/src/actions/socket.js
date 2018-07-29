import { requestAvailable, addRoom } from './room';
import { changeFieldStatus, play, waitForOpponent } from './game';
import { getUserRooms } from './init';

export const initSocket = socket => (dispatch, getState) => {
  socket.on('connect', () => {
    socket.emit('INIT', { user: getState().authorization.username });
  });

  socket.on('ROOM_ADDED', () => {
    dispatch(requestAvailable());
  });

  socket.on('USER_CREATED_ROOM', () => {
    const { username } = getState().authorization;
    dispatch(getUserRooms(username));
  });

  socket.on('START_GAME', (props) => {
    dispatch(addRoom({
      ...props,
      user: getState().authorization.username
    }));
  });

  socket.on('END_GAME', () => {
    const { username } = getState().authorization;
    dispatch(getUserRooms(username));
  });

  socket.on('MOVE_OPPONENT', ({ roomid, playerId, fieldId }) => {
    const state = getState();

    const currentUser = state.authorization.username;
    const movingUser = state.rooms[roomid][playerId];
    dispatch(changeFieldStatus({ roomid, playerId, fieldId }));

    if (currentUser !== movingUser) {
      dispatch(play(roomid));
    } else {
      dispatch(waitForOpponent(roomid));
    }
  });

  dispatch({
    type: 'IO_INIT',
    payload: {
      socket,
    }
  });
};

export const destroySocket = () => ({
  type: 'IO_DESTROY'
});
