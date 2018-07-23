import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginSuccessed } from '../actions/token';
import { requestAddNewRoom } from '../actions/room';
import '../styles/App.css';
import ExampleStyledComponent from './ExampleStyledComponent';
import '../styles/Home.css';
import Login from './Login';
import AvailableRooms from './AvailableRooms';


const Home = (props) => {
  const LogoutUser = props.userLogout && (
    <div className="logout-user">
      <Login onLoginSuccessed={props.onLoginSuccessed} show={props.userLogout} failed={props.failed} />
      <ExampleStyledComponent />
    </div>
  );

  const LoginUser = !props.userLogout && (
    <div className="login-user">
      <h2>Join to room</h2>
      <AvailableRooms />
      <h2>Add new room </h2>
      <button onClick={() => props.onAddRoom('x')}>Add new room AS X</button>
      <button onClick={() => props.onAddRoom('o')}>Add new room AS O</button>

    </div>
  );

  return (
    <div className="Home">
      {LogoutUser}
      {LoginUser}
    </div>
  );
};

Home.propTypes = {
  onLoginSuccessed: PropTypes.func.isRequired,
  userLogout: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  onAddRoom: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  userLogout: state.authorization.token === null,
  failed: state.authorization.failed
});

const mapDispatchToProps = dispatch => ({
  onLoginSuccessed: arg => dispatch(loginSuccessed(arg)),
  onAddRoom: sign => dispatch(requestAddNewRoom(sign))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
