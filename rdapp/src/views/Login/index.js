import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUserRequest } from '../../actions/login';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }
  handleUserName(e) {
    this.setState({ username: e.target.value });
  }
  render() {
    return (
      <div className="app flex-row align-items-center bg-img">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" sm="10" md="6">
                <Card className="p-4 text-center">
                  <CardBody>
                    <h1>Login</h1>
                    {(this.props.loginMsg || this.props.error) ? <h5 className="text-danger">Enter Valid Ether Address</h5> : null}
                    <InputGroup className="mb-3 mt-5">
                      <Input style={{"height": '50px'}} type="text" placeholder="Enter your ethereum Address" ref="username" onChange={(e) => { this.handleUserName(e) }} />
                    </InputGroup>
                    <Button disabled={!this.state.username} onClick={() => { this.props.loginUser(this.state.username,this.props.history.push) }} color="success" className="px-4 mt-3"><span className="font-lg font-weight-bold">Login</span></Button>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username,push) => dispatch(loginUserRequest(username,push))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
