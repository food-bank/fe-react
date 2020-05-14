import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey( process.env.REACT_APP_API_KEY );
Geocode.enableDebug();

class Map extends Component{

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

	showCharities = ( location ) => {
		// console.log(placeId);
		this.setState({currentLocation:location});
	};

	/**
	 * Get the current address from the default map position and set those values in the state
	 */
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
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state ||
			this.state.locations !== nextState.state.locations ||
			this.state.locationToAddressMap !== nextState.state.locationToAddressMap
		) {
			return true
		} else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
		return false;
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
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = ( event ) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();

		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray );
				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
			},
			error => {
				console.error(error);
			}
		);
	};



	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = ( place ) => {
		console.log( 'plc', place );
		const address = place.formatted_address,
		      addressArray =  place.address_components,
		      city = this.getCity( addressArray ),
		      area = this.getArea( addressArray ),
		      state = this.getState( addressArray ),
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: ( address ) ? address : '',
			area: ( area ) ? area : '',
			city: ( city ) ? city : '',
			state: ( state ) ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};


	render(){
		var AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap google={ this.props.google }
					           defaultZoom={ this.props.zoom }
					           defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
						{Object.entries(this.state.locationToAddressMap).map((entry) => 
									<div>
										<Marker google={this.props.google}
										        label={this.state.locationToCharityMap[entry[0]].length+""}
										        draggable={true}
										        onDragEnd={ this.onMarkerDragEnd }
										        onClick={() => {this.showCharities(entry[0])}}
										        position={{ lat: entry[1][0].geometry.location.lat, lng: entry[1][0].geometry.location.lng }}
										/>
									</div>
						)}
						{/* For Auto complete Search Box */}
						<Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '500px',
								display:"none"
							}}
							onPlaceSelected={ this.onPlaceSelected }
							types={['(regions)']}
						/>
					</GoogleMap>
				)
			)
		);
		let map;
		if( this.props.center.lat !== undefined ) {
			map = <div>
				{/*<div>
					<div className="form-group">
						<label htmlFor="">City</label>
						<input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Area</label>
						<input type="text" name="area" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.area }/>
					</div>
					<div className="form-group">
						<label htmlFor="">State</label>
						<input type="text" name="state" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Address</label>
						<input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
					</div>
				</div>*/}

				<AsyncMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
				/>
			</div>
		} else {
			map = <div style={{height: this.props.height}} />
		}

		return( 
			<div className="">
				<div className="row">
				<div className="col col-lg-6">
					{map} 
				</div>
				<div className="col col-lg-6">
					{this.state.currentLocation && <div className="card">
					    <div className="card-body">
					      <h3 className="card-title">{this.state.currentLocation}</h3>
					      	  {this.state.locationToCharityMap[this.state.currentLocation].map ((charity) => 
							      <div>
								      <h5 className="card-text"><b>Name : {charity.fields.Organization}</b></h5>
								      <p className="card-text"><b>Where</b>: {charity.fields.Where.toString() }</p>
								      <p className="card-text"><b>What</b>: {charity.fields.What.toString() }</p>
								      <p className="card-text"><b>Package</b>: {charity.fields.Package }</p>
								      <p className="card-text"><b>Deliveries per week</b>: {charity.fields["How many"] }</p>
								      <p className="card-text"><b>Fundraising</b>: {charity.fields.Fundraising.toString() }</p>
								      <p className="card-text"><b>Contact Name</b>: {charity.fields["Contact name"] }</p>
								      <p className="card-text"><b>Email</b>: {charity.fields.Email }</p>
								      <p className="card-text"><b>FB</b>: <a href={charity.fields.FB} target="_blank">{charity.fields.FB}</a></p>
								      <p className="card-text"><b>WWW</b>: <a href={charity.fields.WWW} target="_blank">{charity.fields.WWW }</a></p>
								      <p className="card-text"></p>
							      </div>
						      )}
					    </div>
					  </div> }
					</div>
				 </div>
			</div>
			)
	}
}
export default Map
