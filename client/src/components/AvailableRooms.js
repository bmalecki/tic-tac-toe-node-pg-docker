import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import '../styles/Navbar.css';
import { loginSuccessed } from '../actions/token';
import { requestAvailable } from '../actions/game';
import { getUserRooms } from '../actions/init';

const URI = 'http://localhost:8080/rooms';

const onJoinRoom = (roomid, sign) => {
  return fetch(URI, {
    body: JSON.stringify({
      sign,
      roomid
    }),
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`
    },
    method: 'PUT',
  })
    .then((res) => {
      if (res.status === 201) {
        return res.text();
      }
      throw new Error();
    });
};

class AvailableRooms extends React.Component {
  componentDidMount() {
    this.props.requestAvailableRooms();
  }

  render() {
    const room = (opponent, sign, roomid) =>
      opponent &&
      <div className="join-room">
        Join to {opponent} in room <b>{roomid} as {sign}</b>
        <button onClick={() => onJoinRoom(roomid, sign)
          .then(() => this.props.getUserRooms(this.props.username))
          .then(() => this.props.requestAvailableRooms())}
        >
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
  getUserRooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  availableRooms: state.availableRooms,
  username: state.authorization.username
});

const mapDispatchToProps = dispatch => ({
  getUserRooms: user => dispatch(getUserRooms(user)),
  requestAvailableRooms: () => dispatch(requestAvailable()),
  onLoginSuccessed: props => dispatch(loginSuccessed(props))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRooms);
