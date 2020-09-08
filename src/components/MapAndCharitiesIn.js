import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import '../App.css';
import CharityCard from './CharityCard';
import DropCard from './DropCard';
import RequestCardIn from './RequestCardIn';
import MapIn from './MapIn';
var stateDistricts = require('../state-districts.json')
Geocode.setApiKey( process.env.REACT_APP_API_KEY );
Geocode.enableDebug();

class MapAndCharitiesIn extends Component{

	constructor( props ){
		super( props );
		this.state = {
			address: '',
			city: '',
			area: '',
			state: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			charities: [],
			drops: [],
			requests: [],
      		locationToCharityMap: [],
      		locations: [],
      		locationToAddressMap: [],
      		currentLocation: '',
      		dataReady: 0,
      		tabSelected: 'org',
      		locationToDropsMap: [],
			dropLocations: [],
			locationToDropAddressMap: [],
			requestLocations: [],
			locationToRequestAddressMap: []
		}
	}

	populateLocationToCharityMap(records) {
	  	var map = {};
	  	var locationToAddressMap = {};
	  	var locations = [];
	  	
	  	for (var i in records) {
	  		var updatedLocations = [];
	  		for (var j in records[i].fields.Where) {
	  			var loc = records[i].fields.Where[j];
	  			if(loc.includes("all")) {
					for(var j=0;j<stateDistricts.states.length;j++) {
						if(stateDistricts.states[j].state == loc) {
							updatedLocations = updatedLocations.concat(stateDistricts.states[j].districts);
						}
					}
				} else {
					updatedLocations.push(loc);
				}
	  			
	  		}
	  		records[i].fields.WhereOriginal = records[i].fields.Where;
	  		records[i].fields.Where = updatedLocations;
		}

		this.setState({ charities: records });

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

// sort by priority or organisations 
		for(var key in map){
		    map[key].sort((a, b) => a.fields.Priority - b.fields.Priority);
		}

		document.map=map;
		var that = this;
		var idx = 0;

		document.locations = locations;
		

		locations.forEach(function(location) {
			Geocode.fromAddress(location).then(
				  response => {
				    // const { lat, lng } = response.results[0].geometry.location;
				    if(locationToAddressMap[location] != null)
	  					locationToAddressMap[location].push(response.results[0]);
		  			else {
		  				locationToAddressMap[location] = [];
		  				locationToAddressMap[location].push(response.results[0]);
		  			}
		  			idx++;
		  			that.setState({locationToAddressMap:locationToAddressMap})
		  			if(idx == locations.length) {
		  				that.setState({dataReady: that.state.dataReady+1})
		  			}
				  },
				  error => {
				    console.error(error);
				  }
				);
		});
		document.map2= locationToAddressMap;
		this.setState({ locationToCharityMap: map,
		locations: updatedLocations,
		locationToAddressMap: locationToAddressMap });
	  }

	  populateLocationToDropsMap(dropRecords) {
	  	var map = {};
	  	var locationToAddressMap = {};
	  	var dropLocations = [];
	  	for (var i in dropRecords) {
	  		// dropRecords[i].fields.Where = ;
	  		for (var j in dropRecords[i].fields["Name (from Regency)"]) {
	  			var loc = dropRecords[i].fields["Name (from Regency)"][j];
	  			if(map[loc] != null)
	  				map[loc].push(dropRecords[i]);
	  			else {
	  				map[loc] = [];
	  				map[loc].push(dropRecords[i]);
	  				dropLocations.push(loc);
	  			}

	  			
	  		}
		}
		document.map=map;
		var that = this;
		var idx = 0;
		dropLocations.forEach(function(dropLocation) {
			Geocode.fromAddress(dropLocation).then(
				  response => {
				    // const { lat, lng } = response.results[0].geometry.location;
				    if(locationToAddressMap[dropLocation] != null)
	  					locationToAddressMap[dropLocation].push(response.results[0]);
		  			else {
		  				locationToAddressMap[dropLocation] = [];
		  				locationToAddressMap[dropLocation].push(response.results[0]);
		  			}
		  			idx++;
		  			that.setState({locationToDropAddressMap:locationToAddressMap})
		  			if(idx == dropLocations.length) {
		  				that.setState({dataReady: that.state.dataReady+1})
		  			}
				  },
				  error => {
				    console.error(error);
				  }
				);
		});
		document.map2= locationToAddressMap;
		this.setState({ locationToDropsMap: map,
		dropLocations: dropLocations,
		locationToDropAddressMap: locationToAddressMap });
	  }

	  populateLocationToRequestsMap(requestsRecords) {
	  	var map = {};
	  	var locationToAddressMap = {};
	  	var requestLocations = [];
	  	for (var i in requestsRecords) {
	  		// if(requestsRecords[i].fields["Status"] == "Done") continue;
	  		// dropRecords[i].fields.Where = ;
	  		for (var j in requestsRecords[i].fields["District"]) {
	  			var loc = requestsRecords[i].fields["District"][j];
	  			if(map[loc] != null)
	  				map[loc].push(requestsRecords[i]);
	  			else {
	  				map[loc] = [];
	  				map[loc].push(requestsRecords[i]);
	  				requestLocations.push(loc);
	  			}

	  			
	  		}
		}
		document.reqmap=map;
		var that = this;
		var idx = 0;
		requestLocations.forEach(function(reqLocation) {
			Geocode.fromAddress(reqLocation).then(
				  response => {
				    // const { lat, lng } = response.results[0].geometry.location;
				    if(locationToAddressMap[reqLocation] != null)
	  					locationToAddressMap[reqLocation].push(response.results[0]);
		  			else {
		  				locationToAddressMap[reqLocation] = [];
		  				locationToAddressMap[reqLocation].push(response.results[0]);
		  			}
		  			idx++;
		  			that.setState({locationToRequestAddressMap:locationToAddressMap})
		  			if(idx == requestLocations.length) {
		  				that.setState({dataReady: that.state.dataReady+1})
		  			}
				  },
				  error => {
				    console.error(error);
				  }
				);
		});
		document.map2= locationToAddressMap;
		this.setState({ locationToRequestsMap: map,
		requestLocations: requestLocations,
		locationToRequestAddressMap: locationToAddressMap });
	  }

	  /**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};

	showCharities = ( location, lat, lng ) => {
		// console.log(placeId);
		this.setState({currentLocation:location,
					mapPosition: {
						lat: lat,
						lng: lng
					} 
		});
	};

	setTabSelected = (tab) => {
		if(tab == "drop") return;
		this.setState({tabSelected: tab});
		this.setState({currentLocation:null});
	}

	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		if(this.props.tab && this.props.tab=="drops") {
			this.setTabSelected("drop");
		}
		if(this.props.tab && this.props.tab=="requests") {
			this.setTabSelected("requests");
		}

		

		if(this.props.location && this.props.location=="in") {
			fetch('https://api.airtable.com/v0/app9Y3oDsJVMxq8VH/charities-in?api_key=keyZyazWxzWlKrcvJ')
		    .then((resp) => resp.json())
		    .then(data => {
		      // console.log(data);
		      
		      this.populateLocationToCharityMap(data.records);
		    }).catch(err => {
		      // Error
		    });
		} else {
			fetch(process.env.REACT_APP_AIRTABLE_URL)
		    .then((resp) => resp.json())
		    .then(data => {
		      // console.log(data);
		      this.setState({ charities: data.records });
		      this.populateLocationToCharityMap(data.records);
		    }).catch(err => {
		      // Error
		    });
		}

		// fetch(process.env.REACT_APP_AIRTABLE_DROP_URL)
		//     .then((resp) => resp.json())
		//     .then(data => {
		//       // console.log(data);
		//       this.setState({ drops: data.records });
		//       this.populateLocationToDropsMap(data.records);
		//     }).catch(err => {
		//       // Error
		//     });

		fetch('https://api.airtable.com/v0/app9Y3oDsJVMxq8VH/help-requests?api_key=keyZyazWxzWlKrcvJ&view=UnSolved')
		    .then((resp) => resp.json())
		    .then(data => {
		      // console.log(data);
		      this.setState({ requests: data.records });
		      this.populateLocationToRequestsMap(data.records);
		    }).catch(err => {
		      // Error
		    });

		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray );

				// console.log( 'city', city, area, state );

				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
				} )
			},
			error => {
				console.error( error );
			}
		);
	};
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
	shouldComponentUpdate( nextProps, nextState ){
		return true;
	}
	
	render(){
		return( 
			<div className="container-fluid">
				<div className="row">
				<div className="logoClass"><a href="https://india.foodbank.co"><img className="logoImg" src="/favicon.png"/></a></div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 map-div">
					{this.state.tabSelected && 
					<MapIn  
						google={this.props.google}
						center={{lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
						height='100vh'
						zoom={6}
						charities={this.state.charities}
			      		locationToCharityMap={this.state.locationToCharityMap}
			      		locations={this.state.locations}
			      		locationToAddressMap={this.state.locationToAddressMap}
			      		currentLocation={this.state.currentLocation}
			      		dataReady={this.state.dataReady}
			      		showCharities={this.showCharities}
			      		drops={this.state.drops}
			      		tabSelected={this.state.tabSelected}
			      		locationToDropsMap={this.state.locationToDropsMap}
						dropLocations={this.state.dropLocations}
						locationToDropAddressMap={this.state.locationToDropAddressMap}
						requestLocations={this.state.requestLocations}
						locationToRequestAddressMap={this.state.locationToRequestAddressMap}
						locationToRequestsMap={this.state.locationToRequestsMap}
					></MapIn>
					}
				</div>
				<div className="col-lg-6  col-md-6  col-sm-12 col-xs-12 map-div charities">
					{this.state.currentLocation && this.state.tabSelected=="org" && <div>
						<div>
				          <div>
				            <div class="pt-4 pr-4 pl-4">
				              <button onClick={(e) => this.setTabSelected("org")} className="btn btn-danger btn-lg mr-4">Organizations</button>
				              <button onClick={(e) => this.setTabSelected("drop")} className="btn btn-dark btn-lg mr-4">Drops</button>
				              <button onClick={(e) => this.setTabSelected("requests")} className="btn btn-dark btn-lg mr-4">Requests</button>
				            </div>
				            <div class="pt-4 pr-4 pl-4 pb-2 d-none d-md-block">
				            	<p><strong>Foodbank</strong> is a matching service for help seekers, donors, volunteers and food distribution initiatives in India. Put your food mobilization organization on the map!</p>
				            	<p><a class="btn btn-light" href="https://india.foodbank.co/join"><strong>Join FoodBank →</strong></a></p>
				            </div>
				            <hr class="d-none d-md-block" />
				          </div>
				        </div>
							<div>
						    <div className="card-body">
						      <h1 className="card-title">{this.state.currentLocation}</h1>
						      {this.state.locationToCharityMap[this.state.currentLocation].map ((charity) => 
								  	<CharityCard charity={charity} location={this.props.location}/>
							    )}
						    </div>
						    <div class="pt-4 pr-4 pl-4 pb-2 d-block d-md-none">
		            	<p><strong>Foodbank</strong> is a matching service for help seekers, donors, volunteers and food distribution initiatives in India. Put your food mobilization organization on the map!</p>
		            	<p><a class="btn btn-light" href="https://india.foodbank.co/join"><strong>Join FoodBank →</strong></a></p>
		            </div>
					    </div>
					  </div> }

					  {this.state.currentLocation && this.state.tabSelected=="drop" && <div>
						<div>
				          <div>
				            <div class="pt-4 pr-4 pl-4">
				              <button onClick={(e) => this.setTabSelected("org")} className="btn btn-dark btn-lg mr-4">Organizations</button>
				              <button onClick={(e) => this.setTabSelected("drop")} className="btn btn-danger btn-lg mr-4">Drops</button>
				              <button onClick={(e) => this.setTabSelected("requests")} className="btn btn-dark btn-lg mr-4">Requests</button>
				            </div>
				            <div class="pt-4 pr-5 pl-4 pb-2 d-none d-md-block">
				            	<p>Are you distributing food in India? <strong>Please, add information about your food drop.</strong> It will take only 2-3 minutes of your time per each drop, and it will greatly help to reduce double dipping in India.</p>
				            	<p><a class="btn btn-light" href="https://india.foodbank.co/drop"><strong>+ Register your drop</strong></a></p>
				            </div>
				            <hr class="d-none d-md-block" />
				          </div>
				        </div>
						<div>
					    <div className="card-body">
					      <h1 className="card-title">{this.state.currentLocation}</h1>
					      	  {this.state.locationToDropsMap[this.state.currentLocation].map ((drop) => 
							      <DropCard drop={drop}/>
						      )}
					    </div>
					    <div class="pt-4 pr-5 pl-4 pb-2 d-block d-md-none">
	            	<p>Are you distributing food in India? <strong>Please, add information about your food drop.</strong> It will take only 2-3 minutes of your time per each drop, and it will greatly help to reduce double dipping in India.</p>
	            	<p><a class="btn btn-light" href="https://india.foodbank.co/drop"><strong>+ Register your drop</strong></a></p>
	            </div>
					    </div>
					  </div> }

					  {this.state.currentLocation && this.state.tabSelected=="requests" && <div>
						<div className="row">
				          <div className="col">
				            <div class="mb-4">
				              <button onClick={(e) => this.setTabSelected("org")} className="btn btn-dark btn-lg mr-4">Organizations</button>
				              <button onClick={(e) => this.setTabSelected("drop")} className="btn btn-dark btn-lg mr-4">Drops</button>
				              <button onClick={(e) => this.setTabSelected("requests")} className="btn btn-danger btn-lg mr-4">Requests</button>
				            </div>
				          </div>
				        </div>
						<div className="card">
					    <div className="card-body">
					      <h1 className="card-title">{this.state.currentLocation}</h1>
					      	  {this.state.locationToRequestsMap[this.state.currentLocation].map ((request) => 
							      <RequestCardIn request={request}/>
						      )}
					    </div>
					    </div>
					  </div> }

					  {!this.state.currentLocation && this.state.tabSelected=="org" && <div>
					  	<div>
				          <div>
				            <div class="pt-4 pr-4 pl-4">
				              <button onClick={(e) => this.setTabSelected("org")} className="btn btn-danger btn-lg mr-4">Organizations</button>
				              <button onClick={(e) => this.setTabSelected("drop")} className="btn btn-dark btn-lg  mr-4">Drops</button>
				              <button onClick={(e) => this.setTabSelected("requests")} className="btn btn-dark btn-lg mr-4">Requests</button>
				            </div>
				            <div class="pt-4 pr-5 pl-4 pb-2 d-none d-md-block">
				            	<p><strong>Foodbank</strong> is a matching service for help seekers, donors, volunteers and food distribution initiatives in India. Put your food mobilization organization on the map!</p>
				            	<p><a class="btn btn-light" href="https://india.foodbank.co/join"><strong>Join FoodBank →</strong></a></p>
				            </div>
				            <hr class="d-none d-md-block" />
				          </div>
				        </div>
					  	<div>
					    <div className="card-body">
					    	<div>
					      		<h1 className="card-title">India</h1>
						      	  	{this.state.charities.map ((charity) => 
								      <CharityCard charity={charity} location={this.props.location}/>
							      	)}
				    		</div>
					  	</div>
				  		<div class="pt-4 pr-4 pl-4 pb-2 d-block d-md-none">
	            	<p><strong>Foodbank.co</strong> is a matching service for help seekers, donors and food distribution initiatives in India. Put your food mobilization organization on the map!</p>
	            	<p><a class="btn btn-light" href="https://india.foodbank.co/join"><strong>Join FoodBank.co →</strong></a></p>
	            </div>
					  </div>
					  </div> }

					  {!this.state.currentLocation && this.state.tabSelected=="drop" && <div>
					  	<div>
				          <div>
				            <div class="pt-4 pr-4 pl-4">
				              <button onClick={(e) => this.setTabSelected("org")} className="btn btn-dark btn-lg mr-4">Organizations</button>
				              <button onClick={(e) => this.setTabSelected("drop")} className="btn btn-danger btn-lg mr-4">Drops</button>
				              <button onClick={(e) => this.setTabSelected("requests")} className="btn btn-dark btn-lg mr-4">Requests</button>
				            </div>
				            <div class="pt-4 pr-5 pl-4 pb-2 d-none d-md-block">
				            	<p>Are you distributing food in India? <strong>Please, add information about your food drop.</strong> It will take only 2-3 minutes of your time per each drop, and it will greatly help to reduce double dipping in India.</p>
				            	<p><a class="btn btn-light" href="https://india.foodbank.co/drop"><strong>+ Register your drop</strong></a></p>
				            </div>
				            <hr class="d-none d-md-block" />
				          </div>
				        </div>
					  	<div>
					    <div className="card-body">
					    	<div>
					      		<h1 className="card-title">India</h1>
						      	  	{this.state.drops.map ((drop) => 
								      <DropCard drop={drop}/>
							      	)}
				    		</div>
					  </div>
				    <div class="pt-4 pr-5 pl-4 pb-2 d-block d-md-none">
            	<p>Are you distributing food in India? <strong>Please, add information about your food drop.</strong> It will take only 2-3 minutes of your time per each drop, and it will greatly help to reduce double dipping in India.</p>
            	<p><a class="btn btn-light" href="https://india.foodbank.co/drop"><strong>+ Register your drop</strong></a></p>
            </div>
					  </div>
					  </div> }

					  {!this.state.currentLocation && this.state.tabSelected=="requests" && <div>
					  	<div className="row">
				          <div className="col">
				            <div class="mb-4">
				              <button onClick={(e) => this.setTabSelected("org")} className="btn btn-dark btn-lg mr-4">Organizations</button>
				              <button onClick={(e) => this.setTabSelected("drop")} className="btn btn-dark btn-lg mr-4">Drops</button>
				              <button onClick={(e) => this.setTabSelected("requests")} className="btn btn-danger btn-lg mr-4">Requests</button>
				            </div>
				          </div>
				        </div>
					  	<div className="card">
					    <div className="card-body">
					    	<div>
					      		<h1 className="card-title">India</h1>
						      	  	{this.state.requests.map ((request) => 
								      <RequestCardIn request={request}/>
							      	)}
				    		</div>
					  </div>
					  </div>
					  </div> }

					</div>
				 </div>
			</div>
			)
	}
}
export default MapAndCharitiesIn;