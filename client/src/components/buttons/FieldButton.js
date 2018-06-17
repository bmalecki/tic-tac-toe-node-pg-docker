import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shoot, inserting } from '../../actions/battle';
import '../../styles/Button.css';
import GAME_STATUS from '../../constants/gameStatus';

const FieldButton = ({ text, onClick, playerId, gameStatus }) => (
  <button className="battle" onClick={() => onClick(text, playerId, gameStatus)}>
    {text}
  </button>
);

FieldButton.propTypes = {
  text: PropTypes.string.isRequired,
  gameStatus: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const getClickAction = (text, playerId, gameStatus) => {
  switch (gameStatus) {
    case GAME_STATUS.NEW: return inserting(text, playerId);
    case GAME_STATUS.PLAYING: return shoot(text, playerId);
    default: throw new Error('Unknow game status');
  }
};

const mapDispatchToProps = dispatch => ({
  onClick: (text, playerId, gameStatus) =>
    dispatch(getClickAction(text, playerId, gameStatus)),
});

export default connect(
  null,
  mapDispatchToProps
)(FieldButton);
