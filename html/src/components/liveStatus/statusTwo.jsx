import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  title: {
    color: '#333333',
  },
  x: {
    flexBasis: 0,
  },
}));

const StatusTwo = (props) => {
  const classes = useStyles();

  return pug`
    Grid(
      container
      spacing=1
      alignItems='center'
      className=props.className
    )
      Grid(
        item
        xs=12
        className=classes.x
      )
        Typography(variant='h5')
          Box(className=classes.title)
            =props.Key
      Grid(
        item
        xs=12
        className=classes.x
      )
        Typography(variant='h3')
          Box
            =props.children
  `;
};

export default StatusTwo;
