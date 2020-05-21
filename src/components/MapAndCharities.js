import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import '../App.css';
import CharityCard from './CharityCard';
import Map from './Map';
Geocode.setApiKey( process.env.REACT_APP_API_KEY );
Geocode.enableDebug();

class MapAndCharities extends Component{

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
      		locationToCharityMap: [],
      		locations: [],
      		locationToAddressMap: [],
      		currentLocation: '',
      		dataReady: ''
		}
	}

	populateLocationToCharityMap(records) {
	  	console.log(records);
	  	var map = {};
	  	var locationToAddressMap = {};
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
		var that = this;
		var idx = 0;
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
		  				that.setState({dataReady: true})
		  			}
				  },
				  error => {
				    console.error(error);
				  }
				);
		});
		document.map2= locationToAddressMap;
		this.setState({ locationToCharityMap: map,
		locations: locations,
		locationToAddressMap: locationToAddressMap });
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

	showCharities = ( location ) => {
		// console.log(placeId);
		this.setState({currentLocation:location});
	};

	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		fetch(process.env.REACT_APP_AIRTABLE_URL)
		    .then((resp) => resp.json())
		    .then(data => {
		      console.log(data);
		      this.setState({ charities: data.records });
		      this.populateLocationToCharityMap(data.records);
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

				console.log( 'city', city, area, state );

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
			<div className="">
				<div className="row">
				<div className="logoClass"><a href="https://foodbank.co"><img className="logoImg" src="/favicon.png"/></a></div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 map-div">
					<Map  
						google={this.props.google}
						center={{lat: -8.2238968, lng: 114.9516869}}
						height='100vh'
						zoom={9}
						charities={this.state.charities}
			      		locationToCharityMap={this.state.locationToCharityMap}
			      		locations={this.state.locations}
			      		locationToAddressMap={this.state.locationToAddressMap}
			      		currentLocation={this.state.currentLocation}
			      		dataReady={this.state.dataReady}
			      		showCharities={this.showCharities}
					></Map>
				</div>
				<div className="col-lg-6  col-md-6  col-sm-12 col-xs-12 map-div charities">
					{this.state.currentLocation && <div className="card">
					    <div className="card-body">
					      <h1 className="card-title">{this.state.currentLocation}</h1>
					      	  {this.state.locationToCharityMap[this.state.currentLocation].map ((charity) => 
							      <CharityCard charity={charity}/>
						      )}
					    </div>
					  </div> }

					  {!this.state.currentLocation && <div className="card">
					    <div className="card-body">
					    	<div>
					      		<h1 className="card-title">Bali</h1>
						      	  	{this.state.charities.map ((charity) => 
								      <CharityCard charity={charity}/>
							      	)}
				    		</div>
					  </div>
					  </div> }
					</div>
				 </div>
			</div>
			)
	}
}
export default MapAndCharities;