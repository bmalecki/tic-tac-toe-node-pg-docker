import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { logout } from '../actions/token';


const Navbar = ({ rooms, showLogout, onLogut }) => {
  const Rooms = _(rooms).keys().map(key => rooms[key])
    .map(room =>
      <li key={room.roomId}><Link to={`/game/${room.roomId}`} >Room {room.roomId}</Link></li>)
    .value();

  return (
    <header className="nav-bar">
      <ul>
        <li><Link to="/home" className="active">Home</Link></li>
        {Rooms}
        {showLogout &&
          <li onClick={() => onLogut()}><Link to="/home" className="active">Logout</Link></li>}
      </ul>
    </header>
  );
};

Navbar.propTypes = {
  rooms: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  rooms: state.rooms,
  showLogout: state.authorization.token !== null
});


const mapDispatchToProps = dispatch => ({
  onLogut: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
