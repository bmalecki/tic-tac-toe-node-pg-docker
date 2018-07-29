import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROOT_URI from '../constants/uri';

import '../styles/Form.css';

const URI = `${ROOT_URI}/login`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: '',
    password: ''
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
        this.setState({ password: '' });
        this.props.onLoginSuccessed({ status: true, failed: false, ...body });
      })
      .catch(() => this.props.onLoginSuccessed({
        status: false,
        failed: true,
        token: null,
        username: null
      }));
  }

  render() {
    return this.props.show && (
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

          <input type="submit" value="Submit" />
          <div>
            You have NOT got account yet. <Link to="/register" className="active">Register Now</Link>
          </div>
        </form>
        {this.props.failed && <div className="failed-login">Failed login</div>}

      </div>
    );
  }
}

Login.propTypes = {
  onLoginSuccessed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
};

export default Login;
