import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { logout } from '../actions/token';


class AvailableRooms extends React.Component {
  state = {
    availableRooms: null,
  }

  componentDidMount() {
    this.fetchRooms();
  }

  fetchRooms() {
    fetch('http://localhost:8080/rooms?available', {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ availableRooms: data });
      });
  }

  render() {
    const room = (opponent, sign, roomid) =>
      opponent &&
      <div className="join-room">
        Join to {opponent} in room <b>{roomid} as {sign}</b>
        <button>JOIN</button>
      </div>;

    const Rooms = _(this.state.availableRooms)
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
};

const mapStateToProps = state => ({
  rooms: state.rooms,
  showLogout: state.authorization.token !== null
});


const mapDispatchToProps = dispatch => ({
  onLogut: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRooms);
