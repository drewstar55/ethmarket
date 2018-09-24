import React, { Component } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';

class OptionField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      value: props.value
    }
    this.getValue = this.getValue.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  getValue() {
    return (this.state.selected > -1) ? this.state.value : undefined;

  }

  selectOption(index) {
    let option = this.props.inputOptions[index];
    this.setState({
      selected: index,
      value: option
    });
  }

  renderOptions() {
    let options = this.props && this.props.inputOptions;
    if (options) {
      return this.props.inputOptions.map((option, index) => {
        // let name = option;
        // let selected = false;
        // let disabled = false;

        // console.log(this.props);
        // if(this.props.value[this.props.name] == name){
        //   selected = true;
        // }
        return <option onClick={this.selectOption.bind(this, index)} key={index}>{option}</option>
      });
    }
    return <option>{null}</option>;
  }

  render() {
    let { name, type, inputValue, className, labelClassName } = this.props;
    inputValue = inputValue || '';
    return (
      <FormGroup row>
        <strong><Label className={labelClassName} >{name}</Label></strong>
        <Input type={type} className={className} bsSize="lg" defaultValue={inputValue} >{this.renderOptions()}</Input>
      </FormGroup>
    );
  }
}

export default OptionField;
