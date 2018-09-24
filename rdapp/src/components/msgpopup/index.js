import React, { Component } from 'react';
import { connect } from 'react-redux';

class MsgPopUp extends Component {

    closePopUp = () => {
        setInterval(this.props.closePopUp, 3000);
    }

    render() {
        this.props.showPopUp ? this.closePopUp() : null;
        return this.props.showPopUp ?  <div><p>{this.props.msgInfo}</p></div> : null ;
    }
}

var mapStateToProps = (state) => {
    return {
        showPopUp: state.popUp.showPopUp,
        msgInfo: state.popUp.msg
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        closePopUp: () => { dispatch({ type: 'CLOSE_POP_UP' }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MsgPopUp);