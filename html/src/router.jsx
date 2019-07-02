import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from './utils/loadable.jsx';

const Index = loadable(() => import('./pages/index/index.jsx'));
const E404 = loadable(() => import('./pages/404/404.jsx'));

class AppRouter extends React.Component {
  render() {
    return pug`
      Router
        Switch
          Route(path='/', exact, component=Index)
          Route(component=E404)
    `;
  }
}

export default AppRouter;
