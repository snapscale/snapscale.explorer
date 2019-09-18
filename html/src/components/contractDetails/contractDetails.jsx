import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../title/title.jsx';

import KovoBlock from '../kovoBlock/kovoBlock.jsx';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '0.8rem',
    color: '#333333',
  },
  x: {
    color: '#382AC7',
    fontFamily: 'OPTI',
    fontSize: '1rem',
    paddingLeft: '1rem',
  },
}));

const ContractDetails = (props) => {
  const classes = useStyles();
  const langMap = _x.config.langsMap[_x.utils.langs.get()];
  const arr = window.location.pathname.split('/');
  const account = arr[arr.length - 1];

  return pug`
    Title(
      Icon='contract'
      Text=langMap[0xF00A]
    )
    KovoBlock
      Typography(
        variant='h4'
        className=classes.title
      )
        |Account
        span.Acc(className=classes.x)
          =account
  `;
};

export default ContractDetails;
