import React, { Component } from 'react';
import Map from './Map';

class Home extends Component {

	render() {
		return(
			<div style={{ margin: '100px' }}>
				<Map
					google={this.props.google}
					center={{lat: -8.2238968, lng: 114.9516869}}
					height='500px'
					zoom={10}
				/>
			</div>
		);
	}
}

export default Home;
