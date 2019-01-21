import React from 'react';

import Button from './Button';
import { code, checkCode } from './logic';


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
	}

	onUserInputChange(newUserInput) {
		this.setState({ userinput: newUserInput });
		console.log('onChange newUserInput', newUserInput);
	}

	onClick() {
		const result = this.state.history.slice();
		const current = [];
		current.push(Object.values(this.state.userinput));
		current.push(' ');
		current.push(checkCode(this.state.userinput, code));
		result.push(current);
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
