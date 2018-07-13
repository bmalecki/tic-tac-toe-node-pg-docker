import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { logout } from '../actions/token';


const Navbar = ({ rooms, showLogout, onLogut, username }) => {
  const Rooms = _(rooms).keys().map(key => rooms[key])
    .map(room =>
      <Link to={`/game/${room.roomid}`} key={room.roomid}><button>Room {room.roomid}</button></Link>)
    .value();

  return (
    <header className="nav-bar">
      <div className="items-container">
        <Link to="/home" className="active"><button>Home</button></Link>
        {Rooms}
        {showLogout &&
          <Link to="/home" className="logout"><button onClick={() => onLogut()}>Logout {username}</button></Link>}
      </div>
    </header>
  );
};

Navbar.propTypes = {
  rooms: PropTypes.object.isRequired,
  showLogout: PropTypes.bool.isRequired,
  onLogut: PropTypes.func.isRequired,
  username: PropTypes.string
};

const mapStateToProps = state => ({
  rooms: state.rooms,
  showLogout: state.authorization.token !== null,
  username: state.authorization.username
});


const mapDispatchToProps = dispatch => ({
  onLogut: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
