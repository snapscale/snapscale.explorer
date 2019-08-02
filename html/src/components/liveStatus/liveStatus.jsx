import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimelineIcon from '@material-ui/icons/Timeline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import Title from '../title/title.jsx';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1, 0, 3, 0),
    background: 'transparent',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
    },
  },
  paper2: {
    padding: theme.spacing(2),
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  divider: {
    background: theme.palette.secondary.contrastText,
    margin: theme.spacing(1, 0),
  },
}));

const LiveStatus = (props) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    head_block_num: 0,
    last_irreversible_block_num: 0,
    head_block_producer: '',
    next_producer: '',
    tps: 0,
    tps_high: 0,
    aps: 0,
    aps_high: 0,
  });

  if (!_x.utils.handles.dashboard.list.dashboard) {
    _x.utils.handles.dashboard.list.dashboard = (data) => {
      const [supply] = data.supply.split('.');
      const thisProducer = data.head_block_producer;
      const map = {};
      data.producers.forEach((i, index) => {
        map[i.producer_name] = data.producers[((index + 1) < data.producers.length) ? (index + 1) : 0].producer_name;
      });

      setValues({
        ...data,
        next_producer: map[thisProducer],
        supply,
      });
    };
  }

  return pug`
    Title(
      Icon=TimelineIcon
      Text='Live Status'
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
        spacing=2
      )
        Grid(
          item
          xs=12
          sm=6
          md=3
        )
          Paper(
            elevation=0
            className=classes.paper2
          )
            Typography(variant='h6')
              |Current Block
            Typography(variant='h5')
              = values.head_block_num
            Divider(className=classes.divider)
            Typography(variant='h6')
              |Last Irreversible Block
            Typography(variant='h5')
              = values.last_irreversible_block_num
        Grid(
          item
          xs=12
          sm=6
          md=3
        )
          Paper(
            elevation=0
            className=classes.paper2
          )
            Typography(variant='h6')
              |Current Producer
            Typography(variant='h5')
              = values.head_block_producer
            Divider(className=classes.divider)
            Typography(variant='h6')
              |Next Producer
            Typography(variant='h5')
              = values.next_producer
        Grid(
          item
          xs=12
          sm=6
          md=3
        )
          Paper(
            elevation=0
            className=classes.paper2
          )
            Typography(variant='h6')
              |TPS (Live / All Time High)
            Typography(variant='h5')
              | #{values.tps} / #{values.tps_high}
            Divider(className=classes.divider)
            Typography(variant='h6')
              |APS (Live / All Time High)
            Typography(variant='h5')
              | #{values.aps} / #{values.aps_high}
        Grid(
          item
          xs=12
          sm=6
          md=3
        )
          Paper(
            elevation=0
            className=classes.paper2
          )
            Typography(variant='h6')
              |Total Supply of XST
            Typography(variant='h5')
              = values.supply
            Divider(className=classes.divider)
            Typography(variant='h6')
              |Current XST/USD Price
            Typography(variant='h5')
              |$1.00 USD
  `;
};

export default LiveStatus;
