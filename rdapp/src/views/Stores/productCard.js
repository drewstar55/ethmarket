import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prodQty: 1,
            showConfirmMsg: false,
            balanceError: false
        }
    }
    handleProdQty = (value) => {
        if (value > -1)
            this.setState({ prodQty: value });
    };

    handleConfirmMsg = () => {
        this.setState({
            showConfirmMsg: !this.state.showConfirmMsg,
            balanceError: false
        });
    };

    handlePurchase = (item) => {
        let quantity = this.refs[item[0]].value;
        if (this.props.userBalance >= (item[2] * quantity)) {
            this.props.buyProduct({
                selectedStore: this.props.selectedStoreId,
                productId: item[5],
                quantity
            });
            this.handleConfirmMsg();
        } else {
            this.setState({ balanceError: true })
        }
    };

    render() {

        let item = this.props.item;
        return (<Col xs="12" sm="6" md="4">
            <Card className="b-a-2" >
                <CardBody className="p-2 m-1">
                    <Row>
                        <Col className="justify-content-center align-items-center d-flex">
                            <i className="material-icons md-48">ac_unit</i>
                        </Col>
                        <Col xs="9" sm="9" md="9">
                            <span className="font-lg mt-1 mb-1 text-value ">{item[0]}</span>
                            <div className="mt-1 mb-1 font-sm">
                                {item[1]}
                            </div>
                            <div className="mt-1 mb-1"><span>Price - </span><span className="text-value font-lg">{`${item[2]} `}</span>Ethers</div>
                            <div className="mt-1 mb-1"><span className="text-value font-sm">{`Avail Qty: ${item[3]}`}</span></div>

                            {this.state.showConfirmMsg ? (<Modal backdrop={false} centered size="md" isOpen={this.state.showConfirmMsg} toggle={this.handleConfirmMsg}>
                                <ModalHeader className="justify-content-center" toggle={this.toggle}>{this.state.balanceError ? <p className="text-danger font-weight-bold font-lg">Insufficient Balance</p> : "Confirm Purchase"}</ModalHeader>
                                <ModalBody>
                                    <CardBody className="">
                                        <Row>
                                            <Col>Product Name</Col>:
                                <Col><span className="ml-1 font-weight-bold">{item[0]}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col>Quantity</Col>:
                                <Col><span className="ml-1 font-weight-bold">{this.refs[item[0]].value}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col>Unit Price</Col>:
                                <Col><span className="ml-1 font-weight-bold">{`${item[2]} eth`}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col>Total Price</Col>:
                                <Col><span className="ml-1 font-weight-bold">{`${this.refs[item[0]].value} * ${item[2]} = ${this.refs[item[0]].value * item[2]} eth`}</span></Col>
                                        </Row>
                                    </CardBody>
                                </ModalBody>
                                <ModalFooter className="justify-content-center">
                                    <Button className="ml-2 mr-2" color="danger" onClick={this.handleConfirmMsg}>Cancel</Button>
                                    <Button
                                        className="ml-2 mr-2 bg-lightgreen"
                                        onClick={() => {
                                            this.handlePurchase(item);
                                        }}>Confirm</Button>
                                </ModalFooter>
                            </Modal>) : null}
                        </Col>
                    </Row>
                    <div className="d-flex mt-3 pt-3 justify-content-center b-t-1">
                        <div className="font-weight-bold mt-2 font-sm">Qty</div>
                        <input ref={item[0]} onChange={(e) => { this.handleProdQty(e.target.value) }} className="ml-2 mr-2 pl-3" step="1" min="0" style={{ "width": "60px" }} value={this.state.prodQty} type="number" />
                        <Button
                            disabled={(this.state.prodQty > item[3]) || this.state.prodQty < 1}
                            onClick={() => { this.handleConfirmMsg() }}
                            className="bg-lightgreen">Buy</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>);
    }
}

export default ProductCard;