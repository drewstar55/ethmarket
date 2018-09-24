import React, { Component } from 'react';
import { Row, Card, CardHeader, CardBody, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import FabButtons from '../../components/fabbuttons';
import AddProductForm from './AddProductForm';
import ProductCard from './productCard';

class StoreInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popUp: false,
            withDrawAmt: 0,
            showEditForm: false
        }
    }

    componentWillMount(){
        this.props.getProducts(this.props.selectedStore);
    }

    componentWillUnmount() {
        this.props.removeSelectedMyStore();
        this.props.removeSelectedStore();
    }

    handleFormOpen = () => {
        this.setState({ showEditForm: !this.state.showEditForm });
    }

    handlePopUp = () => {
        this.setState({ popUp: !this.state.popUp });
    }

    updateWithDrawAmt = (amount) => {
        if (amount > -1)
            this.setState({ withDrawAmt: amount });
    }

    renderStoreItems(itemsList) {
        return itemsList.map((item, index) => {
            return (
                <ProductCard key={index} item={item} />
            );
        });
    }

    render() {
        var item = this.props.item;
        return (
            <div className="container-fluid">
                <Card className="mb-0">
                    <CardHeader>
                        <Button onClick={this.props.handleStoreInfo} color="success">Back</Button>
                    </CardHeader>
                    {
                        this.state.showEditForm ?
                            <AddProductForm addProduct={this.props.addProduct}
                                selectedStore={this.props.selectedStore}
                                handleFormOpen={this.handleFormOpen} />
                            :
                            <CardBody>
                                <Row>
                                    <Col lg="8" md="8" sm="12" xs="12" ><div className="font-weight-bold mr-3 mb-1 mt-1 ml-3 pr-3">
                                        <span className="font-weight-normal">Store Id : </span>{item[4]}</div>
                                    </Col>
                                    <Col lg="4" md="4" sm="12" xs="12" ><div className="font-weight-bold mr-3 mb-1 mt-1 ml-3 pr-3">
                                        <span className="font-weight-normal">Store Name : </span>{item[1]}</div></Col>
                                </Row>
                                <Row>
                                    <Col lg="8" md="8" sm="12" xs="12" ><div className="font-weight-bold mr-3 mb-1 mt-1 ml-3 pr-3">
                                        <span className="font-weight-normal">Description :</span>{item[3]}</div></Col>
                                    <Col lg="4" md="4" sm="12" xs="12" ><div className="font-weight-bold mr-3 mb-1 mt-1 ml-3 pr-3">
                                        <span className="font-weight-normal">Balance :</span>{` ${item[5]} `}Ether</div></Col>
                                </Row>
                                <Row className="mt-3 pt-3 b-t-1">
                                    <Button onClick={this.handlePopUp} className="ml-3" color="success">Withdraw Fund</Button>
                                </Row>
                            </CardBody>}
                    {this.state.popUp ? (<Modal backdrop={false} centered size="md" isOpen={this.state.popUp} toggle={this.handlePopUp}>
                        <ModalHeader className="justify-content-center" toggle={this.toggle}>Enter amount to Withdraw</ModalHeader>
                        <ModalBody>
                            <Row className="justify-content-center">
                                <Input className="justify-content-center"
                                    style={{ "width": "180px" }}
                                    onChange={(e) => this.updateWithDrawAmt(e.target.value)}
                                    type="number"
                                    min="0"
                                    max={item[5]}
                                    value={this.state.withDrawAmt} />
                            </Row>
                        </ModalBody>
                        <ModalFooter className="justify-content-center">
                            <Button className="ml-2 mr-2" color="danger" onClick={this.handlePopUp}>Cancel</Button>
                            <Button
                                className="ml-2 mr-2" color="success"
                                disabled={(this.state.withDrawAmt > item[5]) || this.state.withDrawAmt <= 0}
                                onClick={() => {
                                    this.props.updateStoreBalance({
                                        balance: this.state.withDrawAmt,
                                        selectedStore: this.props.selectedStore
                                    }); this.handlePopUp()
                                }}>Withdraw</Button>
                        </ModalFooter>
                    </Modal>) : null}
                    {this.state.showEditForm ? null : <FabButtons handleClick={this.handleFormOpen} />}
                </Card>
                <div><p className="font-lg mt-3 mb-1 text-value ">Products List</p></div>
                {this.props.selectedStoreProducts.length > 0 ? <Row className="mt-3">{this.renderStoreItems(this.props.selectedStoreProducts)}</Row>
            : <p>No products</p>    
            }
            </div>
        );
    }

}

export default StoreInfo;