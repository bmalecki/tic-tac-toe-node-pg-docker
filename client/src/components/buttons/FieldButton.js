import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showMessage, move } from '../../actions/game';
import '../../styles/Button.css';
import GAME_STATUS from '../../constants/gameStatus';

const FieldButton = ({ text, onClick, playerId, gameStatus, roomId }) => (
  <button className="battle" onClick={() => onClick({ text, playerId, gameStatus, roomId })}>
    {text}
  </button>
);

FieldButton.propTypes = {
  text: PropTypes.string.isRequired,
  gameStatus: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const getClickAction = ({ text, gameStatus, roomId }) => {
  switch (gameStatus) {
    case GAME_STATUS.WAITING: return showMessage(roomId, 'Waiting for opponent');
    case GAME_STATUS.PLAYING: return move(roomId, text);
    default: throw new Error('Unknow game status');
  }
};

const mapDispatchToProps = dispatch => ({
  onClick: parms => dispatch(getClickAction(parms))
});

export default connect(
  null,
  mapDispatchToProps
)(FieldButton);
