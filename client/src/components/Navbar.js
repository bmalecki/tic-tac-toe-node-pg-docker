import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = ({ rooms }) => {
  const Rooms = _(rooms).keys().map(key => rooms[key])
    .map(room =>
      <li key={room.roomId}><Link to={`/game/${room.roomId}`} >Room {room.roomId}</Link></li>)
    .value();

  return (
    <header className="nav-bar">
      <ul>
        <li><Link to="/home" className="active">Home</Link></li>
        {Rooms}
      </ul>
    </header>
  );
};

Navbar.propTypes = {
  rooms: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  rooms: state.rooms
});

export default connect(mapStateToProps)(Navbar);
