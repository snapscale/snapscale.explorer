import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';

import './header.scss';

const CustomizedSelect = loadable(() => import('../components/select/customizedSelect.jsx'));

const setLang = (lang) => {
  const { utils } = _x;
  utils.langs.set(lang);
};

const setNet = (lang) => {
  const { utils } = _x;
  utils.nets.set(lang);
};

class Header extends React.Component {
  render() {
    const { width, config, utils } = _x;
    const defaultLang = utils.langs.get();
    const defaultNet = utils.nets.get();

    return pug`
      Grid.header(
        container
        direction="column"
        justify="center"
        alignItems="center"
      )
        Grid.main.block(
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        )
          Grid.logo(item)
            Grid(
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            )
              Typography(variant="h6")
                |SnapScale Explorer
          .navs
            Grid.navs(
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            )
              Grid.selects(item)
                CustomizedSelect(
                  options=config.langs
                  defaultValue=defaultLang
                  cb=setLang
                )
                CustomizedSelect(
                  options=config.nets
                  defaultValue=defaultNet
                  cb=setNet
                )
        Grid.search.block(
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        )
          Grid(item)
            |Search
    `;
  }
}

export default Header;
