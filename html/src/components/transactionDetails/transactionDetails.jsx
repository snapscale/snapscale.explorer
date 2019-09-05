import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
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
  headBlock: {
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
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
  labelSmall: {
    color: '#FFFFFF',
  },
  chipA: {
    padding: '0.7rem',
    backgroundColor: '#0CB5E5',
  },
  chipB: {
    padding: '0.7rem',
    backgroundColor: '#382AC7',
  },
}));

const TransactionDetails = (props) => {
  const classes = useStyles();

  const { values } = props;

  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  return pug`
    Title(
      Icon='transaction'
      Text=langMap[0xF005]
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
            xs=12
            className=clsx(classes.left,classes.firstLine,classes.headBlock)
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
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x7000]
              Grid(
                item
                xs=10
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
                  =values.trx.trx_id
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
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.normal,classes.item,classes.midtop,classes.left)
            )
              Grid(
                item
                xs=4
              )
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x7001]
              Grid(
                item
                xs=8
              )
                Typography(variant='h5')
                  Chip(
                    color="primary"
                    label=values.trace.receipt.status.toUpperCase()
                    size="small"
                    classes={
                      root:classes.chipA,
                      labelSmall:classes.labelSmall
                    }
                  )
                  |&nbsp;
                  if values.trx.irreversible
                    Chip(
                      color="primary"
                      label="IRREVERSIBLE"
                      size="small"
                      classes={
                        root:classes.chipB,
                        labelSmall:classes.labelSmall
                      }
                    )
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.normal,classes.item,classes.midtop,classes.right)
            )
              Grid(
                item
                xs=4
              )
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x7004]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
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
              className=clsx(classes.normal,classes.item,classes.left)
            )
              Grid(
                item
                xs=4
              )
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x7002]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
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
              className=clsx(classes.normal,classes.item,classes.right)
            )
              Grid(
                item
                xs=4
              )
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x7005]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
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
              className=clsx(classes.normal,classes.item,classes.midbottom,classes.left)
            )
              Grid(
                item
                xs=4
              )
                Typography(
                  variant='h5' 
                  className=classes.title
                )
                  =langMap[0x7003]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
                  =new Date(values.trace.block_time).toLocaleString()
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.normal,classes.item,classes.midbottom,classes.bottom)
            )
              Grid(
                item
                xs=4
              )
                Typography(
                  variant='h5'
                  className=classes.title
                )
                  =langMap[0x7006]
              Grid(
                item
                xs=8
              )
                Typography(
                  variant='h5'
                  className=classes.info
                )
                  =new Date(values.trx.expiration).toLocaleString()
  `;
};

export default TransactionDetails;
