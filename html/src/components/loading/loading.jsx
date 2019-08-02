import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './loading.scss';

const Loading = props => pug`
  Grid(
    container
    direction='row'
    justify='center'
    alignItems='center'
    className=styles.load
  )
    Grid(item)
      CircularProgress
`;

export default Loading;
