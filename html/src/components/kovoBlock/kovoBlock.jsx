import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 20px 0 rgba(80,80,80,0.13)',
    borderRadius: '0.5rem',
    padding: '20px 60px',
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      padding: '15px 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 20px',
    },
  },
}));

const KovoBlock = (props) => {
  const classes = useStyles();
  const { children } = props;

  return pug`
    Paper(
      elevation=0
      className=clsx(classes.paper, props.className)
    )
      = children
  `;
};

KovoBlock.propTypes = {
  children: PropTypes.element.isRequired,
};

export default KovoBlock;
