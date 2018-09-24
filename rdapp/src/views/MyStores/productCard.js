import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

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
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>);
    }
}

export default ProductCard;