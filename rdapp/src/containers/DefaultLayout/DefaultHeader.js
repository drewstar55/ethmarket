import React, { Component } from 'react';
import { Nav, Tooltip, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          className="d-sm-down-none"
          full={{ src: 'assets/img/Logo.png', width: 89, height: 25 }}
          minimized={{ src: 'assets/img/Logo.png', width: 30, height: 30 }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <div>Balance: <span style={{ "color": "#4dbd74" }} className="font-weight-bold font-lg">{` ${parseInt(this.props.loginDetails.balance).toFixed(2)} `}</span><span className="font-weight-bold mr-2">Ether</span></div>
          <div href="#" id="usernametooltip" className="mr-3 ml-1 bg-grey" style={{ "width": "42px", "height": "42px", "borderRadius": "21px" }}></div>
          <Tooltip placement="bottom" className="bg-white" isOpen={this.state.tooltipOpen} autohide={true} target="usernametooltip" toggle={this.toggle}>
            {this.props.loginDetails.username ? this.props.loginDetails.username : "Profile"}
          </Tooltip>
          <NavLink to='/login' className="nav-link mr-4"><Button onClick={this.props.handleStoreInfo} className="bg-mystoreBg">Logout</Button></NavLink>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
const mapStateToProps = (state) => {
  return {
    loginDetails: state.login.loginDetails
  }
};

export default connect(mapStateToProps)(DefaultHeader);
