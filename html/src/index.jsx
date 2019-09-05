import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.jsx';

import 'typeface-nunito-sans';
import './fonts/opti/stylesheet.css';
import './global.jsx';
import './sass/index.scss';

ReactDOM.render(
  <Router />,
  document.getElementById('app'),
);
