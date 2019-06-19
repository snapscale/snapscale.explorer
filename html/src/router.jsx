import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import withWidth from '@material-ui/core/withWidth';
import Index from './pages/index/index.jsx';
import E404 from './pages/404/404.jsx';

function AppRouter(props) {
    window._x.width = props.width;
    return pug`
        Router
            Switch
                Route(
                    path='/',
                    exact,
                    component=Index,
                )
                Route(component=E404)
    `
  }
  
  export default withWidth()(AppRouter);