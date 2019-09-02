import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LinearProgress from '@material-ui/core/LinearProgress';

import Title from '../title/title.jsx';
import Loading from '../loading/loading.jsx';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1, 0, 3, 0),
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(1, 0),
  },
}));

const BorderLinearProgress = withStyles({
  root: {
    borderRadius: '1rem',
    height: 10,
    backgroundColor: lighten('#333333', 0.5),
  },
  bar: {
    borderRadius: '1rem',
    backgroundColor: '#333333',
  },
})(LinearProgress);

const AccountDetails = (props) => {
  const classes = useStyles();

  const { values } = props;

  return pug`
    Title(
      Icon=AccountBalanceWalletIcon
      Text='Account Details'
    )
    Paper(
      elevation=1
      className=classes.paper
    )
      if values.ld
        Loading
      else
        Grid(
          container
        )
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=classes.item
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(variant='h4')
                  |Account Name
              Grid(
                item
                sm=8
                xs=12
              )
                Typography(variant='h3')
                  =values.info.account_name
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=classes.item
            )
              Grid(
                item
                xs=12
              )
                Typography(
                  variant='h6'
                )
                  |Created at
                  |&nbsp;
                  =new Date(values.info.created).toLocaleString()
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=classes.item
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(variant='h4')
                  |Total Balance
              Grid(
                item
                sm=8
                xs=12
              )
                Typography(
                  variant='h6'
                )
                  =values.info.core_liquid_balance || '0 XST'
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=classes.item
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(variant='h4')
                  |RAM Usage
              Hidden(smDown)
                Grid(
                  item
                  xs=3
                )
                  BorderLinearProgress(
                    variant="determinate"
                    color="secondary"
                    value=((values.info.ram_usage / values.info.ram_quota) * 100)
                  )
                Grid(
                  item
                  xs=1
                )
              Grid(
                item
                md=4
                xs=12
              )
                Typography(
                  variant='h6'
                )
                  =(values.info.ram_usage / 1024).toFixed(2)
                  |&nbsp;kB
                  |&nbsp;/&nbsp;
                  =(values.info.ram_quota / 1024).toFixed(2)
                  |&nbsp;kB
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=classes.item
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(variant='h4')
                  |CPU Usage
              Hidden(smDown)
                Grid(
                  item
                  xs=3
                )
                  BorderLinearProgress(
                    variant="determinate"
                    color="secondary"
                    value=((values.info.cpu_limit.used / values.info.cpu_limit.max) * 100)
                  )
                Grid(
                  item
                  xs=1
                )
              Grid(
                item
                md=4
                xs=12
              )
                Typography(
                  variant='h6'
                )
                  if values.info.cpu_limit.used > (1000*1000)
                    =Math.floor(values.info.cpu_limit.used / 1000 / 1000) + ' s '
                  else if values.info.cpu_limit.used > 1000
                    =Math.floor((values.info.cpu_limit.used%(1000*1000)) / 1000) + ' ms '
                  else
                    =values.info.cpu_limit.used%1000 + ' µs'
                  |&nbsp;/&nbsp;
                  if values.info.cpu_limit.max > (1000*1000)
                    =Math.floor(values.info.cpu_limit.max / 1000 / 1000) + ' s '
                  else if values.info.cpu_limit.max > 1000
                    =Math.floor((values.info.cpu_limit.max%(1000*1000)) / 1000) + ' ms '
                  else
                    =values.info.cpu_limit.max%1000 + ' µs'
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=classes.item
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(variant='h4')
                  |NET Usage
              Hidden(smDown)
                Grid(
                  item
                  xs=3
                )
                  BorderLinearProgress(
                    variant="determinate"
                    color="secondary"
                    value=((values.info.net_limit.used / values.info.net_limit.max) * 100)
                  )
                Grid(
                  item
                  xs=1
                )
              Grid(
                item
                md=4
                xs=12
              )
                Typography(
                  variant='h6'
                )
                  if values.info.net_limit.used > (1024*1024)
                    =Math.floor(values.info.net_limit.used / 1024 / 1024) + ' MB '
                  else if values.info.net_limit.used > 1024
                    =Math.floor((values.info.net_limit.used%(1024*1024)) / 1024) + ' KB '
                  else
                    =values.info.net_limit.used%1024 + ' B'
                  |&nbsp;/&nbsp;
                  if values.info.net_limit.max > (1024*1024)
                    =Math.floor(values.info.net_limit.max / 1024 / 1024) + ' MB '
                  else if values.info.net_limit.max > 1024
                    =Math.floor((values.info.net_limit.max%(1024*1024)) / 1024) + ' KB '
                  else
                    =values.info.net_limit.max%1024 + ' B'
  `;
};

export default AccountDetails;
