import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.jsx';

import 'typeface-muli';
import './global.jsx';
import './sass/index.scss';

ReactDOM.render(
  <Router />,
  document.getElementById('app'),
);
