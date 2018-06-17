import React from 'react';
import PropTypes from 'prop-types';
import Battlefield from './Battlefield';
import InsertShipsButtons from '../buttons/InsertShipsButtons';
import GAME_STATUS from '../../constants/gameStatus';

const InsertShipsScreen = (room) => {
  const insertShipsScreen = room.gameStatus === GAME_STATUS.NEW && (
    <div>
      <Battlefield text="Please insert your ships" playerId={room.player1} />
      <InsertShipsButtons {...room} />
    </div>
  );

  return insertShipsScreen;
};

InsertShipsScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  player1: PropTypes.string.isRequired,
};

export default InsertShipsScreen;
