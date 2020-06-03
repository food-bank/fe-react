import React, { Component } from 'react';

class CharityCard extends Component {

shouldComponentUpdate( nextProps, nextState ){
	return true;
}
	render() {
		var charity = this.props.charity;
		return(
			<div className="card-deck">
				<div className="card mb-4">
					<div className="card-body">
				      {charity.fields.Organization && <h2 className="card-text mb-4">{charity.fields.Organization}</h2>}
				      {charity.fields.Where && <p className="card-text"><b>Where</b>: {charity.fields.Where.join(', ') }</p>}
				      {charity.fields.What && <p className="card-text"><b>What</b>: {charity.fields.What.join(', ') }</p>}
				      {charity.fields.Package && <p className="card-text"><b>Package</b>: {charity.fields.Package }</p>}
				      <p className="card-text"><b>Deliveries per week</b>: {charity.fields["How many"] }</p>
				      {charity.fields.Fundraising && <p className="card-text"><b>Fundraising</b>: {charity.fields.Fundraising.join(', ') }</p>}
				      <p className="card-text"><b>Contact Name</b>: {charity.fields["Contact name"] }</p>
				      <p className="card-text">
					      {charity.fields.Email && <a href={"mailto:"+charity.fields.Email} className="btn btn-info mr-3">EMAIL</a>}
					      {charity.fields.FB && <a href={charity.fields.FB} className="btn btn-primary mr-3" target="_blank">FB</a>}
					      {charity.fields.WWW && <a href={charity.fields.WWW} className="btn btn-success" target="_blank">WWW</a>}
				      </p>
		      	</div>
		      </div>
		      </div>
		);
	}
}

export default CharityCard;
