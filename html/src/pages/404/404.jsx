import React from 'react';
import Basic from '../../templates/basic/basic.jsx';

class E404 extends React.Component {
  render() {
    const { pathname } = window.location;
    return pug`
      Basic
        p.greeting 404!
        |path => #{pathname} 
    `;
  }
}

export default E404;
