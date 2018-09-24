import React, { Component } from 'react';

class FabButtons extends Component{

	render(){
		return (
			<div onClick={this.props.handleClick} className="position-fixed align-middle justify-content-center align-items-center d-flex rounded-circle" style={{'right':'2%','bottom':'6%','height':'50px',"width":'50px','backgroundColor':"rgba(83, 221, 108, 1)", 'color':'white',"cursor": "pointer"}} >
				<i className="material-icons md-48">add</i>
			</div>
			);
	}

}

export default FabButtons;