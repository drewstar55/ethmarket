import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'reactstrap';
import { connect } from 'react-redux';
import EditStoreForm from './EditStoreForm';
import { getStoreData, getProducts, buyProduct, removeSelectedStore, removeStores } from '../../actions/stores';
import ProductCard from './productCard';

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProductList: false,
            formOpen: false,
            selectedStoreId: null
        };
        this.handleFormOpen = this.handleFormOpen.bind(this);
    }
    componentWillMount() {
        this.props.getStoreData();
    }
    handleFormOpen() {
        this.setState({ formOpen: !this.state.formOpen });
    }

    handleProductList = (index) => {
        if (index > -1) {
            this.props.getProducts(this.props.storeList[index][4])
        }
        this.setState({
            showProductList: true,
            selectedStoreId: index
        });
    }
    componentWillUnmount() {
        this.props.removeSelectedStore();
        this.props.removeStores();
    }
    handleGoBack = () => {
        this.setState({
            showProductList: false,
            selectedStoreId: null
        });
    }

    renderStores() {
        return this.props.storeList.map((item, index) => {
            return (<Col key={index} lg="3" md="3" sm="6" xs="12">
                <Card onClick={() => this.handleProductList(index)} style={{ "height": "160px", "backgroundColor": "#859e24 !important" }} className={`text-center justify-content-center text-white ${item ? "bg-mystoreBg" : "bg-grey"}`}>
                    <i className="material-icons md-48">store</i>
                    <div className="mr-4 ml-4 m-2" style={{ "height": "1px", "backgroundColor": "white" }}></div>
                    <div className="text-value font-sm p-2">{item[1]}</div>
                </Card>
            </Col>);
        });
    }

    editCategoryForm() {
        return (<EditStoreForm handleFormOpen={this.handleFormOpen} />);
    }

    renderStoreItems(itemsList) {
        return itemsList.map((item, index) => {
            return (
                <ProductCard key={index} item={item}
                    selectedStoreId={this.props.storeList[this.state.selectedStoreId][4]}
                    buyProduct={this.props.buyProduct}
                    userBalance={this.props.balanceAvail}
                    handleGoBack={this.handleGoBack} />
            );
        });
    }

    render() {
        return (<div>
            {this.state.showProductList ?
                (<div>
                    <Button className="mt-1 bg-lightgreen" onClick={this.handleGoBack}>Back</Button>
                    <Row className="mt-3">{this.renderStoreItems(this.props.productsList)}</Row>
                </div>) :
                (<Row>
                    {this.state.formOpen ? this.editCategoryForm() : this.renderStores()}
                </Row>)
            }
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        storeList: state.stores.storeData,
        productsList: state.stores.selectedStoreProducts,
        balanceAvail: state.login.loginDetails.balance
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStoreData: () => dispatch(getStoreData()),
        getProducts: (data) => dispatch(getProducts(data)),
        buyProduct: (data) => dispatch(buyProduct(data)),
        removeSelectedStore: () => dispatch(removeSelectedStore()),
        removeStores: () => dispatch(removeStores())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Stores);