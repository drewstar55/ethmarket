import React, { Component } from 'react';
import { Row, Col, Card } from 'reactstrap';
import EditStoreOwnerForm from './EditStoreOwnerForm';
import FabButtons from '../../components/fabbuttons';
import { saveStoreOwner, getStoreOwnerData, removeStoreOwners } from '../../actions/storeowner';
import { connect } from 'react-redux';

class StoreOwner extends Component {
    constructor(props) {
        super(props);
        this.state = { formOpen: false };
        this.handleFormOpen = this.handleFormOpen.bind(this);
    }
    handleFormOpen() {
        this.setState({ formOpen: !this.state.formOpen });
    }

    componentWillMount() {
        this.props.getStoreOwnerData();
    }

    componentWillUnmount() {
        this.props.removeStoreOwners();
    }

    renderCategoryItems() {
        return this.props.storeList.map((item, index) => {
            return (<Col key={index} lg="3" md="3" sm="6" xs="12">
                <Card style={{ "height": "160px", "backgroundColor": "#859e24 !important" }} className={`text-center justify-content-center text-white ${item ? "bg-mystoreBg" : "bg-grey"}`}>
                    <i className="material-icons md-48">person</i>
                    <div className="mr-4 ml-4 m-2" style={{ "height": "1px", "backgroundColor": "white" }}></div>
                    <div className="text-value font-sm p-2">{item}</div>
                </Card>
            </Col>);
        });
    }

    editCategoryForm() {
        return (<EditStoreOwnerForm handleFormSave={this.props.saveStoreOwner} handleFormOpen={this.handleFormOpen} />);
    }

    render() {
        return (<div>
            <Row>
                {this.state.formOpen ? this.editCategoryForm() : this.renderCategoryItems()}
            </Row>
            {this.state.formOpen ? null : <FabButtons handleClick={this.handleFormOpen} />}
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        storeList: state.storeowner.storeData
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveStoreOwner: (data) => dispatch(saveStoreOwner(data)),
        getStoreOwnerData: () => dispatch(getStoreOwnerData()),
        removeStoreOwners: () => dispatch(removeStoreOwners())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreOwner);
