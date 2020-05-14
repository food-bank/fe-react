import React, { Component } from 'react';
import Map from './Map';

class Home extends Component {

	render() {
		return(
			<div style={{}}>
				<Map
					google={this.props.google}
					center={{lat: -8.2238968, lng: 114.9516869}}
					height='600px'
					zoom={10}
				/>
			</div>
		);
	}
}

export default Home;
