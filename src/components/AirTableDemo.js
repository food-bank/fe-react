import React, { Component } from 'react';

class Charities extends Component {

  constructor(props) {
    super(props);
    this.state = {
      charities: [],
      locationToCharityMap: [],
      locations: []
    };
  }

  populateLocationToCharityMap(records) {
  	console.log(records);
  	var map = {};
  	var locations = [];
  	for (var i in records) {
  		for (var j in records[i].fields.Where) {
  			var loc = records[i].fields.Where[j];
  			if(map[loc] != null)
  				map[loc].push(records[i]);
  			else {
  				map[loc] = [];
  				map[loc].push(records[i]);
  				locations.push(loc);
  			}
  		}
	}
	document.map=map;
	this.setState({ locationToCharityMap: map,
	locations: locations });
  }

  componentDidMount() {
    fetch('https://api.airtable.com/v0/appmSc1rY8HQoPQ5T/Organizations?api_key=keywaneNmq2i4Qwtq')
    .then((resp) => resp.json())
    .then(data => {
      console.log(data);
      this.setState({ charities: data.records });
      this.populateLocationToCharityMap(data.records);
    }).catch(err => {
      // Error
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card-deck">
              {this.state.locations.map((location) => 
	              <div className="card">
				    <div className="card-body">
				      <h5 className="card-title">{location}</h5>
				      	  {this.state.locationToCharityMap[location].map ((charity) => 
						      <div>
							      <p className="card-text">{charity.fields.Organization}</p>
							      <p className="card-text">
							        <small className="text-muted">{}</small>
							      </p>
							      <p className="card-text">{}</p>
						      </div>
					      )}
				    </div>
				  </div> 
				  )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Charities;
