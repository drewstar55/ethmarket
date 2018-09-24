import React, { Component } from 'react';
import { addProduct } from '../../formData';
import InputFields from '../../components/inputfields';
import { CardBody, Row, Col, Button, Form } from 'reactstrap';

class EditMyStoreForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null
		};
		this.handleSave = this.handleSave.bind(this);

	}
	valueChange = (newValue) => {
		this.setState({ value: newValue })
	}
	handleSave() {
		if (this.name.getValue() && (this.price.getValue() > 0) && (this.qty.getValue() > -1) && this.desc.getValue()) {
			this.props.addProduct(
				{
					currentStore: this.props.selectedStore,
					name: this.name.getValue(),
					price: this.price.getValue(),
					qty: this.qty.getValue(),
					desc: this.desc.getValue()

				});
			this.props.handleFormOpen();
		}
	}
	getAllFields(selectedItem) {
		return addProduct.map((item, index) => {
			return (
				<Row className="justify-content-center" key={index}>
					<InputFields
						style={{ "height": "50px", "width": "450px" }}
						name={item.label}
						type={item.type}
						labelClassName="float-left"
						onChange={this.valueChange}
						placeholder={item.placeholder}
						className="mt-3 mb-2"
						inputOptions={item.options}
						inputValue={selectedItem ? selectedItem[item.name] : null}
						ref={(ref) => this[item.name] = ref} />
				</Row>);
		});
	}
	render() {
		return (
			<Col md="12">
				<CardBody className="ml-4 mr-4 text-center justify-content-center">
					<span className="font-xl font-weight-bold mb-5">Add New Product</span>
					<Form className="form-horizontal mt-2">
						{this.getAllFields(this.props.selectedItem)}
						<div className="form-actions mt-5 mb-5">
							<Button size="lg" color="danger" onClick={this.props.handleFormOpen} className="ml-1 mt-1 mb-1 mr-4">Cancel</Button>
							<Button size="lg" color="success" onClick={this.handleSave} className="ml-1 mt-1 mb-1">Create</Button>
						</div>
					</Form>
				</CardBody>
			</Col>
		);
	}
}

export default EditMyStoreForm;