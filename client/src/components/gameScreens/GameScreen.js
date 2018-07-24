import React from 'react';
import PropTypes from 'prop-types';
import Board from './BoardScreen';
import BoardMessage from './BoardMessage';
import GameButtons from '../buttons/GameButtons';

const GameScreen = (room) => {
  const gameScreen = ((room.gameStatus === 'move_player1')
    || (room.gameStatus === 'move_player2'))
    && (
      <div>
        <Board text={`Room: ${room.roomid}`} roomid={room.roomid} />
        <BoardMessage text={room.message} />
        {GameButtons(room)}
      </div>
    );

  return gameScreen;
};

GameScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  player1: PropTypes.string,
  player2: PropTypes.string,
  message: PropTypes.string.isRequired
};

export default GameScreen;
