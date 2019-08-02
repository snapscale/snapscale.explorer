import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Basic from '../../templates/basic/basic.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10, 0),
    backgroundColor: 'transparent',
  },
}));

const E404Main = (props) => {
  const classes = useStyles();
  return pug`
    Paper(
      square
      elevation=0
      className=classes.root
    )
      Typography(variant='h4')
        Box(color='primary.dark')
          |404
      br
      Typography(variant='body1')
        Box(color='primary.main')
          |The page you are looking for could not be found
      br
      Typography(variant='body1')
        Box(color='primary.main')
          |path: #{props.pathname} 
  `;
};

class E404 extends React.Component {
  render() {
    const { pathname } = window.location;
    return pug`
      Basic
        Container(fixed)
          E404Main(pathname=pathname)
    `;
  }
}

export default E404;
