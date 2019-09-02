import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Chip from '@material-ui/core/Chip';

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

const TransactionDetails = (props) => {
  const classes = useStyles();

  const { values } = props;

  return pug`
    Title(
      Icon=SwapHorizIcon
      Text='Transaction Details'
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
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=classes.item
            )
              Grid(
                item
                xs=2
              )
                Typography(variant='h5')
                  |Transaction Hash
              Grid(
                item
                xs=10
              )
                Typography(variant='h5')
                  =values.trx.trx_id
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
                xs=4
              )
                Typography(variant='h5')
                  |Status
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  Chip(
                    color="primary"
                    label=values.trace.receipt.status.toUpperCase()
                    size="small"
                  )
                  |&nbsp;
                  if values.trx.irreversible
                    Chip(
                      color="primary"
                      label="IRREVERSIBLE"
                      size="small"
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
                xs=4
              )
                Typography(variant='h5')
                  |CPU Usage
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  if values.trace.receipt.cpu_usage_us > (1000*1000)
                    =Math.floor(values.trace.receipt.cpu_usage_us / 1000 / 1000) + ' s '
                  if values.trace.receipt.cpu_usage_us > 1000
                    =Math.floor((values.trace.receipt.cpu_usage_us%(1000*1000)) / 1000) + ' ms '
                  =values.trace.receipt.cpu_usage_us%1000 + ' µs'
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
                xs=4
              )
                Typography(variant='h5')
                  |Block Number
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  a(href='/block/'+values.trace.block_num)
                    =values.trace.block_num.toLocaleString()
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
                xs=4
              )
                Typography(variant='h5')
                  |NET Usage
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  =values.trace.receipt.net_usage_words
                  |&nbsp;
                  |B
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
                xs=4
              )
                Typography(variant='h5')
                  |Block Time
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  =new Date(values.trace.block_time).toLocaleString()
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
                xs=4
              )
                Typography(variant='h5')
                  |Expiration Time
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  =new Date(values.trx.expiration).toLocaleString()
  `;
};

export default TransactionDetails;
