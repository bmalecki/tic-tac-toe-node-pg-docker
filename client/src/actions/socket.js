import { requestAvailable, addRoom } from './room';

export const initSocket = socket => (dispatch, getState) => {
  console.log('init socket');

  socket.on('ROOM_ADDED', () => {
    dispatch(requestAvailable());
  });

  socket.on('START_GAME', ({ roomid, player1, player2 }) => {
    console.dir({ roomid, player1, player2 });
    dispatch(addRoom({ roomid, player1, player2 }));
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
