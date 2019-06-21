import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    width: 120,
  },
  input: {
    lineHeight: '100%',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 14,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

class CustomizedSelect extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.state.selected = '';
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.handleChangeValue(value);
  }

  handleChangeValue(value) {
    this.setState({
      selected: value,
    });
    const { cb } = this.props;
    cb(value);
  }

  render() {
    const GenInput = () => (<BootstrapInput />);
    const InputElement = GenInput();
    const { options, defaultValue } = this.props;
    const nullOption = (Object.keys(options).length === 0);
    const { selected } = this.state;
    if (selected === '' && defaultValue) {
      this.setState({
        selected: defaultValue,
      });
    }
    const newArray = [];
    Object.keys(options).forEach((v) => {
      newArray.push({
        k: v,
        v: options[v],
      });
    });

    return pug`
      FormControl
        Select(
          value=selected
          input=InputElement
          onChange=this.handleChange
        )
          if nullOption
            MenuItem(value='')
              em
                |None
          else
            each item, index in newArray
              MenuItem(value=item.k)
                = item.v
    `;
  }
}

CustomizedSelect.propTypes = {
  options: PropTypes.shape({}),
  cb: PropTypes.func,
  defaultValue: PropTypes.string,
};

CustomizedSelect.defaultProps = {
  options: {},
  cb: () => {},
  defaultValue: null,
};

export default CustomizedSelect;
