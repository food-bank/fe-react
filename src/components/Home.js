import React, { Component } from 'react';
import MapAndCharities from './MapAndCharities';

class Home extends Component {

	render() {
		const queryString = require('query-string');
		var parsed = queryString.parse(this.props.location.search);
		return(
			<div style={{}}>
				<MapAndCharities
					google={this.props.google}
					center={{lat: -8.2238968, lng: 114.9516869}}
					height='100vh'
					zoom={9}
					tab={parsed.tab}
				/>
			</div>
		);
	}
}

export default Home;
