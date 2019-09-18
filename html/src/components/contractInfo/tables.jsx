import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import TableData from './tableData.jsx';

const useStyles = makeStyles(theme => ({
  btnContainer: {
    padding: '20px 60px',
  },
  titleContainer: {
    padding: '20px 60px 0 60px',
  },
  scopeContainer: {
    padding: '0 60px 20px 60px',
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
  inputRoot: {
    width: '100%',
  },
  table: {
    overflow: 'auto',
  },
}));

const Tables = (props) => {
  const classes = useStyles();

  const langMap = _x.config.langsMap[_x.utils.langs.get()];
  const arr = window.location.pathname.split('/');
  const account = arr[arr.length - 1];

  const [values, setValues] = React.useState(props.tables[0]);
  const [limitValues, setlimitValues] = React.useState(100);

  const clickHandle = (x) => {
    const mid = x;
    return () => {
      setValues(props.tables[mid]);
    };
  };

  const limitChange = (event) => {
    setlimitValues(parseInt(event.target.value, 10));
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
            =langMap[0xB100]
        div(className=classes.btnContainer)
          each item, index in props.tables
            if values.name === item.name
              Button(
                variant="contained"
                classes={
                  root:classes.btnHover
                }
                color="secondary"
              )
                =item.name
            else
              Button(
                variant="outlined"
                classes={
                  root:classes.btn
                }
                color="secondary"
                onClick=clickHandle(index)
              )
                =item.name
        div(className=classes.scopeContainer)
          Grid(
            container
            spacing=2
          )
            Grid(
              item
              xs=3
            )
              TextField(
                label="Scope"
                value=account
                variant="outlined"
                InputLabelProps={
                  focused: true,
                  shrink: true,
                }
                classes={
                  root: classes.inputRoot
                }
              )
            Grid(
              item
              xs=3
            )
              TextField(
                label="Lower Bound"
                variant="outlined"
                InputLabelProps={
                  focused: true,
                  shrink: true,
                }
                classes={
                  root: classes.inputRoot
                }
              )
            Grid(
              item
              xs=3
            )
              TextField(
                label="Upper Bound"
                variant="outlined"
                InputLabelProps={
                  focused: true,
                  shrink: true,
                }
                classes={
                  root: classes.inputRoot
                }
              )
            Grid(
              item
              xs=3
            )
              TextField(
                label="Limit"
                value=limitValues
                variant="outlined"
                InputLabelProps={
                  focused: true,
                  shrink: true,
                }
                classes={
                  root: classes.inputRoot
                }
                onChange=limitChange
              )
      Grid(
        item
        xs=12
      )
        Divider
      Grid(
        item
        xs=12
        className=classes.table
      )
        TableData(
          name=values.name
          limit=limitValues
        )
  `;
};

export default Tables;
