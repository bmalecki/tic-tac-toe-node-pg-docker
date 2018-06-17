import React from 'react';
import PropTypes from 'prop-types';
import NewGameButton from '../buttons/NewGameButton';
import GAME_STATUS from '../../constants/gameStatus';

const BeforeStartScreen = ({ gameStatus, roomId }) => {
  const beforeStartScreen = gameStatus === GAME_STATUS.BEFORE_START && (
    <NewGameButton text="Start new game" roomId={roomId} />
  );

  return beforeStartScreen;
};

BeforeStartScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired
};

export default BeforeStartScreen;
