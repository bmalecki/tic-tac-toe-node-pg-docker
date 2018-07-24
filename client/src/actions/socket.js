import { requestAvailable, addRoom } from './room';
import { waitForOpponent } from './game';

export const initSocket = socket => (dispatch, getState) => {
  console.log('init socket');

  socket.on('ROOM_ADDED', () => {
    dispatch(requestAvailable());
  });

  socket.on('START_GAME', ({ roomid, x, o }) => {
    dispatch(addRoom({ roomid, x, o }));
    // dispatch(waitForOpponent(roomid));
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
