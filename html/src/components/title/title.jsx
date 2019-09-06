import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  block: {
    padding: '0.8rem 0',
  },
  icon: {
    paddingLeft: '0.2rem',
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.contrastText,
    fontSize: '1rem',
    width: '1.7rem',
    height: '1.7rem',
  },
  text: {
    lineHeight: '1rem',
  },
  textInner: {
    fontWeight: 800,
    letterSpacing: '.05rem',
    fontSize: '1rem',
  },
}));

const Title = (props) => {
  const classes = useStyles();
  const { Icon, Text } = props;
  return pug`
    Grid(
      className=classes.block
      container
      direction='row'
      justify='flex-start'
      alignItems='center'
    )
      img(
        src='/src/images/'+props.Icon+'.svg'
        className=classes.icon
      )
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
            className=classes.textInner
          )
            ${Text}
      =props.other
  `;
};

export default Title;
