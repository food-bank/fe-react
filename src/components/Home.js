import React, { Component } from 'react';
import MapAndCharities from './MapAndCharities';
import MapAndCharitiesIn from './MapAndCharitiesIn';

class Home extends Component {

	render() {
		const queryString = require('query-string');
		var parsed = queryString.parse(this.props.location.search);
		var lat = '-8.2238968';
		var lng = '114.9516869';
		// if(parsed.location && parsed.location == "in") {
		// 	lat = '19.0760';
		// 	lng = '72.8777';
		// }
		return(
			<div style={{}}>
				{parsed.location && parsed.location === "in" ?
				<MapAndCharitiesIn
					google={this.props.google}
					center={{lat: 19.0760, lng: 72.8777}}
					height='100vh'
					zoom={9}
					tab={parsed.tab}
					location={parsed.location}
				/> : 
				<MapAndCharities
					google={this.props.google}
					center={{lat: lat, lng: lng}}
					height='100vh'
					zoom={9}
					tab={parsed.tab}
					location={parsed.location}
				/>
				}
				
			</div>
		);
	}
}

export default Home;
