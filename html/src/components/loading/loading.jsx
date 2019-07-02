import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loading extends React.Component {
  render() {
    return pug`
      Grid(
        container
        direction='row'
        justify='center'
        alignItems='center'
      )
        Grid(item)
          CircularProgress
    `;
  }
}

export default Loading;
