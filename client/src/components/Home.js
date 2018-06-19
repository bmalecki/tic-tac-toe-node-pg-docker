import React from 'react';
import '../styles/App.css';
import logo from '../logo.svg';
import ExampleStyledComponent from './ExampleStyledComponent';
import '../styles/Home.css';
import Login from './Login';
import Lorem from './Lorem';

export default () => (
  <div>
    <Login />
    <ExampleStyledComponent />
    <div className="Home">
      <img src={logo} className="logo" alt="logo" />
      <h1 className="title">Welcome to React</h1>
      <p className="intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
    <Lorem />
  </div>
);
