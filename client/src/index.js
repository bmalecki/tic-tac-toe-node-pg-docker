import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root'),
);

registerServiceWorker();
