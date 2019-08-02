import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.contrastText,
  },
}));

const Title = (props) => {
  const classes = useStyles();
  const { Icon, Text } = props;
  return pug`
    Grid(
      container
      direction='row'
      justify='flex-start'
      alignItems='center'
    )
      Icon(className=classes.icon)
      Typography(
        variant='h3'
        display='inline'
      )
        Box(
          color='secondary.contrastText'
          component='span'
        )
          ${Text}
  `;
};

export default Title;
