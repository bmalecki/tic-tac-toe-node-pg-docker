import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import '../styles/Navbar.css';
import { loginSuccessed } from '../actions/token';
import { requestAvailable } from '../actions/game';


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

  // fetchRooms() {
  //   const { logout } = this.props;

  //   fetch('http://localhost:8080/rooms?available', {
  //     headers: {
  //       Authorization: `Bearer ${window.localStorage.getItem('token')}`
  //     }
  //   })
  //     .then((res) => {
  //       if (res.status === 200) return res.json();
  //       throw new Error({ status: res.status });
  //     })
  //     .catch(() => logout())
  //     .then((data) => {
  //       if (this.isMount) this.setState({ availableRooms: data });
  //     });
  // }

  render() {
    const room = (opponent, sign, roomid) =>
      opponent &&
      <div className="join-room">
        Join to {opponent} in room <b>{roomid} as {sign}</b>
        <button onClick={() => onJoinRoom(roomid, sign).then(() => this.fetchRooms())} >
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
  availableRooms: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  availableRooms: () => dispatch(requestAvailable()),
  onLoginSuccessed: props => dispatch(loginSuccessed(props))
});

export default connect(null, mapDispatchToProps)(AvailableRooms);
