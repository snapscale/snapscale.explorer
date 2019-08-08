import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  header: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: 100,
  },
  input: {
    fontSize: '7rem',
    padding: '2rem 4rem',
    backgroundColor: theme.palette.grey[200],
    borderRadius: 4,
    lineHeight: 1.6,
  },
  icon: {
    fontSize: '10rem',
    height: '100%',
    top: 0,
  },
  logo: {
    paddingLeft: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  li: {
    fontSize: '7rem',
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
        className=classes.header
      )
        Grid(item)
          Grid(
            container
            direction='column'
            justify='center'
          )
            Grid(item)
              a(href='/')
                img(
                  src='/src/images/logo-title.svg'
                  className=classes.logo
                )
        Hidden(xsDown)
          Grid(item)
            FormControl(className=classes.formControl)
              Select(
                value=props.state.lang
                onChange=props.setLang
                input=${pug`
                  Input(
                    disableUnderline
                    classes={input:classes.input}
                  )
                `}
                classes={icon:classes.icon}
                MenuProps={
                  elevation:2
                }
              )
                each val, index in Object.keys(_x.config.langs)
                  MenuItem(
                    value=val
                    classes={root:classes.li}
                  )
                    ${_x.config.langs[val]}
            FormControl(className=classes.formControl)
              Select(
                value=props.state.net
                onChange=props.setNet
                input=${pug`
                  Input(
                    disableUnderline
                    classes={input:classes.input}
                  )
                `}
                classes={icon:classes.icon}
                MenuProps={
                  elevation:2
                }
              )
                each val, index in Object.keys(_x.config.nets)
                  MenuItem(
                    value=val
                    classes={root:classes.li}
                  )
                    ${_x.config.nets[val]}
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