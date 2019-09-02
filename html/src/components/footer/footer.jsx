import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0),
  },
  box: {
    paddingLeft: '2rem',
  },
}));

const FooterMain = (props) => {
  const classes = useStyles();
  return pug`
    Grid(
      container
      direction='row'
      justify='space-between'
      alignItems='center'
      className=classes.root
    )
      Grid(item)
        Typography(variant='caption')
          Box(
            color='secondary.contrastText'
            className=classes.box
          )
            |© 2019 Xeniro
  `;
};

class Footer extends React.Component {
  render() {
    return pug`
      footer
        Container(fixed)
          FooterMain
    `;
  }
}

export default Footer;
