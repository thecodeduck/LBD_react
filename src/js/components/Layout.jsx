import React from 'react';

import Button from './Button';
import { code } from './logic';


// const UserInput = require('./UserInput').default;
import UserInput from './UserInput';
// import Controlled from './Textinput.jsx';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userinput: {},
			code,
			history: [],
		};

		this.onClick = this.onClick.bind(this);
		this.onUserInputChange = this.onUserInputChange.bind(this);
		this.renderHistory = this.renderHistory.bind(this);
	}

	onUserInputChange(newUserInput) {
		this.setState({ userinput: newUserInput });
		console.log('onChange newUserInput', newUserInput);
	}

	onClick() {
		const result = this.state.history.slice();
		result.push(Object.values(this.state.userinput));
		this.setState({ userinput: {}, history: result });
	}

	renderHistory(arr, i) {
		return (
			<React.Fragment>
				<p>Guess {i + 1} : <b>{arr}</b> </p>
			</React.Fragment>
		);
	}

	render() {
		return (
			<div>
				<h2> {this.state.code} </h2>
				{this.state.history.map(this.renderHistory)}
				<UserInput value={this.state.userinput} onChange={this.onUserInputChange} />
				<Button label="Check me!" onClick={this.onClick} />
			</div>
		);
	}
}
