import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginSuccessed } from '../actions/token';
import '../styles/App.css';
import ExampleStyledComponent from './ExampleStyledComponent';
import '../styles/Home.css';
import Login from './Login';
import AvailableRooms from './AvailableRooms';

const URI = 'http://localhost:8080/rooms';

const onAddRoom = sign => fetch(URI, {
  body: JSON.stringify({
    sign
  }),
  cache: 'no-cache',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${window.localStorage.getItem('token')}`
  },
  method: 'POST',
})
  .then((res) => {
    if (res.status === 201) {
      return res.text();
    }
    throw new Error();
  });


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
      <button onClick={() => onAddRoom('x')}>Add new room AS X</button>
      <button onClick={() => onAddRoom('o')}>Add new room AS O</button>

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
};


const mapStateToProps = state => ({
  userLogout: state.authorization.token === null,
  failed: state.authorization.failed
});

const mapDispatchToProps = dispatch => ({
  onLoginSuccessed: props => dispatch(loginSuccessed(props))

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
