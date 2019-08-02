import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  paper: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing(2),
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
    '& :first-child': {
      marginBottom: '0 !important',
      marginRight: 6,
    },
  },
}));

const ListViewer = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const [rows, setRows] = React.useState([]);

  if (!_x.utils.handles.dashboard.list.produces) {
    _x.utils.handles.dashboard.list.produces = (data) => {
      setRows(data.producers);
    };
  }

  return pug`
    Title(
      Icon=ReorderIcon
      Text='Infomation'
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
          label='BLOCK PRODUCERS'
          disableFocusRipple
          classes={
            selected:classes.tab,
            wrapper:classes.wrapper
          }
        )
        Tab(
          icon=${pug`AllInclusiveIcon`}
          label='LATEST TRANSACTIONS'
          disableFocusRipple
          classes={
            selected:classes.tab,
            wrapper:classes.wrapper
          }
        )
    Paper(
      elevation=0
      className=classes.paper2
    )
      if value === 0
        Producers(rows=rows)
      if value === 1
        Transactions
  `;
};

export default ListViewer;
