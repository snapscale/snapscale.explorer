import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import loadable from './utils/loadable.jsx';

import theme from './theme/theme.jsx';

const Index = loadable(() => import('./pages/index/index.jsx'));
const Account = loadable(() => import('./pages/account/account.jsx'));
const Block = loadable(() => import('./pages/block/block.jsx'));
const Search = loadable(() => import('./pages/search/search.jsx'));
const Transaction = loadable(() => import('./pages/transaction/transaction.jsx'));
const E404 = loadable(() => import('./pages/404/404.jsx'));

class AppRouter extends React.Component {
  render() {
    return pug`
      ThemeProvider(theme=theme)
        Router
          Switch
            Route(path='/', exact, component=Index)
            Route(path='/account/:id', exact, component=Account)
            Route(path='/block/:id', exact, component=Block)
            Route(path='/transaction/:id', exact, component=Transaction)
            Route(path='/search/:id', exact, component=Search)
            Route(component=E404)
    `;
  }
}

export default AppRouter;
