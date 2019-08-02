import React from 'react';
import Container from '@material-ui/core/Container';
import Basic from '../../templates/basic/basic.jsx';

import Search from '../../components/search/search.jsx';
import AccountDetails from '../../components/accountDetails/accountDetails.jsx';

const AccountMain = (props) => {
  return pug`
    Search(value=props.account)
    AccountDetails(...props)
  `;
};

class Account extends React.Component {
  render() {
    const account = location.pathname.split('/')[2];
    return pug`
      Basic
        Container(fixed)
          AccountMain(account=account)
    `;
  }
}

export default Account;
