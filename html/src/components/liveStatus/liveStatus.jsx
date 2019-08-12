import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import TimelineIcon from '@material-ui/icons/Timeline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';

import Title from '../title/title.jsx';
import StatusOne from './statusOne.jsx';
import StatusTwo from './statusTwo.jsx';

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

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1, 0),
    margin: theme.spacing(1, 0, 3, 0),
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.secondary.contrastText,
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  span: {
    color: theme.palette.grey[500],
  },
}));

const LiveStatus = (props) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    blocks: {
      current_block: 0,
      last_irreversible_block: 0,
    },
    producers: {
      current_producer: '',
      next_producer: '',
      active_producer_list: [],
      producer_map: {},
      producer_loop: {},
    },
    performance: {
      tps: 0,
      aps: 0,
      tps_high: 0,
      aps_high: 0,
    },
    xst: {
      staked_xts: 0,
      voted_xst: 0,
      total_supply_of_xst: 0,
    },
    io: {
      ram_in_chain: 0,
      virtual_block_cpu_limit: 0,
      virtual_block_net_limit: 0,
      block_cpu_limit: 0,
      block_net_limit: 0,
    },
    count: {
      voted_total: 0,
      staked_total: 0,
    },
  });

  _x.utils.handles.dashboard.list.dashboard = setValues;

  return pug`
    Title(
      Icon=TimelineIcon
      Text='Live Status'
    )
    Paper(
      elevation=1
      className=classes.paper
    )
      Grid(
        container
      )
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key="Current Block"
          )
            a(href='/block/' + values.blocks.current_block)
              =values.blocks.current_block.toLocaleString()
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key="Total Supply of XST"
          )
            =values.xst.total_supply_of_xst.toLocaleString()
            |&nbsp;XST
        Grid(
          item
          xs=12
        )
          Divider(className=classes.divider)
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key="Last Irreversible Block"
          )
            a(href='/block/' + values.blocks.last_irreversible_block)
              =values.blocks.last_irreversible_block.toLocaleString()
            Typography(
              variant='h6'
              display='inline'
              className=classes.span
            )
              |&nbsp;
              =values.blocks.last_irreversible_block - values.blocks.current_block
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key="RAM In Chain"
          )
            =(values.io.ram_in_chain/1024).toLocaleString()
            |&nbsp;KB
            Typography(
              variant='h6'
              display='inline'
              className=classes.span
            )
              |&nbsp;≈&nbsp;
              =(values.io.ram_in_chain/1024/1024/1024).toFixed(1)
              |&nbsp;GB
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key="Current Producer"
          )
            Typography(variant='h6')
              Box
                a(href='/account/' + values.producers.current_producer)
                  =values.producers.current_producer
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key="Voted Total"
          )
            Grid(
              container
              alignItems='center'
              spacing=1
            )
              Grid(
                item
                xs=8
              )
                BorderLinearProgress(
                  variant="determinate"
                  color="secondary"
                  value=((values.xst.voted_xst / values.xst.total_supply_of_xst) * 100)
                )
              Grid(
                item
                xs=4
              )
                Typography(variant='h6')
                  Box
                    =(parseInt(((values.xst.voted_xst / values.xst.total_supply_of_xst) * 100)) + "%")
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key="Next Producer"
          )
            Typography(variant='h6')
              Box
                a(href='/account/' + values.producers.producer_loop[values.producers.current_producer])
                  =values.producers.producer_loop[values.producers.current_producer]
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key="Staked Total"
          )
            Grid(
              container
              alignItems='center'
              spacing=1
            )
              Grid(
                item
                xs=8
              )
                BorderLinearProgress(
                  variant="determinate"
                  color="secondary"
                  value=((values.xst.staked_xst / values.xst.total_supply_of_xst) * 100)
                )
              Grid(
                item
                xs=4
              )
                Typography(variant='h6')
                  Box
                    =(parseInt(((values.xst.staked_xst / values.xst.total_supply_of_xst) * 100)) + "%")
        Grid(
          item
          xs=12
        )
          Divider(className=classes.divider)
        Grid(
          item
          md=3
          sm=6
          xs=12
        )
          StatusTwo(
            Key="TPS (Live / All Time High)"
          )
            Typography(variant='h6')
              Box
                =values.performance.tps
                |&nbsp;/&nbsp;
                =values.performance.tps_high
        Grid(
          item
          md=3
          sm=6
          xs=12
        )
          StatusTwo(
            Key="APS (Live / All Time High)"
          )
            Typography(variant='h6')
              Box
                =values.performance.aps
                |&nbsp;/&nbsp;
                =values.performance.aps_high
        Grid(
          item
          md=3
          sm=6
          xs=12
        )
          StatusTwo(
            Key="CPU Limit (Block / Chain)"
          )
            Typography(variant='h6')
              Box
                =(values.io.block_cpu_limit / 1000000).toFixed(3).toLocaleString()
                |&nbsp;s
                |&nbsp;/&nbsp;
                =(values.io.virtual_block_cpu_limit / 1000000).toFixed(3).toLocaleString()
                |&nbsp;s
        Grid(
          item
          md=3
          sm=6
          xs=12
        )
          StatusTwo(
            Key="NET Limit (Block / Chain)"
          )
            Typography(variant='h6')
              Box
                =(values.io.block_net_limit / 1024).toFixed(2).toLocaleString()
                |&nbsp;KB
                |&nbsp;/&nbsp;
                =(values.io.virtual_block_net_limit / 1024 / 1024).toLocaleString()
                |&nbsp;MB
  `;
};

export default LiveStatus;
