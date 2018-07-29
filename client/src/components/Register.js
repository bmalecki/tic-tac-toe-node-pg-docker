import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/token';

import '../styles/Form.css';


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
    const errorMessage = this.state.registerErrorMessage !== null && <h3 className="error">Register error</h3>;

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
    this.props.onRegister(this.state.username, this.state.password);
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
  onRegister: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  showForm: state.authorization.token === null
});

const mapDispatchToProps = dispatch => ({
  onRegister: (username, password) => dispatch(registerUser(username, password))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
