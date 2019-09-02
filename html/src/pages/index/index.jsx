import React from 'react';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import Basic from '../../templates/basic/basic.jsx';
import Search from '../../components/search/search.jsx';
import Charts from '../../components/charts/charts.jsx';
import LiveStatus from '../../components/liveStatus/liveStatus.jsx';
import ListViewer from '../../components/listViewer/listViewer.jsx';

const IndexMain = (props) => {
  return pug`
    Search
    LiveStatus
    Hidden(smDown)
      Charts
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
