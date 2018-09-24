import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Button, ButtonGroup} from 'reactstrap';
class CardView extends Component{

	render(){
		let { item, title, handleCardSelected, overlay, description, handleFormOpen} = this.props;
		let cardoverlay = (overlay ? (<CardImgOverlay className="p-0 d-none modal-dimmer card-overlay">
										<div className="m-auto d-flex">
											<div onClick={()=>{handleFormOpen(),handleCardSelected(item)}} className="bg-warning card-edit d-flex rounded-circle size-40">
												<span className="m-auto font-3xl ">+</span>
											</div>
											<div className="bg-warning d-flex rounded-circle size-40 ml-1 card-edit">
												<span className="m-auto font-xl">
												<i className="fa fa-trash"></i></span>
											</div>
										</div>
									</CardImgOverlay>) : null);
		return(
			<Col xs="12" sm="6" md="3">
			<Card onClick={overlay ?  null : ()=>{handleCardSelected(item)}} className="b-a-2 card-view" >
				<CardBody className="p-2 b-a-1 m-1">
						<CardImg top width="100%" src={this.props.image} alt="image text"/>
						{cardoverlay}
						<hr className="mt-1"/>
						<CardTitle className="mb-1 font-lg text-primary font-weight-bold">
							{title}
						</CardTitle>
						<CardText>
							{description}
						</CardText>
				</CardBody>
			</Card>
			</Col>
			);
		}
}

export default CardView;