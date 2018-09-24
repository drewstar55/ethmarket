import React, { Component } from 'react';
import { Input, FormGroup, Label, Col } from 'reactstrap';

class OptionField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      value: false
    }
    this.getValue = this.getValue.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }
  componentDidMount() {
    let selected = -1, value = false;
    this.props.inputOptions.map((item, index) => {
      if (item.value === this.props.inputValue) {
        selected = index;
        value = item.value;
      }
      return index;
    });
    this.setState({ selected, value });
  }
  getValue() {
    return (this.state.selected > -1) ? this.state.value : false;
  }

  selectOption(index) {
    let option = this.props.inputOptions[index].value, indx;
    if (this.state.selected === index) {
      indx = -1;
      option = false;
    } else { indx = index; }
    this.setState({
      selected: indx,
      value: option
    });
  }

  renderOptions() {

    return this.props.inputOptions.map((option, index) => {
      return (<FormGroup key={index} check className="checkbox" >
        <Input checked={this.state.selected === index} onClick={this.selectOption.bind(this, index)} name={this.props.name} className={`form-check-input ${this.props.className}`} type={this.props.type} value={option.value} />
        <Label check className="form-check-label">{option.name}</Label>
      </FormGroup>);
    });
  }

  render() {
    let { name, labelClassName } = this.props;
    return (
      <FormGroup row>
        <Col md="12" className="p-0"><strong><Label className={labelClassName} >{name}</Label></strong></Col>
        <Col md="12" className="p-0">{this.renderOptions()}</Col>
      </FormGroup>
    );
  }
}

export default OptionField;
