import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Title from '../title/title.jsx';

import KovoBlock from '../kovoBlock/kovoBlock.jsx';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '0.8rem',
    color: '#333333',
  },
  info: {
    color: '#333333',
    fontSize: '0.7rem',
    fontWeight: 800,
  },
  divider: {
    margin: '10px 0 20px 0',
  },
}));

const Contract = (props) => {
  const classes = useStyles();
  const langMap = _x.config.langsMap[_x.utils.langs.get()];
  const arr = window.location.pathname.split('/');
  const account = arr[arr.length - 1];

  return pug`
    Title(
      Icon='contract'
      Text=langMap[0xF009]
    )
    KovoBlock
      Typography(
        variant='h4'
        className=classes.title
      )
        |A smart contract is deployed on this account.
      Divider(className=classes.divider)
      Typography(
        variant='h4'
        className=classes.info
      )
        a(href='/contract/' + account)
          |VIEW CONTRACT DETAILS →
  `;
};

export default Contract;
