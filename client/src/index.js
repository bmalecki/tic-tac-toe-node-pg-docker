import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import Root from './components/Root';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import initialState from './initialState';

const store = configureStore();
initialState(store);

render(
  <Root store={store} />,
  document.getElementById('root'),
);

const socket = io('http://localhost:8080');

registerServiceWorker();
