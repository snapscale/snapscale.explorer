import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  btnContainer: {
    padding: '20px 60px',
  },
  titleContainer: {
    padding: '20px 60px 0 60px',
  },
  btn: {
    margin: '0 8px 8px 0',
    fontSize: '.7rem',
  },
  btnHover: {
    margin: '0 8px 8px 0',
    fontSize: '.7rem',
    boxShadow: 'none',
    color: '#FFFFFF',
  },
}));

const Actions = (props) => {
  const classes = useStyles();

  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  const [values, setValues] = React.useState({});

  const clickHandle = (x) => {
    const mid = x;
    return () => {
      const z = {
        ...values,
      };
      z[mid] = true;

      setValues(z);
    };
  };

  const clickHandle2 = (x) => {
    const mid = x;
    return () => {
      const z = {
        ...values,
      };
      z[mid] = false;

      setValues(z);
    };
  };

  return pug`
    Grid(container)
      Grid(
        item
        xs=12
      )
        div(className=classes.titleContainer)
          Typography(
            variant='h4'
            display='inline'
          )
            =langMap[0xB101]
        div(className=classes.btnContainer)
          each item, index in props.actions
            if values[item.name]
              Button(
                variant="contained"
                classes={
                  root:classes.btnHover
                }
                color="secondary"
                onClick=clickHandle2(item.name)
              )
                =item.name
            else
              Button(
                variant="outlined"
                classes={
                  root:classes.btn
                }
                color="secondary"
                onClick=clickHandle(item.name)
              )
                =item.name
      Grid(
        item
        xs=12
      )
        Divider
      Grid(
        item
        xs=12
      )
  `;
};

export default Actions;
