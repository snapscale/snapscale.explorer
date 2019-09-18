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
import Loading from '../loading/loading.jsx';

const Actions = loadable(() => import('./actions.jsx'));
const Tables = loadable(() => import('./tables.jsx'));
const Abi = loadable(() => import('./abi.jsx'));

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

const ContractInfo = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  const arr = window.location.pathname.split('/');
  const account = arr[arr.length - 1];

  const [len, setLen] = React.useState(0);

  _x.utils.request('actions', JSON.stringify({
    account_name: account,
    pos: -1,
    offset: -1,
  }), (data) => {
    try {
      const xdt = JSON.parse(data);

      if (xdt.actions.length) {
        if (xdt.actions[0].account_action_seq !== len) {
          setLen(xdt.actions[0].account_action_seq);
        }
      }
    } catch (e) {
      console.log(data);
    }
  });

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
            label=langMap[0xB000]
            disableFocusRipple
            classes={
              selected:classes.tab,
              wrapper:classes.wrapper,
              root:classes.tabRoot
            }
          )
          Tab(
            label=langMap[0xB001]
            disableFocusRipple
            classes={
              selected:classes.tab,
              wrapper:classes.wrapper,
              root:classes.tabRoot
            }
          )
          Tab(
            label=langMap[0xB002]
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
        if props.values.ld
          Loading
        else
          if value === 0
            Actions(
              actions=props.values.abi.actions
              len=len
            )
          if value === 1
            Tables(tables=props.values.abi.tables)
          if value === 2
            Abi(json=props.values.abi)
  `;
};

export default ContractInfo;
