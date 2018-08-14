import React, { Component } from 'react';
import './App.css';
import Mapper from './mapper/Mapper';

class App extends Component {
	constructor() {
		super();

		this.state = {
			cor: 1,
			inputFormat: {},
			outputFormat: {},
			timer: () => {
				setTimeout(() => {
					this.setState(this.state.cor + 1);
				}, 10000);
			},
			data: '',
		}

		fetch('http://localhost:3001/mappers/')
		.then(response => response.json())
		.then(data => this.setState({ data }))
	}



	addMapping = (mapping) => {
		// 1. Take a copy of the existing state
		const data = { ...this.state.data };

		// 2. Add a new vehicle to data
		data[`vehicle${Date.now()}`] = mapping;

		// 3. Set the new vehicle object to state
		this.setState({ data });

		console.log(`Add mapping: ${mapping}.`);
	};

	removeMapping = (to: string) => {
		const data = { ...this.state.data };
		// set the current vehicle to null
		data[to] = null;
		this.setState({ data });
		console.log(`Remove mapping: ${to}.`);
	};

	render() {
		return (
			<div className="app">
				<header className="app-header">
					<h1 className="app-title">The Mapper App</h1>
				</header>

				<Mapper
					inputFormat={this.state.inputFormat}
					outputFormat={this.state.inputFormat}
					add={this.addMapping}
					remove={this.removeMapping}
					data={this.state.data}
				/>
			</div>
		);
	}
}
export default App;
