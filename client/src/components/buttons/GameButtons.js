import React from 'react';
import _, { range } from 'lodash';
import FieldButton from './FieldButton';
import BOARD_SIZE from '../../constants/boardSize';

const GameButtons = (playerId, gameStatus) => _(range(BOARD_SIZE.ROW))
  .map(i => String.fromCharCode('A'.charCodeAt(0) + i))
  .map(letter => range(BOARD_SIZE.COLUMN).map((number) => {
    const text = `${letter}${number + 1}`;
    return (<FieldButton
      key={text}
      text={text}
      playerId={playerId}
      gameStatus={gameStatus}
    />);
  }))
  .value();

export default GameButtons;
