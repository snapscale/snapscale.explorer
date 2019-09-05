import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';

import Title from '../title/title.jsx';
import Loading from '../loading/loading.jsx';
import KovoBlock from '../kovoBlock/kovoBlock.jsx';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 0,
  },
  item: {
    padding: theme.spacing(1, 0),
  },
  divider: {
    height: 1,
  },
  firstLine: {
    height: 80,
  },
  left: {
    padding: '0 0 0 60px',
  },
  right: {
    padding: '0 60px 0 0',
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
  title: {
    fontSize: '0.8rem',
    color: '#333333',
  },
  info: {
    color: '#333333',
    fontSize: '0.7rem',
    fontWeight: 800,
  },
  x: {
    color: '#382AC7',
    fontFamily: 'OPTI',
    fontSize: '1rem',
  },
  headBlock: {
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
  },
  spec: {
    paddingRight: 60,
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

  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  return pug`
    Title(
      Icon='blockDetail'
      Text=langMap[0xF003]
    )
    KovoBlock(
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
            className=clsx(classes.firstLine,classes.left,classes.headBlock)
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
                Typography(
                  variant='h4'
                  className=classes.title
                )
                  =langMap[0x5000]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h3'
                  className=classes.x
                )
                  =values.block_num.toLocaleString()
          Grid(
            item
            md=6
            xs=12
          )
          Grid(
            item
            xs=12
          )
            Divider(className=classes.divider)
          Grid(
            item
            md=6
            xs=12
            className=clsx(classes.left,classes.midtop,classes.normal)
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
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x5001]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
                  a(href='/account/'+values.producer)
                    =values.producer
          Grid(
            item
            md=6
            xs=12
            className=clsx(classes.midtop,classes.normal)
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
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x5004]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
                  if sumCpu > (1000*1000)
                    =Math.floor(sumCpu / 1000 / 1000) + ' s '
                  if sumCpu > 1000
                    =Math.floor((sumCpu%(1000*1000)) / 1000) + ' ms '
                  =sumCpu%1000 + ' µs'
          Grid(
            item
            md=6
            xs=12
            className=clsx(classes.left,classes.normal)
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
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x5002]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
                  =new Date(values.timestamp).toLocaleString()
          Grid(
            item
            md=6
            xs=12
            className=clsx(classes.normal)
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
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x5005]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
                  =sumNet
                  |&nbsp;
                  |B
          Grid(
            item
            xs=12
            className=clsx(classes.left,classes.midbottom,classes.normal,classes.spec)
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
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x5003]
              Grid(
                item
                md=10
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
                  =values.id
  `;
};

export default BlockDetails;
