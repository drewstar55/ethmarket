import React, { Component } from 'react';
import { Row, Col, Card } from 'reactstrap';
import EditAdminForm from './EditAdminForm';
import FabButtons from '../../components/fabbuttons';
import { saveAdminData, getAdminData } from '../../actions/admin';
import { connect } from 'react-redux';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { formOpen: false };
        this.handleFormOpen = this.handleFormOpen.bind(this);
    }
    handleFormOpen() {
        this.setState({ formOpen: !this.state.formOpen });
    }

    componentWillMount() {
        this.props.getAdminData();
    }

    renderCategoryItems() {
        return this.props.adminList.map((item, index) => {
            return (<Col key={index} lg="3" md="3" sm="6" xs="12">
                <Card style={{ "height": "160px" }} className={`text-center justify-content-center text-white ${index !== 0 ? "bg-lightgreen" : "bg-grey"}`}>
                    <i className="material-icons md-48">people</i>
                    <div className="mr-4 ml-4 m-2" style={{ "height": "1px", "backgroundColor": "white" }}></div>
                    <div className="text-value font-sm p-2">{item}</div>
                </Card>
            </Col>);
        });
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }
    editCategoryForm() {
        return (<EditAdminForm handleFormSave={this.props.saveAdminData} handleFormOpen={this.handleFormOpen} />);
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
        adminList: state.admin.adminData
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveAdminData: (data) => dispatch(saveAdminData(data)),
        getAdminData: () => dispatch(getAdminData())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
