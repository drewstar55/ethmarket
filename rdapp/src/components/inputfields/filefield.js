import React from 'react';
import ReactDOM from 'react-dom';
import { Input, FormGroup, Label, Col } from 'reactstrap';

class FileField extends React.Component{
  getValue(){
	return ReactDOM.findDOMNode(this.refs.field).querySelector('input').value;
  }

  render(){
	let { name, type, inputValue, className, labelClassName } = this.props;
	 
	inputValue = inputValue || '';
	let inputField = (
						<Input type={type}
						 className={className}
						 defaultValue={inputValue}
						 name="file-input"
						 ref="field" />
						 );
	return (
	  <FormGroup row>
            <Col md="3">
              <Label className={labelClassName} >{name}</Label>
            </Col>
            <Col xs="12" md="9">
                {inputField}
            </Col>
       </FormGroup>
	);
  }
}

export default FileField;