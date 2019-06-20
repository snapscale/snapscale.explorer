import React from 'react';
import PropTypes from 'prop-types';

class Basic extends React.Component {
  render() {
    const path = window.location.pathname;
    const { width } = window._x;
    const { children } = this.props;
    return pug`
      Container(maxWidth=width)
        p.greeting 404!
        |path => #{path}
    `;
  }
}

Basic.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Basic;
