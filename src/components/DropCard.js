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
				      {drop.fields.Organization && <h3 className="card-text">{drop.fields["Organization (from Organizations)"]}</h3>}
				      {drop.fields.Location && <p className="card-text"><b>Location</b>: {drop.fields.Location }</p>}
				      {drop.fields.Date && <p className="card-text"><b>Date</b>: {drop.fields.Date }</p>}
				      {drop.fields.What && <p className="card-text"><b>What</b>: {drop.fields.What }</p>}
				      {drop.fields.Notes && <p className="card-text"><b>Notes</b>: {drop.fields.Notes }</p>}
				      {drop.fields.Photos && <p className="card-text"><a href={drop.fields.Photos[0].thumbnails.large.url} target="_blank"><img src= {drop.fields.Photos[0].thumbnails.small.url }/></a></p>}
				      {drop.fields["Local contacts"] && <p className="card-text"><b>Local contacts</b>: {drop.fields["Local contacts"] }</p>}
				      {drop.fields["Contact name (from Organizations)"] && <p className="card-text"><b>Main Contact Name</b>: {drop.fields["Contact name (from Organizations)"] }</p>}
				      {drop.fields["Email (from Organizations)"] && <p className="card-text"><b>Email</b>: <a href={"mailto:"+drop.fields["Email (from Organizations)"]}>{drop.fields["Email (from Organizations)"] }</a></p>}
				      {drop.fields["FB (from Organizations)"] && <p className="card-text"><b>FB</b>: <a href={drop.fields["FB (from Organizations)"]} target="_blank">{drop.fields["FB (from Organizations)"]}</a></p>}
				      {drop.fields["WWW (from Organizations)"] && <p className="card-text"><b>WWW</b>: <a href={drop.fields["WWW (from Organizations)"]} target="_blank">{drop.fields["WWW (from Organizations)"] }</a></p>}
				      <p className="card-text"></p>
		      	</div>
		      </div>
		      </div>
		);
	}
}

export default DropCard;
