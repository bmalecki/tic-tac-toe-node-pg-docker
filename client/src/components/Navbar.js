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
      <Link to={`/game/${room.roomId}`} key={room.roomId}><button>Room {room.roomId}</button></Link>)
    .value();

  return (
    <header className="nav-bar">
      <div className="items-container">
        <Link to="/home" className="active"><button>Home</button></Link>
        {Rooms}
        {showLogout &&
          <Link to="/home" className="logout"><button onClick={() => onLogut()}>Logout</button></Link>}
      </div>
    </header>
  );
};

Navbar.propTypes = {
  rooms: PropTypes.object.isRequired,
  showLogout: PropTypes.bool.isRequired,
  onLogut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  rooms: state.rooms,
  showLogout: state.authorization.token !== null
});


const mapDispatchToProps = dispatch => ({
  onLogut: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
