import React from 'react';
import Container from '@material-ui/core/Container';
import Basic from '../../templates/basic/basic.jsx';

import Search from '../../components/search/search.jsx';
import TransactionDetails from '../../components/transactionDetails/transactionDetails.jsx';
import Actions from '../../components/actions/actions.jsx';
import Keys from '../../components/keys/keys.jsx';
import NotFound from '../../components/notFound/notFound.jsx';

const TransactionMain = (props) => {
  const [values, setValues] = React.useState({
    notfound: false,
    ld: true,
  });

  if (!values.trace || (values.trace.id !== props.hash && !values.notfound)) {
    _x.utils.request('transaction', JSON.stringify({
      hash: props.hash,
    }), (data) => {
      try {
        setValues({ ...JSON.parse(data), ld: false });
      } catch (e) {
        setValues({ ld: false, notfound: true });
      }
    });
  }

  return pug`
    Search(value=props.hash)
    if values.notfound
      NotFound(keyx='Transaction')
    else
      TransactionDetails(values=values)
      Actions(values=values)
  `;
};

class Transaction extends React.Component {
  render() {
    const hash = window.location.pathname.split('/')[2];
    return pug`
      Basic
        Container(fixed)
          TransactionMain(hash=hash)
    `;
  }
}

export default Transaction;
