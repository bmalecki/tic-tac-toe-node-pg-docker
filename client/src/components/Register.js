import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginSuccessed } from '../actions/token';

import '../styles/Form.css';

const URI = 'http://localhost:8080/login';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: '',
    password: ''
  }

  getRegisterForm() {
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
        if (res.status === 200) {
          return res.json();
        }
        throw new Error();
      })
      .then((body) => {
        this.props.onLoginSuccessed(true, body.token);
      })
      .catch(() => this.props.onLoginSuccessed(false, null));
  }

  render() {
    if (this.props.showForm) {
      return this.getRegisterForm();
    }

    return (
      <div>
        You have account
      </div>
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
