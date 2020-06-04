import React, { Component } from 'react';

class RequestCard extends Component {

shouldComponentUpdate( nextProps, nextState ){
	return true;
}
	render() {
		var request = this.props.request;
		return(
			<div className="card-deck">
				<div className="card mb-4">
					<div className="card-body">
				      {request.fields.Location && <p className="card-text"><b>Location</b>: {request.fields.Location }</p>}
				      {request.fields.Map && <p className="card-text"><a href={request.fields.Map} target="_blank" class="btn btn-dark">Map</a></p>}
				      {request.fields.Photos && <p className="card-text"><a href={request.fields.Photos[0].thumbnails.large.url} target="_blank"><img src= {request.fields.Photos[0].thumbnails.small.url }/></a></p>}
				      {request.fields["Name"] && <p className="card-text"><b>Name</b>: {request.fields["Name"] }</p>}
				      {request.fields["Phone"] && <p className="card-text"><b>Phone</b>: {request.fields["Phone"] }</p>}
				      {request.fields["Email"] && <p className="card-text"><b>Email</b>: {request.fields["Email"] }</p>}
				      {request.fields["Families"] && <p className="card-text"><b>Families</b>: {request.fields["Families"] }</p>}
				      {request.fields["Couples"] && <p className="card-text"><b>Couples</b>: {request.fields["Couples"] }</p>}
				      {request.fields["Kids"] && <p className="card-text"><b>Kids</b>: {request.fields["Kids"] }</p>}
				      {request.fields.Notes && <p className="card-text"><b>Notes</b>: {request.fields.Notes }</p>}
				      <p className="card-text"></p>
		      	</div>
		      </div>
		      </div>
		);
	}
}

export default RequestCard;