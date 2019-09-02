import React from 'react';
import Container from '@material-ui/core/Container';
import Basic from '../../templates/basic/basic.jsx';

import Search from '../../components/search/search.jsx';
import AccountDetails from '../../components/accountDetails/accountDetails.jsx';
import Actions from '../../components/actions/actions2.jsx';
import Keys from '../../components/keys/keys.jsx';
import NotFound from '../../components/notFound/notFound.jsx';

const AccountMain = (props) => {
  const [values, setValues] = React.useState({
    notfound: false,
    ld: true,
  });

  if (!values.info && !values.notfound) {
    _x.utils.request('account', JSON.stringify({
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
      NotFound(keyx='Account')
    else
      AccountDetails(values=values)
      Keys(values=values)
      Actions(values=values)
  `;
};

class Account extends React.Component {
  render() {
    const account = window.location.pathname.split('/')[2];
    return pug`
      Basic
        Container(fixed)
          AccountMain(account=account)
    `;
  }
}

export default Account;
