import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

const Abi = (props) => {
  const classes = useStyles();
  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  return pug`
    ReactJson(
      src=props.json
      enableClipboard=false
      style={
        padding: '10px',
        margin: '20px',
        fontSize: '.6rem',
        background: '#fafafa',
        position: 'unset',
      }
      collapsed=2
    )
  `;
};

export default Abi;
