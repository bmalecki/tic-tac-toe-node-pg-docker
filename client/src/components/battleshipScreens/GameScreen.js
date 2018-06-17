import React from 'react';
import PropTypes from 'prop-types';
import Battlefield from './Battlefield';
import GameButtons from '../buttons/GameButtons';
import GAME_STATUS from '../../constants/gameStatus';

const GameScreen = ({ gameStatus, player1, player2 }) => {
  const gameScreen = gameStatus === (GAME_STATUS.WAITING || GAME_STATUS.PLAYING) && (
    <div>
      <Battlefield text="Player 1" playerId={player1} />
      <Battlefield text="Player 2" playerId={player2} />
      {GameButtons(player1, gameStatus)}
    </div>
  );

  return gameScreen;
};

GameScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired
};

export default GameScreen;
