import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./components/Home";
import Charities from "./components/Charities";


class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<Route exact path="/" component={Home} />
						<Route exact path="/charities" component={Charities} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
