
const defaultState = {
  player3: {
    playerId: 'player3',
    sign: 'X'
  },
  player4: {
    playerId: 'player4',
    sign: 'O'
  }

};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TOOOODOO':
      return {
        ...state,
      };
    default:
      return state;
  }
};
