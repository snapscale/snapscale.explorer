import React from 'react';
import Container from '@material-ui/core/Container';
import Basic from '../../templates/basic/basic.jsx';

import Search from '../../components/search/search.jsx';
import AccountDetails from '../../components/accountDetails/accountDetails.jsx';
import Keys from '../../components/keys/keys.jsx';

const AccountMain = (props) => {
  const [values, setValues] = React.useState({
    ld: true,
  });

  if (values.account_name !== props.account) {
    _x.utils.request('account', JSON.stringify({
      name: props.account,
    }), (data) => {
      console.log(JSON.parse(data));
      setValues({ ...JSON.parse(data), ld: false });
    });
  }

  return pug`
    Search(value=props.account)
    AccountDetails(values=values)
    Keys(values=values)
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
