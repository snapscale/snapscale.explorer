import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(0, 0, 2, 0),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    backgroundColor: theme.palette.grey[200],
  },
  input: {
    padding: theme.spacing(0),
    fontSize: '1.5rem',
    color: theme.palette.secondary.contrastText,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  label: {
    fontSize: '1.2rem',
    color: `${theme.palette.secondary.contrastText} !important`,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  positionStart: {
    color: `${theme.palette.secondary.contrastText} !important`,
    fontSize: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  formControl: {
    marginTop: `${theme.spacing(4)}px !important`,
    [theme.breakpoints.down('xs')]: {
      marginTop: '0 !important',
    },
  },
}));

const XTextField = (props) => {
  const classes = useStyles();
  const { value } = props;
  const [values, setValues] = React.useState(value);

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  return (
    <React.Fragment>
      <Hidden smUp>
        <TextField
          autoFocus
          fullWidth
          value={values}
          placeholder="Enter name, key, tx or block"
          margin="none"
          InputProps={{
            startAdornment: <InputAdornment disableTypography position="start" classes={{ positionStart: classes.positionStart }}>&gt;</InputAdornment>,
            classes: {
              input: classes.input,
              formControl: classes.formControl,
            },
            disableUnderline: true,
          }}
          onChange={handleChange}
        />
      </Hidden>
      <Hidden xsDown>
        <TextField
          autoFocus
          fullWidth
          value={values}
          onChange={handleChange}
          label="Search Accounts, Keys, Transactions, Blocks"
          placeholder="Enter account name, key, tx hash or block number"
          margin="none"
          InputLabelProps={{
            focused: true,
            shrink: true,
            classes: {
              root: classes.label,
              focused: classes.label,
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment disableTypography position="start" classes={{ positionStart: classes.positionStart }}>&gt;</InputAdornment>,
            classes: {
              input: classes.input,
              formControl: classes.formControl,
            },
            disableUnderline: true,
          }}
        />
      </Hidden>
    </React.Fragment>
  );
};

XTextField.propTypes = {
  value: PropTypes.string,
};

XTextField.defaultProps = {
  value: '',
};

const Search = (props) => {
  const classes = useStyles();
  return pug`
    Paper(
      elevation=0
      className=classes.paper
    )
      XTextField(...props)
  `;
};

export default Search;
