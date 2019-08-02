import React from 'react';
import Container from '@material-ui/core/Container';
import Basic from '../../templates/basic/basic.jsx';

import Search from '../../components/search/search.jsx';
import LiveStatus from '../../components/liveStatus/liveStatus.jsx';
import ListViewer from '../../components/listViewer/listViewer.jsx';

const IndexMain = (props) => {
  return pug`
    Search
    LiveStatus
    ListViewer
  `;
};

class Index extends React.Component {
  render() {
    return pug`
      Basic
        Container(fixed)
          IndexMain
    `;
  }
}

export default Index;
