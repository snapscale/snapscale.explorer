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

const Producers = loadable(() => import('./producers.jsx'));
const Transactions = loadable(() => import('./transactions.jsx'));

const useStyles = makeStyles(theme => ({
  main: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  paper: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(0),
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    overflow: 'hidden',
  },
  paper2: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0),
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    width: '100%',
    overflowX: 'auto',
  },
  tab: {
    backgroundColor: theme.palette.grey[300],
  },
  wrapper: {
    flexDirection: 'row',
    fontSize: '7rem',
    fontWeight: 300,
    paddingBottom: '2rem',
    '& :first-child': {
      fontSize: '8rem',
      marginBottom: '0 !important',
      marginRight: theme.spacing(1),
    },
  },
  tabRoot: {
    textTransform: 'none',
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

  return pug`
    Title(
      Icon=ReorderIcon
      Text='Infomation'
    )
    Paper(
      elevation=1
      className=classes.main
    )
      Paper(
        elevation=0
        className=classes.paper
      )
        Tabs(
          value=value
          onChange=handleChange
        )
          Tab(
            icon=${pug`DnsIcon`}
            label='Block Producers'
            disableFocusRipple
            classes={
              selected:classes.tab,
              wrapper:classes.wrapper,
              root:classes.tabRoot
            }
          )
          Tab(
            icon=${pug`AllInclusiveIcon`}
            label='Latest Transactions'
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
