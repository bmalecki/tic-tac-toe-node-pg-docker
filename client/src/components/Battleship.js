import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BeforeStartScreen from './battleshipScreens/BeforeStartScreen';
import GameScreen from './battleshipScreens/GameScreen';
import InsertShipsScreen from './battleshipScreens/InsertShipsScreen';

const Battleship = ({ room, match }) => {
  if (room !== undefined) {
    return (
      <div>
        <h1>Battleship</h1>
        <BeforeStartScreen {...room} />
        <InsertShipsScreen {...room} />
        <GameScreen {...room} />
      </div>
    );
  }

  return (<h1> This room does NOT exist </h1>);
};

Battleship.propTypes = {
  match: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  room: state.rooms[props.match.params.roomId]
});

export default connect(mapStateToProps)(Battleship);
