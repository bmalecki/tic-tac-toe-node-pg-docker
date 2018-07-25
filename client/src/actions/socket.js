import { requestAvailable, addRoom } from './room';
import { changeFieldStatus } from './game';

export const initSocket = socket => (dispatch, getState) => {
  console.log('init socket');

  socket.on('ROOM_ADDED', () => {
    dispatch(requestAvailable());
  });

  socket.on('START_GAME', (props) => {
    dispatch(addRoom({
      ...props,
      user: getState().authorization.username
    }));
  });

  socket.on('MOVE_OPPONET', (props) => {
    console.log(props);
    dispatch(changeFieldStatus(props));
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
