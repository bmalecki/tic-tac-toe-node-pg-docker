export const initSocket = socket => ({
  type: 'IO_INIT',
  payload: {
    socket,
  }
});

export const destroySocket = socket => ({
  type: 'IO_DESTROY',
  payload: {
    socket,
  }
});
