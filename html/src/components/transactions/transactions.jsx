import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';

import Title from '../title/title.jsx';
import Loading from '../loading/loading.jsx';
import KovoBlock from '../kovoBlock/kovoBlock.jsx';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 0,
    overflowX: 'auto',
  },
  link: {
    color: '#766AF2',
  },
}));

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

const Transactions = (props) => {
  const classes = useStyles();

  const { values } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  if (!values.ld) {
    const rows = values.transactions;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  return pug`
    Title(
      Icon='transaction'
      Text=langMap[0xF004]
    )
    KovoBlock(className=classes.paper)
      if values.ld
        Loading
      else
        Table
          TableHead
            TableRow
              TableCell
                =langMap[0x6000]
              TableCell
                =langMap[0x6001]
              TableCell
                =langMap[0x6002]
              TableCell
                =langMap[0x6003]
              TableCell
                =langMap[0x6004]
          TableBody
            each item, index in rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              TableRow
                TableCell
                  a(
                    href='/transaction/'+item.trx.id
                    className=classes.link
                  )
                    =item.trx.id.substr(30)+'...'
                TableCell
                  =item.trx.transaction.actions.length
                TableCell
                  if item.cpu_usage_u > (1000*1000)
                    =Math.floor(item.cpu_usage_u / 1000 / 1000)
                    |&nbsp;
                    |s
                  if item.cpu_usage_u > 1000
                    =Math.floor((item.cpu_usage_u%(1000*1000)) / 1000)
                    |&nbsp;
                    |ms
                  =item.cpu_usage_us%1000
                  |&nbsp;
                  |µs
                TableCell
                  =item.net_usage_words
                  |&nbsp;
                  |B
                TableCell
                  =item.trx.transaction.expiration.replace('T',' ')
          TableFooter
            TableRow
              TablePagination(
                rowsPerPageOptions=[25, 50]
                colSpan=6
                count=rows.length
                rowsPerPage=rowsPerPage
                page=page
                SelectProps={
                  inputProps: { 'aria-label': 'Rows per page' },
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

export default Transactions;
