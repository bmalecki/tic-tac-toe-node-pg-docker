import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccessed } from '../actions/token';

import '../styles/Form.css';

const URI = 'http://localhost:8080/users';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: '',
    password: '',
    registerErrorMessage: null
  }

  getRegisterForm() {
    const errorMessage = this.state.registerErrorMessage !== null && <h3 className="error">User exists</h3>;

    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">
              Username:
              <input
                id="username"
                type="text"
                value={this.state.username}
                onChange={event => this.setState({ username: event.target.value })}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={event => this.setState({ password: event.target.value })}
              />
            </label>
          </div>

          <input type="submit" value="Register now" />
        </form>
        {errorMessage}
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(URI, {
      body: JSON.stringify(this.state),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }

        throw new Error('Error');
      })
      .then((body) => {
        this.props.onLoginSuccessed(true, body.token);
      })
      .catch((message) => {
        this.setState({ registerErrorMessage: message });
        this.props.onLoginSuccessed(false, null);
      });
  }

  render() {
    if (this.props.showForm) {
      return this.getRegisterForm();
    }

    return (
      <Redirect to="/home" />
    );
  }
}

Register.propTypes = {
  showForm: PropTypes.bool.isRequired,
  onLoginSuccessed: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  showForm: state.authorization.token === null
});

const mapDispatchToProps = dispatch => ({
  onLoginSuccessed: (status, token) => dispatch(loginSuccessed(status, token))

});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
