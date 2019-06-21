import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import loadable from '@loadable/component';

const Header = loadable(() => import('../../components/header/header.jsx'));

class Basic extends React.Component {
  render() {
    const { width } = _x;
    const { children } = this.props;
    return pug`
      Container(maxWidth=width)
        Header
        = children
    `;
  }
}

Basic.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Basic;
