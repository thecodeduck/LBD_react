import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import { setList, genCode, checkCode } from './logic';


// const UserInput = require('./UserInput').default;
import UserInput from './UserInput';
// import Controlled from './Textinput.jsx';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userinput: {},
			history: [],
			wins: 0,
			code: genCode(setList),
		};
		this.textInput = React.createRef();
		this.onCheckClick = this.onCheckClick.bind(this);
		this.onUserInputChange = this.onUserInputChange.bind(this);
	}

	onUserInputChange(newUserInput) {
		this.setState({ userinput: newUserInput });
		console.log('onChange newUserInput', newUserInput);
	}

	onCheckClick() {
		const result = this.state.history.slice();
		let current = [];
		current.push(Object.values(this.state.userinput));
		current.push(' ');
		current.push(checkCode(this.state.userinput, this.state.code));
		if (current[2] === 'HURRAY') {
			this.setState({ code: genCode(setList), wins: this.state.wins + 1 });
		}
		result.push(current);
		this.setState({ userinput: {}, history: result });
		this.textInput.focus();
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
				<h2> Your number choices are: {setList[this.state.wins < 60 ? (Math.floor(this.state.wins / 10)) : 6]} </h2>
					<h2> {this.state.code} </h2>
					<h2> Wins: {this.state.wins} </h2>
				{this.state.history.map(this.renderHistory)}
				<UserInput value={this.state.userinput} onChange={this.onUserInputChange} wins={this.state.wins} ref={this.textInputTop} />
					<Button label="Check me!" onClick={this.onCheckClick} />
			</div>
		);
	}
}
