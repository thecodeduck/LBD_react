import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


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
			submitNotValid: true,
		};
		this.textInput = React.createRef();
		this.onCheckClick = this.onCheckClick.bind(this);
		this.onUserInputChange = this.onUserInputChange.bind(this);
	}

	onUserInputChange(newUserInput) {
		const test = _.values(newUserInput);
		this.setState({ userinput: newUserInput });
		if (_.every(test, (n) => typeof n === 'string' && n !== '')) {
			this.setState({ submitNotValid: false });
		} else { this.setState({ submitNotValid: true }); }
		console.log('onChange newUserInput', newUserInput);
	}

	onCheckClick() {
		let result = this.state.history.slice();
		const current = [];
		current.push.apply(current, [ Object.values(this.state.userinput), ' ', checkCode(this.state.userinput, this.state.code) ]);
		result.push(current);
		if (current[2] === 'HURRAY') {
			this.setState({ code: genCode(setList), wins: this.state.wins + 1 });
			result = [];
		}
		this.setState({ userinput: {}, history: result, submitNotValid: true });
		this.textInput.current.focus();
	}

	renderHistory(arr, i) {
		return (
			<React.Fragment>
				<p>guess {i + 1} : <b>{arr}</b> </p>
			</React.Fragment>
		);
	}

	render() {
		return (
			<div className="card">
				<h2 className="wins"> WINS: {this.state.wins} </h2>
				<p> The 4-digit code <br /> contains numbers: {setList[this.state.wins < 60 ? (Math.floor(this.state.wins / 10)) : 6]} </p>
					<div className="about">
						<p>	■ Right Number & Right Placement </p>
						<p>	□ Right Number & Wrong Placement </p>
					</div>
				<section className="history">
					{this.state.history.map(this.renderHistory)}
				</section>
				<form className="userinputForm">
					<UserInput value={this.state.userinput} onChange={this.onUserInputChange} wins={this.state.wins} inputRef={this.textInput} />
					<Button label="CHECK" onClick={this.onCheckClick} disabled={this.state.submitNotValid} />
				</form>
			</div>
		);
	}
}
