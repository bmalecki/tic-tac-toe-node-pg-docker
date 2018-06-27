import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Game from './Game';
import '../styles/App.css';

export default () => (
  <div className="App">
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/game/:roomId" component={Game} />
  </div>
);
