import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1, 0, 3, 0),
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
  },
}));

const NotFound = (props) => {
  const classes = useStyles();

  return pug`
    Paper(
      elevation=1
      className=classes.paper
    )
      Typography(variant='h5')
        |The
        |&nbsp;
        =props.keyx
        |&nbsp;
        |you are looking for could not be found
  `;
};

export default NotFound;
