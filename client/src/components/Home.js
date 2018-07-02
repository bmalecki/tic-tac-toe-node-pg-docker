import React from 'react';
import { connect } from 'react-redux';

import { loginSuccessed } from '../actions/token';
import '../styles/App.css';
import ExampleStyledComponent from './ExampleStyledComponent';
import '../styles/Home.css';
import Login from './Login';
import AvailableRooms from './AvailableRooms';

const Home = (props) => {
  const LogoutUser = props.userLogout && (
    <div className="logout-user">
      <Login onLoginSuccessed={props.onLoginSuccessed} show={props.userLogout} />
      <ExampleStyledComponent />
    </div>
  );

  const LoginUser = !props.userLogout && (
    <div className="login-user">
      <h2>User login</h2>
      <AvailableRooms />
    </div>
  );

  return (
    <div className="Home">
      {LogoutUser}
      {LoginUser}
    </div>
  );
};

const mapStateToProps = state => ({
  userLogout: state.authorization.token === null
});

const mapDispatchToProps = dispatch => ({
  onLoginSuccessed: (status, token) => dispatch(loginSuccessed(status, token))

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
