import React, { Component } from 'react';

class CharityCard extends Component {

	render() {
		var charity = this.props.charity;
		return(
			<div className="card-deck">
				<div className="card">
			      {charity.fields.Organization && <h3 className="card-text">{charity.fields.Organization}</h3>}
			      {charity.fields.Where && <p className="card-text"><b>Where</b>: {charity.fields.Where.join(', ') }</p>}
			      {charity.fields.What && <p className="card-text"><b>What</b>: {charity.fields.What.join(', ') }</p>}
			      {charity.fields.Package && <p className="card-text"><b>Package</b>: {charity.fields.Package }</p>}
			      <p className="card-text"><b>Deliveries per week</b>: {charity.fields["How many"] }</p>
			      {charity.fields.Fundraising && <p className="card-text"><b>Fundraising</b>: {charity.fields.Fundraising.join(', ') }</p>}
			      <p className="card-text"><b>Contact Name</b>: {charity.fields["Contact name"] }</p>
			      {charity.fields.Email && <p className="card-text"><b>Email</b>: {charity.fields.Email }</p>}
			      {charity.fields.FB && <p className="card-text"><b>FB</b>: <a href={charity.fields.FB} target="_blank">{charity.fields.FB}</a></p>}
			      {charity.fields.WWW && <p className="card-text"><b>WWW</b>: <a href={charity.fields.WWW} target="_blank">{charity.fields.WWW }</a></p>}
			      <p className="card-text"></p>
		      </div>
		      </div>
		);
	}
}

export default CharityCard;
