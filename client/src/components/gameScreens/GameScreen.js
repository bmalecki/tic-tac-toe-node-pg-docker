import React from 'react';
import PropTypes from 'prop-types';
import Board from './BoardScreen';
import BoardMessage from './BoardMessage';
import GameButtons from '../buttons/GameButtons';
import GAME_STATUS from '../../constants/gameStatus';

const GameScreen = (room) => {
  const gameScreen = ((room.gameStatus === GAME_STATUS.PLAYING)
    || (room.gameStatus === GAME_STATUS.WAITING)
    || (room.gameStatus === GAME_STATUS.END))
    && (
      <div>
        <BoardMessage text={room.message} />
        <Board text={`Room: ${room.roomid}`} roomid={room.roomid} />
        <p>{GameButtons(room)}</p>
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
