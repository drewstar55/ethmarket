import React from 'react';
import ReactDOM from 'react-dom';
import { Input, FormGroup, Label } from 'reactstrap';

class InputField extends React.Component{
  getValue(){
  	return ReactDOM.findDOMNode(this.refs.field).value;
  }

  render(){
	let { name, type, inputValue, className, labelClassName, placeholder, style } = this.props;
	inputValue = inputValue || '';
	let inputField = (<Input 
						placeholder={placeholder ? placeholder : null}
						className={className}
						onChange={(e) => this.props.onChange(e.target.value)}
						defaultValue={inputValue} 
						style={style ? style : null}
						ref="field"
						type={type} />);
	return (
	  <FormGroup>
	  	<strong><Label className={labelClassName}>{name}</Label></strong>
		  {inputField}
	  </FormGroup>
	);
  }
}

export default InputField;