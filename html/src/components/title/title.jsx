import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  icon: {
    paddingLeft: '2rem',
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.contrastText,
    fontSize: '10rem',
    width: '10rem',
    height: '10rem',
  },
  text: {
    lineHeight: '10rem',
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
        variant='h4'
        display='inline'
        className=classes.text
      )
        Grid(
          container
          alignItems='center'
        )
          Box(
            color='secondary.contrastText'
            component='span'
          )
            ${Text}
  `;
};

export default Title;
