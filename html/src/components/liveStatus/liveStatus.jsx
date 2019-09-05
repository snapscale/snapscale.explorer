import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';

import KovoBlock from '../kovoBlock/kovoBlock.jsx';
import Title from '../title/title.jsx';
import StatusOne from './statusOne.jsx';
import StatusTwo from './statusTwo.jsx';

const BorderLinearProgress = withStyles({
  root: {
    borderRadius: '0.5rem',
    height: 10,
    backgroundColor: '#EAEAEA',
  },
  bar: {
    borderRadius: '0.5rem',
    backgroundColor: '#382AC7',
  },
})(LinearProgress);

const BorderLinearProgress1 = withStyles({
  root: {
    borderRadius: '0.5rem',
    height: 10,
    backgroundColor: '#EAEAEA',
  },
  bar: {
    borderRadius: '0.5rem',
    backgroundColor: '#0CB5E5',
  },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 0,
  },
  divider: {
    height: 3,
  },
  span: {
    fontSize: '0.7rem',
    color: '#CCCCCC',
    fontFamily: 'Nunito Sans',
  },
  span1: {
    fontSize: '0.5rem',
    color: '#999999',
    fontFamily: 'OPTI',
    letterSpacing: '0.5px',
  },
  firstLine: {
    height: 80,
  },
  lastLine: {
    height: 130,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  left: {
    padding: '0 0 0 60px',
  },
  right: {
    padding: '0 60px 0 0',
  },
  opti: {
    letterSpacing: '1px',
    fontFamily: 'OPTI',
    fontSize: '0.8rem',
    color: '#333333',
  },
  normal: {
    margin: '10px 0',
  },
  midtop: {
    marginTop: 30,
  },
  midbottom: {
    marginBottom: 30,
  },
  producer: {
    fontSize: '0.8rem',
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
  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  return pug`
    Title(
      Icon='liveStatus'
      Text=langMap[0xF000]
    )
    KovoBlock(className=classes.paper)
      Grid(
        container
      )
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key=langMap[0x2000]
            className=clsx(classes.firstLine,classes.left)
            subName=classes.opti
          )
            a(href='/block/' + values.blocks.current_block)
              =values.blocks.current_block.toLocaleString()
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key=langMap[0x2001]
            className=clsx(classes.firstLine,classes.right)
            subName=classes.opti
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
            Key=langMap[0x2002]
            className=clsx(classes.left,classes.midtop,classes.normal)
            subName=classes.opti
          )
            a(href='/block/' + values.blocks.last_irreversible_block)
              =values.blocks.last_irreversible_block.toLocaleString()
            Typography(
              variant='h6'
              display='inline'
              className=classes.span1
            )
              |&nbsp;
              =values.blocks.last_irreversible_block - values.blocks.current_block
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key=langMap[0x2003]
            className=clsx(classes.right,classes.midtop,classes.normal)
            subName=classes.opti
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
            Key=langMap[0x2004]
            className=clsx(classes.left,classes.normal)
          )
            Typography(variant='h6')
              Box(className=classes.producer)
                a(href='/account/' + values.producers.current_producer)
                  =values.producers.current_producer
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key=langMap[0x2005]
            className=clsx(classes.right,classes.normal)
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
            Key=langMap[0x2006]
            className=clsx(classes.left,classes.midbottom,classes.normal)
          )
            Typography(variant='h6')
              Box(className=classes.producer)
                a(href='/account/' + values.producers.producer_loop[values.producers.current_producer])
                  =values.producers.producer_loop[values.producers.current_producer]
        Grid(
          item
          md=6
          xs=12
        )
          StatusOne(
            Key=langMap[0x2007]
            className=clsx(classes.right,classes.midbottom,classes.normal)
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
                BorderLinearProgress1(
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
            Key=langMap[0x2008]
            className=clsx(classes.lastLine,classes.left)
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
            Key=langMap[0x2009]
            className=classes.lastLine
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
            Key=langMap[0x200A]
            className=classes.lastLine
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
            Key=langMap[0x200B]
            className=clsx(classes.lastLine,classes.right)
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
