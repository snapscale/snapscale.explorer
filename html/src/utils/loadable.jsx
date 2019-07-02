import React from 'react';
import loadable from '@loadable/component';

import Loading from '../components/loading/loading.jsx';

const Loadable = func => loadable(func, {
  fallback: Loading,
});

export default Loadable;
