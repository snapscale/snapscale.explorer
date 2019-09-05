import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import KovoBlock from '../kovoBlock/kovoBlock.jsx';

const useStyles = makeStyles(theme => ({
  input: {
    fontFamily: 'Nunito sans,Helvetica Neue,Helvetica,Arial,Hiragino Sans GB,Hiragino Sans GB W3,Microsoft YaHei UI,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;',
    fontSize: '1rem',
    fontWeight: 'normal',
    color: theme.palette.secondary.contrastText,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
    '&::placeholder': {
      color: 'rgba(51,51,51,0.4)',
      letterSpacing: '0.06rem',
    },
  },
  icon: {
    width: '1rem',
    height: '1rem',
  },
  frame: {
    marginTop: '0.4rem',
    marginBottom: '0.7rem',
  },
  underline: {
    '&:before': {
      borderBottom: '1px solid #D8D8D8',
    },
    '&:after': {
      borderBottom: '1px solid #382AC7',
    },
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#333333 !important',
    letterSpacing: '0.05rem',
  },
  positionStart: {
    color: `${theme.palette.secondary.contrastText} !important`,
    fontSize: '0.7rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
  formControl: {
    marginTop: `${theme.spacing(4)}px !important`,
    paddingBottom: `${theme.spacing(1)}px !important`,
    [theme.breakpoints.down('xs')]: {
      marginTop: '0 !important',
    },
  },
}));

const XTextField = (props) => {
  const classes = useStyles();
  const { value } = props;
  const [values, setValues] = React.useState(value);
  const langMap = _x.config.langsMap[_x.utils.langs.get()];

  const keydown = (e) => {
    if (e.key === 'Enter') {
      window.location.href = `/search/${e.target.value}`;
    }
  };

  const handleChange = (event) => {
    const { target } = event;
    if (!target.onkeydown) {
      target.onkeydown = keydown;
    }
    setValues(event.target.value);
  };

  return (
    <React.Fragment>
      <Hidden smUp>
        <TextField
          className={classes.frame}
          autoFocus
          fullWidth
          value={values}
          placeholder={langMap[0x1001]}
          margin="none"
          InputProps={{
            startAdornment: <InputAdornment disableTypography position="start" classes={{ positionStart: classes.positionStart }}><SearchIcon className={classes.icon} /></InputAdornment>,
            classes: {
              input: classes.input,
              underline: classes.underline,
              formControl: classes.formControl,
            },
          }}
          onChange={handleChange}
        />
      </Hidden>
      <Hidden xsDown>
        <TextField
          className={classes.frame}
          autoFocus
          fullWidth
          value={values}
          onChange={handleChange}
          label={langMap[0x1000]}
          placeholder={langMap[0x1002]}
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
            startAdornment: <InputAdornment disableTypography position="start" classes={{ positionStart: classes.positionStart }}><SearchIcon className={classes.icon} /></InputAdornment>,
            classes: {
              input: classes.input,
              underline: classes.underline,
              formControl: classes.formControl,
            },
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
    KovoBlock
      XTextField(...props)
  `;
};

export default Search;
