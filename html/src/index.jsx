import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.jsx';

import './sass/index.scss';
import './global.jsx';

ReactDOM.render(
  <Router />,
  document.getElementById('app'),
);
