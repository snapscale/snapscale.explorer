import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
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
  title: {
    fontSize: '0.8rem',
    color: '#333333',
  },
  info: {
    color: '#333333',
    fontSize: '0.7rem',
    fontWeight: 800,
  },
  headBlock: {
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
  },
  x: {
    color: '#382AC7',
    fontFamily: 'OPTI',
    fontSize: '1rem',
  },
}));

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
    backgroundColor: '#E50C86',
  },
})(LinearProgress);

const BorderLinearProgress2 = withStyles({
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

const AccountDetails = (props) => {
  const classes = useStyles();

  const { values } = props;

  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  return pug`
    Title(
      Icon='account'
      Text=langMap[0xF007]
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
          )
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.item,classes.firstLine,classes.headBlock)
            )
              Grid(
                item
                sm=4
                xs=12
                className=classes.left
              )
                Typography(
                  variant='h4'
                  className=classes.title
                )
                  =langMap[0x9000]
              Grid(
                item
                sm=8
                xs=12
                className=classes.right
              )
                Typography(
                  variant='h3'
                  className=classes.x
                )
                  =values.info.account_name
          Grid(
            item
            md=6
            xs=12
          )
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.item,classes.firstLine,classes.headBlock)
            )
              Grid(
                item
                xs=12
              )
                Typography(
                  variant='h6'
                  className=classes.info
                )
                  =langMap[0x9001]
                  |&nbsp;
                  =new Date(values.info.created).toLocaleString()
          Grid(
            item
            xs=12
          )
            Divider(className=classes.divider)
          Grid(
            item
            md=6
            xs=12
            className=clsx(classes.normal,classes.midtop)
          )
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.item,classes.left)
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(
                  variant='h4'
                  className=classes.title
                )
                  =langMap[0x9002]
              Grid(
                item
                sm=8
                xs=12
              )
                Typography(
                  variant='h6'
                  className=classes.info
                )
                  =values.info.core_liquid_balance || '0 XST'
          Grid(
            item
            md=6
            xs=12
            className=clsx(classes.normal,classes.midtop)
          )
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.item,classes.right)
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(
                  variant='h4'
                  className=classes.title
                )
                  =langMap[0x9003]
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
                  className=classes.info
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
            className=clsx(classes.normal,classes.midbottom)
          )
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.item,classes.left)
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(
                  variant='h4'
                  className=classes.title
                )
                  =langMap[0x9004]
              Hidden(smDown)
                Grid(
                  item
                  xs=3
                )
                  BorderLinearProgress1(
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
                  className=classes.info
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
            className=clsx(classes.normal,classes.midbottom)
          )
            Grid(
              container
              alignItems='baseline'
              className=clsx(classes.item,classes.right)
            )
              Grid(
                item
                sm=4
                xs=12
              )
                Typography(
                  variant='h4'
                  className=classes.title
                )
                  =langMap[0x9005]
              Hidden(smDown)
                Grid(
                  item
                  xs=3
                )
                  BorderLinearProgress2(
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
                  className=classes.info
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
