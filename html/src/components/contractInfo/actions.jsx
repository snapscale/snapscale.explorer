import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
  pagination: {
    border: 0,
  },
}));

const useStyles = makeStyles(theme => ({
  btnContainer: {
    padding: '20px 60px',
  },
  titleContainer: {
    padding: '20px 60px 0 60px',
  },
  btn: {
    margin: '0 8px 8px 0',
    fontSize: '.7rem',
  },
  btnHover: {
    margin: '0 8px 8px 0',
    fontSize: '.7rem',
    boxShadow: 'none',
    color: '#FFFFFF',
  },
  link: {
    color: '#382AC7',
    fontWeight: 300,
  },
  tableSm: {
    height: '60px',
  },
  memo: {
    fontWeight: 300,
    color: '#999',
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const {
    count, page, rowsPerPage, onChangePage,
  } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const arr = window.location.pathname.split('/');
const account = arr[arr.length - 1];

const Actions = (props) => {
  const classes = useStyles();

  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  const [values, setValues] = React.useState({});

  const clickHandle = (x) => {
    const mid = x;
    return () => {
      const z = {
        ...values,
      };
      z[mid] = true;

      setValues(z);
    };
  };

  const clickHandle2 = (x) => {
    const mid = x;
    return () => {
      const z = {
        ...values,
      };
      z[mid] = false;

      setValues(z);
    };
  };

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function load(p, rp) {
    const pos = (p === 0) ? -1 : props.len - ((p + 1) * rp);
    const offset = (p === 0) ? -rp : 1 - rp;
    _x.utils.request('actions', JSON.stringify({
      account_name: account,
      pos,
      offset,
    }), (data) => {
      try {
        const xdt = JSON.parse(data);
        setRows(xdt.actions);
      } catch (e) {
        console.log(data);
      }
    });
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
    load(newPage, rowsPerPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    load(page, parseInt(event.target.value, 10));
  }

  if (props.len > 0 && rows.length === 0) {
    load(page, rowsPerPage);
  }

  return pug`
    Grid(container)
      Grid(
        item
        xs=12
      )
        div(className=classes.titleContainer)
          Typography(
            variant='h4'
            display='inline'
          )
            =langMap[0xB101]
        div(className=classes.btnContainer)
          each item, index in props.actions
            if values[item.name]
              Button(
                variant="contained"
                classes={
                  root:classes.btnHover
                }
                color="secondary"
                onClick=clickHandle2(item.name)
              )
                =item.name
            else
              Button(
                variant="outlined"
                classes={
                  root:classes.btn
                }
                color="secondary"
                onClick=clickHandle(item.name)
              )
                =item.name
      Grid(
        item
        xs=12
      )
        Divider
      Grid(
        item
        xs=12
      )
        Table
          TableBody
            each item, index in rows
              TableRow(className=classes.tableSm)
                TableCell
                  =item.action_trace.act.name
                TableCell
                  a(
                    href='/transaction/'+item.action_trace.trx_id
                    className=classes.link
                  )
                    |Tx:
                    =item.action_trace.trx_id.substr(0,6)
                TableCell
                  =new Date(item.block_time).toString().split(' ').slice(1,4).join('-') + " " + new Date(item.block_time).toString().split(' ')[4]
                TableCell
                  Grid(container)
                    Grid(
                      item
                      xs=12
                    )
                      a(
                        href='/account/'+item.action_trace.act.data.from
                        className=classes.link
                      )
                        =item.action_trace.act.data.from
                      |&nbsp;→&nbsp;
                      a(
                        href='/account/'+item.action_trace.act.data.to
                        className=classes.link
                      )
                        =item.action_trace.act.data.to
                      |&nbsp;&nbsp;
                      =item.action_trace.act.data.quantity
                    Grid(
                      item
                      xs=12
                    )
                      span(className=classes.memo)
                        |memo:&nbsp;&nbsp;
                        =item.action_trace.act.data.memo
          TableFooter
            TableRow
              TablePagination(
                rowsPerPageOptions=[25, 50]
                colSpan=5
                count=props.len
                rowsPerPage=rowsPerPage
                page=page
                SelectProps={
                  native: true,
                }
                onChangePage=handleChangePage
                onChangeRowsPerPage=handleChangeRowsPerPage
                ActionsComponent=TablePaginationActions
                classes={
                  root:classes.pagination
                }
              )
  `;
};

export default Actions;
