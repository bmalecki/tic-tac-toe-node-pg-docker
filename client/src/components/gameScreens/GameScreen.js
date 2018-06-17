import React from 'react';
import PropTypes from 'prop-types';
import Board from './BoardScreen';
import BoardMessage from './BoardMessage';
import GameButtons from '../buttons/GameButtons';
import GAME_STATUS from '../../constants/gameStatus';

const GameScreen = (room) => {
  const gameScreen = ((room.gameStatus === GAME_STATUS.PLAYING)
    || (room.gameStatus === GAME_STATUS.WAITING))
    && (
      <div>
        <Board text={`Room: ${room.roomId}`} playerId={room.player1} />
        <BoardMessage text={room.message} />
        {GameButtons(room)}
      </div>
    );

  return gameScreen;
};

GameScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default GameScreen;
