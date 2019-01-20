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
		this.onChange = this.onChange.bind(this);
	}

	onChange(newUserInput) {
		this.setState({ userinput: newUserInput });
		console.log('onChange newUserInput', newUserInput);
	}

	onClick() {
		console.log('click!');
		this.state.history.push(this.state.userinput);
	}

	render() {
		return (
			<div>
				<h2> {this.state.code} </h2>
				<h2> {this.state.history} </h2>
				<UserInput value={this.state.userinput} onChange={this.onChange} />
				<Button label="Check me!" onClick={this.onClick} />
			</div>
		);
	}
}
