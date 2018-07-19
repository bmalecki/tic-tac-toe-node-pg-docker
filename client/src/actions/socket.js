export const initSocket = (socket) => {
  console.log('init socket');
  
  socket.on('msg', (msg) => {
    console.log('socket: ', msg);
  });

  return {
    type: 'IO_INIT',
    payload: {
      socket,
    }
  };
};

export const destroySocket = () => ({
  type: 'IO_DESTROY'
});
