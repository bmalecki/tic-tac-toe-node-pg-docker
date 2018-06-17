import React from 'react';
import '../styles/App.css';
import logo from '../logo.svg';
import ExampleStyledComponent from './ExampleStyledComponent';
import '../styles/Home.css';

export default () => (
  <div>
    <ExampleStyledComponent />
    <div className="Home">
      <img src={logo} className="logo" alt="logo" />
      <h1 className="title">Welcome to React</h1>
      <p className="intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  </div>
);
