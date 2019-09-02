import React from 'react';
import Container from '@material-ui/core/Container';
import Basic from '../../templates/basic/basic.jsx';

import Search from '../../components/search/search.jsx';
import BlockDetails from '../../components/blockDetails/blockDetails.jsx';
import Transactions from '../../components/transactions/transactions.jsx';
import Keys from '../../components/keys/keys.jsx';
import NotFound from '../../components/notFound/notFound.jsx';

const BlockMain = (props) => {
  const [values, setValues] = React.useState({
    notfound: false,
    ld: true,
  });

  if (values.block_num !== props.num && !values.notfound) {
    _x.utils.request('block', JSON.stringify({
      num: props.num,
    }), (data) => {
      try {
        setValues({ ...JSON.parse(data), ld: false });
      } catch (e) {
        setValues({ ld: false, notfound: true });
      }
    });
  }

  return pug`
    Search(value=props.num)
    if values.notfound
      NotFound(keyx='Block')
    else
      BlockDetails(values=values)
      Transactions(values=values)
  `;
};

class Block extends React.Component {
  render() {
    const num = parseInt(window.location.pathname.split('/')[2], 10);
    return pug`
      Basic
        Container(fixed)
          BlockMain(num=num)
    `;
  }
}

export default Block;
