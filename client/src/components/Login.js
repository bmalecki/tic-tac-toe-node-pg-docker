import React from 'react';
import { Link } from 'react-router-dom';


import '../styles/Form.css';

const URI = 'http://localhost:8080/login';

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
        this.props.onLoginSuccessed(true, body.token);
      })
      .catch(() => this.props.onLoginSuccessed(false, null));
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
      </div>
    );
  }
}

export default Login;
