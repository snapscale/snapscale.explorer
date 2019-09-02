import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/Inbox';

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

const BlockDetails = (props) => {
  const classes = useStyles();

  const { values } = props;

  let sumNet = 0;
  let sumCpu = 0;

  if (!values.ld) {
    values.transactions.forEach((tx) => {
      sumCpu += tx.cpu_usage_us;
      sumNet += tx.net_usage_words;
    });
  }

  return pug`
    Title(
      Icon=InboxIcon
      Text='Block Details'
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
                xs=4
              )
                Typography(variant='h4')
                  |Block Number
              Grid(
                item
                xs=8
              )
                Typography(variant='h3')
                  =values.block_num.toLocaleString()
          Grid(
            item
            md=6
            xs=12
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
                  |Producer
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  a(href='/account/'+values.producer)
                    =values.producer
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
                  |Total CPU Usage
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  if sumCpu > (1000*1000)
                    =Math.floor(sumCpu / 1000 / 1000) + ' s '
                  if sumCpu > 1000
                    =Math.floor((sumCpu%(1000*1000)) / 1000) + ' ms '
                  =sumCpu%1000 + ' µs'
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
                  |Timestamp
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  =new Date(values.timestamp).toLocaleString()
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
                  |Total NET Usage
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  =sumNet
                  |&nbsp;
                  |B
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
                md=2
                xs=4
              )
                Typography(variant='h5')
                  |Block ID
              Grid(
                item
                md=10
                xs=8
              )
                Typography(variant='h5')
                  =values.id
  `;
};

export default BlockDetails;
