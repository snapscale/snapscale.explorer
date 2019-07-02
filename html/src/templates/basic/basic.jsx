import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import styles from './basic.scss';

import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';

class Basic extends React.Component {
  render() {
    const { children } = this.props;
    return pug`
      div(className=styles.container)
        Grid(
          container
          alignItem='center'
          justify='space-between'
          direction='column'
          className=styles.grid
        )
          Grid(
            item
          )
            Header
            = children
          Grid(item)
            Footer
    `;
  }
}

Basic.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Basic;
