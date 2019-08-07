import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  box: {
    padding: theme.spacing(1, 2),
  },
  title: {
    color: theme.palette.grey[500],
  },
}));

const StatusOne = (props) => {
  const classes = useStyles();

  return pug`
    Grid(
      container
      spacing=1
      alignItems='center'
      className=classes.box
    )
      Grid(
        item
        xs=5
      )
        Typography(variant='h5')
          Box(className=classes.title)
            =props.Key
      Grid(
        item
        xs=7
      )
        Typography(variant='h3')
          Box
            =props.children
  `;
};

export default StatusOne;
