import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import loadable from '@loadable/component';

const Index = loadable(() => import('./pages/index/index.jsx'));
const E404 = loadable(() => import('./pages/404/404.jsx'));

class AppRouter extends React.Component {
  render() {
    const { width } = this.props;
    _x.width = width;
    return pug`
      Router
        Switch
          Route(path='/', exact, component=Index)
          Route(component=E404)
    `;
  }
}

AppRouter.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(AppRouter);
