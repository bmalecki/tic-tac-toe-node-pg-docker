export const insertingShip = (type, roomId) => ({
  type: 'INSERTING',
  payload: {
    type,
    roomId
  }
});

export const confirm = (type, roomId) => ({
  type: 'CONFIRM',
  payload: {
    type,
    roomId
  }
});
