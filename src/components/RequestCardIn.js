import React, { Component } from 'react';
import icon from '../whatsapp_icon.jpg';

class RequestCardIn extends Component {

shouldComponentUpdate( nextProps, nextState ){
	return true;
}
	render() {
		var request = this.props.request;
		var initials = "";
		var name = request.fields["Name"];
		if(name && name.split(" ").length>1) {
			initials = name.split(" ")[0];
		} else if(name) {
			initials = name;
		}

		var whatsappLink = "https://wa.me/918085418279"+"?"+"text=Hi!%20I%20want%20to%20help%20with%20request%20ID%20"+request.fields.ID;
		return(
			<div className="card-deck">
				<div className="card mb-4">
					<div className="card-body">
					<section id={request.fields.ID}>
				      {request.fields.ID && <p className="card-text"><b>Request ID</b>: {request.fields.ID }</p>}
				      {request.fields.Location && <p className="card-text"><b>Location</b>: {request.fields.Location }</p>}
				      {request.fields.Photos && <p className="card-text"><a href={request.fields.Photos[0].thumbnails.large.url} target="_blank"><img src= {request.fields.Photos[0].thumbnails.small.url }/></a></p>}
				      {request.fields["State"] && <p className="card-text"><b>Location</b>: {request.fields.District} ({request.fields.State})</p>}
				      {request.fields["Details"] && <p className="card-text"><b>Details</b>: {request.fields["Details"] }</p>}
				      {request.fields["Type"] && <p className="card-text"><b>Type</b>: {request.fields["Type"] }</p>}
				      {request.fields["NumOfAdults"] && <p className="card-text"><b>Number Of Adults</b>: {request.fields["NumOfAdults"] }</p>}
				      {request.fields["NumOfChildren"] && <p className="card-text"><b>Number Of Children</b>: {request.fields["NumOfChildren"] }</p>}
				      {request.fields.Status && <p className="card-text"><b>Status</b>: {request.fields.Status }</p>}
				      <p className="card-text"><h3>I can help: <a href={whatsappLink} target="_blank"><img src={icon} className="whatsapp_icon" alt="icon" /></a></h3></p>
				      <p className="card-text"></p>
					  </section>
		      	</div>
		      </div>
		    </div>
		);
	}
}

export default RequestCardIn;