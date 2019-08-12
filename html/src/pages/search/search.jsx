import React from 'react';
import Container from '@material-ui/core/Container';
import Basic from '../../templates/basic/basic.jsx';

import Search from '../../components/search/search.jsx';
import Keys from '../../components/keys/keys.jsx';
import NotFound from '../../components/notFound/notFound.jsx';

const SearchMain = (props) => {
  const [values, setValues] = React.useState({
    notfound: true,
    ld: false,
  });

  const { search } = props;
  if (parseInt(search, 10).toString() === search) {
    window.location.href = `/block/${search}`;
    return null;
  }

  if (search.length === 53 && (search.indexOf('EOS') === 0)) {
    window.location.href = `/account/${search}`;
    return null;
  }

  if (search.length === 64) {
    window.location.href = `/transaction/${search}`;
    return null;
  }

  if (search.length < 13) {
    window.location.href = `/account/${search}`;
    return null;
  }

  return pug`
    Search(value=search)
    if values.notfound
      NotFound(keyx='String')
  `;
};

class SearchX extends React.Component {
  render() {
    const search = window.location.pathname.split('/')[2];
    return pug`
      Basic
        Container(fixed)
          SearchMain(search=search)
    `;
  }
}

export default SearchX;
