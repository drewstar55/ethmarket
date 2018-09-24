import React, { Component } from 'react';
import { Row, Col, Card } from 'reactstrap';
import EditMyStoreForm from './EditMyStoreForm';
import FabButtons from '../../components/fabbuttons';
import {
    saveMyStore,
    getSelectedStoreDetails,
    updateStoreBalance,
    addProduct,
    getMyStoreData,
    removeSelectedMyStore,
    removeMyStores
} from '../../actions/mystores';

import {
    getProducts,
    removeSelectedStore
} from '../../actions/stores';

import { connect } from 'react-redux';
import StoreInfo from './storeinfo';

class MyStores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            showStoreInfo: false,
            selectedStore: null
        };
        this.handleFormOpen = this.handleFormOpen.bind(this);

    }

    componentWillMount() {
        this.props.getMyStoreData();
    }

    componentWillUnmount() {
        this.props.removeMyStores();
    }

    handleStoreInfo = (index) => {
        if (index > -1) {
            this.props.getSelectedStoreDetails(this.props.myStoresList[index][4])
        };
        this.setState({ showStoreInfo: !this.state.showStoreInfo, selectedStore: index });
    };

    handleFormOpen() {
        this.setState({ formOpen: !this.state.formOpen });
    };

    renderStores() {
        return this.props.myStoresList.map((item, index) => {
            return (<Col key={index} lg="3" md="3" sm="6" xs="12">
                <Card onClick={() => this.handleStoreInfo(index)} style={{ "height": "160px" }} className={`text-center justify-content-center text-white ${item ? "bg-mystoreBg" : "bg-grey"}`}>
                    <i className="material-icons md-48">store</i>
                    <div className="mr-4 ml-4 m-2" style={{ "height": "1px", "backgroundColor": "white" }}></div>
                    <div className="text-value p-2 font-sm">{item[1]}</div>
                </Card>
            </Col>);
        });
    }

    editCategoryForm() {
        return (<EditMyStoreForm
            handleFormSave={this.props.saveMyStore}
            handleFormOpen={this.handleFormOpen} />);
    }

    render() {
        return (<div>
            <Row>
                {this.state.showStoreInfo ?
                    <StoreInfo selectedStore={this.props.myStoresList[this.state.selectedStore][4]}
                        handleStoreInfo={this.handleStoreInfo}
                        getProducts={this.props.getProducts}
                        removeSelectedStore={this.props.removeSelectedStore}
                        selectedStoreProducts = {this.props.selectedStoreProducts}
                        addProduct={this.props.addProduct}
                        removeSelectedMyStore={this.props.removeSelectedMyStore}
                        updateStoreBalance={this.props.updateStoreBalance}
                        item={this.props.selectedStoreDetails} /> : this.state.formOpen ? this.editCategoryForm() : this.renderStores()}
            </Row>
            {this.state.showStoreInfo ? null : this.state.formOpen ? null : <FabButtons handleClick={this.handleFormOpen} />}
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        myStoresList: state.mystores.storeList,
        selectedStoreDetails: state.mystores.selectedMyStoreDetails,
        selectedStoreProducts: state.stores.selectedStoreProducts
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveMyStore: (data) => dispatch(saveMyStore(data)),
        updateStoreBalance: (data) => dispatch(updateStoreBalance(data)),
        addProduct: (data) => dispatch(addProduct(data)),
        getMyStoreData: () => dispatch(getMyStoreData()),
        getSelectedStoreDetails: (data) => dispatch(getSelectedStoreDetails(data)),
        removeSelectedMyStore: () => dispatch(removeSelectedMyStore()),
        removeMyStores: () => dispatch(removeMyStores()),
        getProducts: (data) => dispatch(getProducts(data)),
        removeSelectedStore: () => dispatch(removeSelectedStore())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyStores);
