import React from 'react';
import loadable from '@loadable/component';
import Basic from '../../templates/basic/basic.jsx';

// const LiveSummary = loadable(() => import('../../components/liveSummary/liveSummary.jsx'));

class Index extends React.Component {
  render() {
    return pug`
      Basic
        LiveSummary
    `;
  }
}

export default Index;
