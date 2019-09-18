import React from 'react';
import Container from '@material-ui/core/Container';
import Basic from '../../templates/basic/basic.jsx';

import Search from '../../components/search/search.jsx';
import ContractDetails from '../../components/contractDetails/contractDetails.jsx';
import ContractInfo from '../../components/contractInfo/contractInfo.jsx';
import NotFound from '../../components/notFound/notFound.jsx';

const AccountMain = (props) => {
  const [values, setValues] = React.useState({
    notfound: false,
    ld: true,
  });

  if (!values.account_name && !values.notfound) {
    _x.utils.request('abi', JSON.stringify({
      name: props.account,
    }), (data) => {
      try {
        setValues({ ...JSON.parse(data), ld: false });
      } catch (e) {
        setValues({ ld: false, notfound: true });
      }
    });
  }

  return pug`
    Search(value=props.account)
    if values.notfound
      NotFound(keyx='Contract')
    else
      ContractDetails
      ContractInfo(values=values)
  `;
};

class Contract extends React.Component {
  render() {
    const account = window.location.pathname.split('/')[2];
    return pug`
      Basic
        Container(fixed)
          AccountMain(account=account)
    `;
  }
}

export default Contract;
