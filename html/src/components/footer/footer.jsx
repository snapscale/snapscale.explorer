import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import styles from './footer.scss';

class Footer extends React.Component {
  render() {
    return pug`
      footer
        Container(fixed)
          Grid(
            container
            direction='row'
            justify='space-between'
            alignItems='center'
            className=styles.footer
          )
            Grid(item)
              |© 2019 Xeniro
    `;
  }
}

export default Footer;
