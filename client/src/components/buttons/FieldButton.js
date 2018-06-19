import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showMessage, move } from '../../actions/game';
import '../../styles/Button.css';
import GAME_STATUS from '../../constants/gameStatus';

const FieldButton = ({ fieldId, onClick, playerId, gameStatus, roomId }) => (
  <button className="battle" onClick={() => onClick({ fieldId, playerId, gameStatus, roomId })}>
    {fieldId}
  </button>
);

FieldButton.propTypes = {
  fieldId: PropTypes.string.isRequired,
  gameStatus: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const getClickAction = ({ fieldId, gameStatus, roomId, playerId }) => {
  switch (gameStatus) {
    case GAME_STATUS.WAITING: return showMessage(roomId, 'Waiting for opponent');
    case GAME_STATUS.PLAYING: return move(roomId, playerId, fieldId);
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
