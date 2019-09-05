import React from 'react';
import { makeStyles, formatMs } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ReorderIcon from '@material-ui/icons/Reorder';
import DnsIcon from '@material-ui/icons/Dns';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import loadable from '../../utils/loadable.jsx';
import Title from '../title/title.jsx';
import KovoBlock from '../kovoBlock/kovoBlock.jsx';

const Producers = loadable(() => import('./producers.jsx'));
const Transactions = loadable(() => import('./transactions.jsx'));

const useStyles = makeStyles(theme => ({
  main: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  paper: {
    color: '#999999',
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(0),
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    overflow: 'hidden',
  },
  paper2: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(0),
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    width: '100%',
    overflowX: 'auto',
  },
  tab: {
    color: '#382AC7',
  },
  root: {
    borderBottom: '.5px solid #C7C7C7',
  },
  indicator: {
    height: '0.2rem',
  },
  wrapper: {
    flexDirection: 'row',
    fontSize: '0.8rem',
    fontWeight: 800,
    minWidth: '12rem',
  },
  tabRoot: {
    textTransform: 'none',
    minHeight: '4.5rem',
  },
}));

const ListViewer = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const [rows, setRows] = React.useState([]);

  _x.utils.handles.dashboard.list.producers = (dashboard) => {
    const list = [];

    Object.keys(dashboard.producers.producer_map).forEach((k) => {
      const item = dashboard.producers.producer_map[k];
      if (dashboard.producers.current_producer === item.owner) {
        item.producing = true;
      }
      item.total = dashboard.chain.total_vote_weight;
      list.push(item);
    });

    setRows(list);
  };

  const [rows2, setRows2] = React.useState([]);

  _x.utils.handles.block = (data) => {
    data.transactions.forEach((tx) => {
      rows2.push({
        blockId: data.block_num,
        tx: tx.trx.id.slice(0, 6),
        txr: tx.trx.id,
        account: tx.trx.transaction.actions[0].account,
        name: tx.trx.transaction.actions[0].name,
        time: data.timestamp,
        from: tx.trx.transaction.actions[0].data.from,
        to: tx.trx.transaction.actions[0].data.to,
        quantity: tx.trx.transaction.actions[0].data.quantity,
      });
    });
    setRows2(rows2.slice(-250));
  };

  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  return pug`
    Title(
      Icon='information'
      Text=langMap[0xF002]
    )
    KovoBlock(
      className=classes.main
    )
      Paper(
        elevation=0
        className=classes.paper
      )
        Tabs(
          value=value
          onChange=handleChange
          classes={
            root:classes.root,
            indicator:classes.indicator
          }
        )
          Tab(
            label=langMap[0x4000]
            disableFocusRipple
            classes={
              selected:classes.tab,
              wrapper:classes.wrapper,
              root:classes.tabRoot
            }
          )
          Tab(
            label=langMap[0x4001]
            disableFocusRipple
            classes={
              selected:classes.tab,
              wrapper:classes.wrapper,
              root:classes.tabRoot
            }
          )
      Paper(
        elevation=0
        className=classes.paper2
      )
        if value === 0
          Producers(rows=rows)
        if value === 1
          Transactions(rows=rows2)
  `;
};

export default ListViewer;
