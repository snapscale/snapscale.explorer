import React from 'react';
import Basic from '../../templates/basic/basic.jsx';

class Index extends React.Component {
  render() {
    return pug`
      Basic
        | 123
    `;
  }
}

export default Index;
