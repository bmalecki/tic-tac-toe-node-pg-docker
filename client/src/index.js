import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import Root from './components/Root';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

console.log('start socket');

const socket = io('http://localhost:8080');

render(
  <Root store={store} />,
  document.getElementById('root'),
);

registerServiceWorker();

