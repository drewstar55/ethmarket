import React, { Component } from 'react';

import InputField from './inputfield';
import OptionField from './optionfield';
import SelectionField from './selectionfields';
import FileField from './filefield';
class InputFields extends Component{
		getValue(){
    		return this.field.getValue();
		}
		getField(input){
			let inputfield = null;
			switch(input.type){
				case "file" : inputfield = (<FileField ref={(ref) => this.field = ref } {...input} />); 
						break;
				case "select": inputfield = (<OptionField ref={(ref) => this.field = ref } {...input} /> );
						break;
				case "checkbox": inputfield = (<SelectionField ref={(ref) => this.field = ref } {...input} />);
						break;
				default : inputfield = (<InputField ref={(ref) => this.field = ref } {...input} />);
			}
			return inputfield;
		}

		render(){
			return this.getField(this.props);
		}

}

export default InputFields;