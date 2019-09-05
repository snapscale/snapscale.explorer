import React from 'react';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import Basic from '../../templates/basic/basic.jsx';
import Search from '../../components/search/search.jsx';
import Charts from '../../components/charts/charts.jsx';
import LiveStatus from '../../components/liveStatus/liveStatus.jsx';
import ListViewer from '../../components/listViewer/listViewer.jsx';

const IndexMain = (props) => {
  const [values, setValues] = React.useState({
    x: false,
    ld: true,
  });

  if (!values.x) {
    _x.utils.request('charts', null, (data) => {
      try {
        setValues({ ...JSON.parse(data), ld: false, x: true });
      } catch (e) {
        setValues({ ld: false, x: true });
      }
    });
  }

  return pug`
    Search
    LiveStatus
    Hidden(smDown)
      Charts(values=values)
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
