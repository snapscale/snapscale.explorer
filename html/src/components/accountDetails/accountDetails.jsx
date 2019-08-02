import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import Title from '../title/title.jsx';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2, 0),
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
  },
}));

const AccountDetails = (props) => {
  const classes = useStyles();
  return pug`
    Title(
      Icon=AccountBalanceWalletIcon
      Text='Account Details'
    )
    Paper(
      elevation=0
      className=classes.paper
    )
      Grid(
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        spacing=4
      )
        Grid(
          item
          xs=6
        )
          List(disablePadding)
            ListItem(disableGutters)
              Grid(
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              )
                Grid(item)
                  Typography(variant='h6')
                    |Account Name
                Grid(item)
                  Typography(variant='h6')
                    ${props.account}
            Divider
            ListItem(disableGutters)
              Grid(
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              )
                Grid(item)
                  Typography(variant='h6')
                    |Total Balance
                Grid(item)
                  Typography(variant='h6')
                    |34,792.1802 XST
        Grid(
          item
          xs=6
        )
          List(disablePadding)
            ListItem(disableGutters)
              Typography(variant='h6')
                |Created by one at Jul-18-2018, 16:08:47
            Divider
            ListItem(disableGutters)
              Grid(
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              )
                Grid(item)
                  Typography(variant='h6')
                    |RAM Usage
                Grid(item)
                  Typography(variant='h6')
                    |5.2 kB / 20.4 kB
  `;
};

export default AccountDetails;
