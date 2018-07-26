import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewGameScreen from './gameScreens/NewGameScreen';
import GameScreen from './gameScreens/GameScreen';

const Game = ({ room, match }) => {
  if (room !== undefined) {
    return (
      <div>
        <h3>Tic tac toe</h3>
        <NewGameScreen {...room} />
        <GameScreen {...room} />
      </div>
    );
  }

  return (<h1> This room does NOT exist </h1>);
};

Game.propTypes = {
  match: PropTypes.object.isRequired,
  room: PropTypes.object
};

const mapStateToProps = (state, props) => ({
  room: state.rooms[props.match.params.roomid]
});

export default connect(mapStateToProps)(Game);
