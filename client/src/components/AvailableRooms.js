import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import '../styles/Navbar.css';
import { requestAvailable, joinRoom } from '../actions/game';


class AvailableRooms extends React.Component {
  componentDidMount() {
    this.props.requestAvailableRooms();
  }

  render() {
    const room = (opponent, sign, roomid) =>
      opponent &&
      <div className="join-room">
        Join to {opponent} in room <b>{roomid} as {sign}</b>
        <button onClick={() => this.props.joinRoom(roomid, sign, this.props.username)}>
          JOIN
        </button>
      </div>;

    const Rooms = _(this.props.availableRooms)
      .map(r => (
        <div key={r.roomid}>
          {room(r.x, 'o', r.roomid)}
          {room(r.o, 'x', r.roomid)}
        </div>
      )).value();

    return (
      <div>{Rooms}</div>
    );
  }
}

AvailableRooms.propTypes = {
  requestAvailableRooms: PropTypes.func.isRequired,
  availableRooms: PropTypes.array,
  username: PropTypes.string,
  joinRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  availableRooms: state.availableRooms,
  username: state.authorization.username
});

const mapDispatchToProps = dispatch => ({
  requestAvailableRooms: () => dispatch(requestAvailable()),
  joinRoom: (roomid, sign, player) => dispatch(joinRoom(roomid, sign, player))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRooms);
