import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  title: {
    color: '#333333',
    fontSize: '0.8rem',
    letterSpacing: '1px',
  },
}));

const StatusOne = (props) => {
  const classes = useStyles();

  return pug`
    Grid(
      container
      alignItems='center'
      className=props.className
    )
      Grid(
        item
        sm=5
        xs=12
      )
        Typography(variant='h5')
          Box(className=classes.title)
            =props.Key
      Grid(
        item
        sm=7
        xs=12
      )
        Typography(variant='h3')
          Box(className=props.subName)
            =props.children
  `;
};

export default StatusOne;
