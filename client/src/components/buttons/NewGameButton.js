import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGame } from '../../actions/game';
import '../../styles/Button.css';

const NewGameButton = ({ text, onClick, roomid }) => (
  <button className="new-game" onClick={() => onClick(roomid)}>
    {text}
  </button>
);

NewGameButton.propTypes = {
  text: PropTypes.string.isRequired,
  roomid: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClick: roomid => dispatch(startGame(roomid)),
});

export default connect(
  null,
  mapDispatchToProps
)(NewGameButton);
