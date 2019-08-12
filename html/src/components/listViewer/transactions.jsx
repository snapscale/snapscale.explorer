import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
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
  tableSm: {
    width: '50rem',
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
  const { rows } = props;
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  return pug`
    Table
      TableHead
        TableRow
          TableCell(className=classes.tableSm)
            |Block Height
          TableCell(className=classes.tableSm)
            |Transaction Id
          TableCell(className=classes.tableSm)
            |Account & contract
          TableCell(className=classes.tableSm)
            |Timestamp
          TableCell
            |Info
      TableBody
        each item, index in rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          TableRow
            TableCell
              =item.blockId
            TableCell
              |TX:
              =item.tx
            TableCell
              a(href='/account/' + item.account)
                =item.account
              |&nbsp;:&nbsp;
              =item.name
            TableCell
              =new Date(item.time).toLocaleTimeString()
            TableCell
              a(href='/account/' + item.from)
                =item.from
              |&nbsp;->&nbsp;
              a(href='/account/' + item.to)
                =item.to
              |&nbsp;&nbsp;
              =item.quantity
      TableFooter
        TableRow
          TablePagination(
            rowsPerPageOptions=[25, 50]
            colSpan=5
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
