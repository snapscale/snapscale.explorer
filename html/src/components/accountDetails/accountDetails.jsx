import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
  li: {
    padding: '5rem 2rem',
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
          direction='row'
          justify='flex-start'
          alignItems='center'
          spacing=4
        )
          Grid(
            item
            md=6
            xs=12
          )
            List(disablePadding)
              ListItem(
                disableGutters
                classes={root:classes.li}
              )
                Grid(
                  container
                  alignItems='center'
                )
                  Grid(
                    item
                    xs=6
                  )
                    Typography(variant='h5')
                      |Account Name
                  Grid(
                    item
                    xs=6
                  )
                    Typography(
                      variant='h4'
                      align='right'
                    )
                      =values.account_name
              Divider
              ListItem(
                disableGutters
                classes={root:classes.li}
              )
                Grid(
                  container
                  alignItems='center'
                )
                  Grid(
                    item
                    xs=6
                  )
                    Typography(variant='h5')
                      |Total Balance
                  Grid(
                    item
                    xs=6
                  )
                    Typography(
                      variant='h4'
                      align='right'
                    )
                      =values.core_liquid_balance
          Grid(
            item
            md=6
            xs=12
          )
            List(disablePadding)
              ListItem(
                disableGutters
                classes={root:classes.li}
              )
                Grid(
                  container
                  alignItems='center'
                )
                  Grid(
                    item
                    xs=12
                  )
                    Typography(
                      variant='h6'
                      align='right'
                    )
                      |Created at
                      |&nbsp;
                      =new Date(values.created).toLocaleString()
              Divider
              ListItem(
                disableGutters
                classes={root:classes.li}
              )
                Grid(
                  container
                  alignItems='center'
                )
                  Grid(
                    item
                    md=4
                    xs=6
                  )
                    Typography(variant='h5')
                      |RAM Usage
                  Hidden(smDown)
                    Grid(
                      item
                      xs=4
                    )
                      BorderLinearProgress(
                        variant="determinate"
                        color="secondary"
                        value=((values.ram_usage / values.ram_quota) * 100)
                      )
                  Grid(
                    item
                    md=4
                    xs=6
                  )
                    Typography(
                      variant='h6'
                      align='right'
                    )
                      =(values.ram_usage / 1024).toFixed(2)
                      |&nbsp;kB
                      |&nbsp;/&nbsp;
                      =(values.ram_quota / 1024).toFixed(2)
                      |&nbsp;kB
  `;
};

export default AccountDetails;
