import React from 'react';
import '../styles/Login.css';

const URI = 'http://localhost:8080/users/login';

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
    });
  }

  render() {
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

          <input type="submit" value="Submit" />
          <div>
            You have NOT got account yet. Register now.
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
