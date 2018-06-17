import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../styles/Button.css';
import GameButtons from './GameButtons';
import SHIP from '../../constants/ship';
import { confirm, insertingShip } from '../../actions/insert';

const InsertShipsButtons = ({ dispatch, ...props }) => {
  const ShipButton = ({ children, type }) => (
    <button onClick={() => dispatch(insertingShip(type, props.roomId))}>
      {children}
    </button>);

  const ConfirmButton = ({ children, type }) => (
    <button onClick={() => dispatch(confirm(props.roomId))}>
      {children}
    </button>);

  const CancelButton = ({ children, type }) => (
    <button onClick={() => console.log("cancel")}>
      {children}
    </button>);

  return (
    <div>
      {!props.showGameButtons && (
        <p>
          <ShipButton type={SHIP.ONE}>Insert One Masted</ShipButton>
          <ShipButton type={SHIP.TWO}>Insert Two Masted</ShipButton>
          <ShipButton type={SHIP.THREE}>Insert Trhee Masted</ShipButton>
          <ShipButton type={SHIP.FOUR}>Insert Four Masted</ShipButton>
        </p>)}
      <p>
        <ConfirmButton>Confirm</ConfirmButton>
        <CancelButton>Cancel</CancelButton>
      </p>
      {props.showGameButtons && GameButtons(props.player1, props.gameStatus)}
    </div>
  );
};

InsertShipsButtons.propTypes = {
  player1: PropTypes.string.isRequired,
  gameStatus: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  showGameButtons: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state, props) => ({
  showGameButtons: state.rooms[props.roomId].insert.now
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertShipsButtons);
