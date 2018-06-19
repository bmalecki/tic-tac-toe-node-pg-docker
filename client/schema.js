const state = {
  fields: {
    a2: {
      B2: 'player2',
      B3: 'player2',
      A2: 'player1'
    }
  },
  rooms: {
    a1: {
      roomId: 'a1',
      player1: 'player1',
      player2: 'player2',
      gameStatus: 'NEW',
      message: ''
    },
    a2: {
      roomId: 'a2',
      player1: 'player3',
      player2: 'player4',
      gameStatus: 'PLAYING',
      message: ''
    }
  },
  player: {
    player1: {
      playerId: 'player1',
      sign: 'X'
    },
    player2: {
      playerId: 'player2',
      sign: 'O'
    }
  }
}
