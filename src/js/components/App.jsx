import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { connect } from 'react-redux';

import Button from './Button';
import { setList, genCode, checkCode } from './logic';
import { updateWins, resetWins } from '../actions/gameAction';

// const UserInput = require('./UserInput').default;
import { Controlled } from './TextInput';
// import Controlled from './Textinput.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userinput: [],
			history: [],
			code: genCode(setList),
			submitNotValid: true,
		};
		this.textInput = React.createRef();
		this.onCheckClick = this.onCheckClick.bind(this);
		this.onUserInputChange = this.onUserInputChange.bind(this);
		this.onUpdateWins = this.onUpdateWins.bind(this);
		this.onResetWins = this.onResetWins.bind(this);
	}

	onUserInputChange(newUserInput) {
		const test = _.values(newUserInput);
		this.setState({ userinput: newUserInput });
		if (newUserInput.length === 4 && _.every(test, (n) => typeof n === 'string' && n !== '')) {
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
			this.setState({ code: genCode(setList) });
			this.onUpdateWins();
			result = [];
		}
		this.setState({ userinput: [], history: result, submitNotValid: true });
	}

	renderHistory(arr, i) {
		return (
			<React.Fragment>
				<p>guess {i + 1} : <b>{arr}</b> </p>
			</React.Fragment>
		);
	}


	onUpdateWins(evt) {
		//eslint-disable-next-line
		this.props.onUpdateWins(evt);
	}
	onResetWins(evt) {
		//eslint-disable-next-line
		this.props.onResetWins(evt);
	}

	render() {
		return (
			<React.Fragment>
				<div>{this.props.code}</div>
				<button className="custom" onClick={this.onUpdateWins}>TEST</button>
				<button className="custom" onClick={this.onResetWins}>RESET</button>
				<div className="card">
					<h2 className="wins"> WINS: {this.props.wins} </h2>
					<p> Guess a 4-digit code <br /> containing the numbers: {setList[this.props.wins < 60 ? (Math.floor(this.props.wins / 10)) : 6]} </p>
					<div className="about">
						<p>	■ Right Number & Right Placement </p>
						<p>	□ Right Number & Wrong Placement </p>
					</div>
					<section className="history">
						{this.state.history.map(this.renderHistory)}
					</section>
					<form className="userinputForm">
						<Controlled className="custom" maxlength="4" placeholder="" value={this.state.userinput} onChange={this.onUserInputChange} wins={this.state.wins} inputRef={this.textInput} />
						<Button label="CHECK" onClick={this.onCheckClick} disabled={this.state.submitNotValid} />
					</form>
				</div>
				<footer className="header">
					<a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)">Mastermind</a> by <a href="https://twitter.com/thecodeduck">@thecodeduck</a>
				</footer>

			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	wins: state.wins,
	code: state.code,
});

const mapActionsToProps = {
	onUpdateWins: updateWins,
	onResetWins: resetWins,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
