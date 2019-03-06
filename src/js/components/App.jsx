import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { connect } from 'react-redux';

import Button from './Button';
import { setList, checkCode } from './logic';
import { submitGuess, resetGame } from '../actions/userAction';

// const UserInput = require('./UserInput').default;
import { Controlled } from './TextInput';
// import Controlled from './Textinput.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: [],
			submitNotValid: true,
		};
		this.textInput = React.createRef();
		this.onCheckClick = this.onCheckClick.bind(this);
		this.onUserInputChange = this.onUserInputChange.bind(this);
		this.onUpdateWins = this.onUpdateWins.bind(this);
		this.onResetGame = this.onResetGame.bind(this);
	}

	onUserInputChange(newUserInput) {
		const test = _.values(newUserInput);
		this.setState({ userInput: newUserInput });
		if (newUserInput.length === 4 && _.every(test, (n) => typeof n === 'string' && n !== '')) {
			this.setState({ submitNotValid: false });
		} else { this.setState({ submitNotValid: true }); }
		console.log('onChange newUserInput', newUserInput);
	}

	onCheckClick() {
		this.setState({ userInput: [], submitNotValid: true });
		console.log('Click Check', this.state.userInput);
		this.props.submitGuess(this.state.userInput);
	}

	onUpdateWins(evt) {
		//eslint-disable-next-line
		this.props.onUpdateWins(evt);
	}
	onResetGame(evt) {
		//eslint-disable-next-line
		this.props.onResetGame(evt);
	}

	renderHistory(arr, i)	 {
		return (
			<React.Fragment>
				<p>guess {i + 1} : <b>{arr}</b> </p>
			</React.Fragment>
		);
	}

	render() {
		return (
			<React.Fragment>
				<div>{this.props.code}</div>
				<button className="custom" onClick={this.onUpdateWins}>TEST</button>
				<button className="custom" onClick={this.onResetGame}>RESET</button>
				<div className="card">
					<h2 className="wins"> WINS: {this.props.wins} </h2>
					<p> Guess a 4-digit code <br /> containing the numbers: {setList[this.props.wins < 30 ? (Math.floor(this.props.wins / 10)) : 3]} </p>
					<div className="about">
						<p>	■ Right Number & Right Placement </p>
						<p>	□ Right Number & Wrong Placement </p>
					</div>
					<section className="history">
						{this.props.history.map(this.renderHistory)}
					</section>
					<form className="userInputForm">
						<Controlled className="custom" maxlength="4" placeholder="" value={this.state.userInput} onChange={this.onUserInputChange} wins={this.state.wins} inputRef={this.textInput} />
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

const mapStateToProps = (state) => ({
	wins: state.wins,
	code: state.code,
	history: state.history,
});

const mapActionsToProps = {
	onResetGame: resetGame,
	submitGuess,
};

App.propTypes = {
	wins: PropTypes.number,
	code: PropTypes.arrayOf(PropTypes.string),
	history: PropTypes.arrayOf(PropTypes.string),
	submitGuess: PropTypes.func,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
