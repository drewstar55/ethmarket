import React, { Component } from 'react';
import { myStoreData } from '../../formData';
import InputFields from '../../components/inputfields';
import { Card, CardBody, Row, Col, Button, Form } from 'reactstrap';

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
		if (this.myStoreId.getValue() && this.description.getValue()) {
			this.props.handleFormSave(
				{
					newMyStore: this.myStoreId.getValue(),
					description: this.description.getValue()
				});
			this.props.handleFormOpen();
		}
	}
	getAllFields(selectedItem) {
		return myStoreData.map((item, index) => {
			return (
				<Row className="justify-content-center" key={index}>
					<InputFields
						style={{ "height": "50px", "width": "450px" }}
						placeholder={item.placeholder}
						name={item.label}
						type={item.type}
						onChange={this.valueChange}
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
				<Card>
					<CardBody className="ml-4 mr-4 text-center justify-content-center">
						<span className="font-xl font-weight-bold mb-5">Create New Store</span>
						<Form className="form-horizontal mt-5">
							<div style={{ "height": "65vh" }} >
								{this.getAllFields(this.props.selectedItem)}
								<div className="form-actions mt-5 mb-5">
									<Button size="lg" color="danger" onClick={this.props.handleFormOpen} className="ml-1 mt-1 mb-1 mr-4">Cancel</Button>
									<Button size="lg"
										color="success"
										onClick={this.handleSave}
										className="ml-1 mt-1 mb-1">Create</Button>
								</div>
							</div>
						</Form>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default EditMyStoreForm;