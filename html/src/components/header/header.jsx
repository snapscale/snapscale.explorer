import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

import styles from './header.scss';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  input: {
    height: '20px',
    lineHeight: '20px',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 12,
    padding: '6px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const HeaderMain = (props) => {
  const classes = useStyles();
  return pug`
    Container(fixed)
      Grid(
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className=styles.header
      )
        Grid(item)
          img(src='/src/images/logo-title.svg')
        Grid(item)
          FormControl
            Select(
              value=props.state.lang
              onChange=props.setLang
              input=${pug`
                InputBase(classes={input:classes.input})
              `}
              className=classes.formControl
            )
              MenuItem(value='cn')
                |CN
              MenuItem(value='en')
                |EN
          FormControl
            Select(
              value=props.state.net
              onChange=props.setNet
              input=${pug`
                InputBase(classes={input:classes.input})
              `}
              className=classes.formControl
            )
              MenuItem(value='main')
                |Main
              MenuItem(value='test')
                |Test
  `;
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: _x.utils.langs.get(),
      net: _x.utils.nets.get(),
    };
    this.setLang = this.setLang.bind(this);
    this.setNet = this.setNet.bind(this);
  }

  setLang = (e) => {
    const { value } = e.target;
    _x.utils.langs.set(value);
    this.setState({
      lang: value,
    });
  };

  setNet = (e) => {
    const { value } = e.target;
    _x.utils.nets.set(value);
    this.setState({
      net: value,
    });
  };

  render() {
    return pug`
      header
        HeaderMain(
          state=this.state
          setLang=this.setLang
          setNet=this.setNet
        )
    `;
  }
}

export default Header;
