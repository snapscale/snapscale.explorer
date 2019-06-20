import React from 'react';
import Container from '@material-ui/core/Container';

class E404 extends React.Component {
  render() {
    const path = window.location.pathname;
    const { width } = window._x;
    return pug`
      Container(maxWidth=width)
        p.greeting 404!
        |path => #{path} 
    `;
  }
}

export default E404;
