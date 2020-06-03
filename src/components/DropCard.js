import React, { Component } from 'react';

class DropCard extends Component {

shouldComponentUpdate( nextProps, nextState ){
	return true;
}
	render() {
		var drop = this.props.drop;
		return(
			<div className="card-deck">
				<div className="card mb-4">
					<div className="card-body">
				      {drop.fields.Organization && <h2 className="card-text mb-4">{drop.fields["Organization (from Organizations)"]}</h2>}
				      {drop.fields.Location && <p className="card-text word-break-word"><b>Location</b>: {drop.fields.Location }</p>}
				      {drop.fields.Date && <p className="card-text"><b>Date</b>: {drop.fields.Date }</p>}
				      {drop.fields.What && <p className="card-text"><b>What</b>: {drop.fields.What }</p>}
				      {drop.fields.Notes && <p className="card-text"><b>Notes</b>: {drop.fields.Notes }</p>}
				      {drop.fields.Photos && <p className="card-text"><a href={drop.fields.Photos[0].thumbnails.large.url} target="_blank"><img src= {drop.fields.Photos[0].thumbnails.small.url }/></a></p>}
				      {drop.fields["Local contacts"] && <p className="card-text word-break-word"><b>Local contacts</b>: {drop.fields["Local contacts"] }</p>}
				      {drop.fields["Contact name (from Organizations)"] && <p className="card-text"><b>Main Contact Name</b>: {drop.fields["Contact name (from Organizations)"] }</p>}
				      <p className="card-text">
					      {drop.fields["Email (from Organizations)"] && <a href={"mailto:"+drop.fields["Email (from Organizations)"]} className="btn btn-info mr-3">EMAIL</a>}
					      {drop.fields["FB (from Organizations)"] && <a href={drop.fields["FB (from Organizations)"]} className="btn btn-primary mr-3" target="_blank">FB</a>}
					      {drop.fields["WWW (from Organizations)"] && <a href={drop.fields["WWW (from Organizations)"]} className="btn btn-success" target="_blank">WWW</a>}
				      </p>
		      	</div>
		      </div>
		      </div>
		);
	}
}

export default DropCard;
