import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGame } from '../../actions/game';
import '../../styles/Button.css';

const NewGameButton = ({ text, onClick, roomId }) => (
  <button className="new-game" onClick={() => onClick(roomId)}>
    {text}
  </button>
);

NewGameButton.propTypes = {
  text: PropTypes.string.isRequired,
  roomId: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClick: roomId => dispatch(startGame(roomId)),
});

export default connect(
  null,
  mapDispatchToProps
)(NewGameButton);
