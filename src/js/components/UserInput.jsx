import React from 'react';
import PropTypes from 'prop-types';

import { Controlled } from './TextInput';
import { setList } from './logic';
// import Button from './Button';


class UserInput extends React.Component {
	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
		this.isValidNumber = this.isValidNumber.bind(this);
		this.focusTextInput = this.focusTextInput.bind(this);
	}

	onInputChange(nValue, value, name) {
		let newValue = nValue;
		if (!this.isValidNumber(newValue)) {
			console.log(`${newValue} IS NOT A NUMBER IN THE CODE GENERATOR`);
			newValue = undefined;
		} else {
			newValue = String(newValue);
		}
		// newValue = this.isValidNumber(newValue) ? String(newValue) : undefined;
		const oldUserInputValue = this.props.value;
		let newUserInputValue;
		switch (name) {
			case 'i1':
				newUserInputValue = { ...oldUserInputValue, input1: newValue };
				break;
			case 'i2':
				newUserInputValue = { ...oldUserInputValue, input2: newValue };
				break;
			case 'i3':
				newUserInputValue = { ...oldUserInputValue, input3: newValue };
				break;
			case 'i4':
				newUserInputValue = { ...oldUserInputValue, input4: newValue };
				break;
			default: console.log('ERROR');
		}
		this.props.onChange(newUserInputValue, oldUserInputValue);
	}

	// onInput4Change(newValue) {
	// 	newValue = this.isValidNumber(newValue) ? String(newValue) : '';
	// 	const oldUserInputValue = this.props.value;
	// 	const newUserInputValue = {
	// 		input1: oldUserInputValue.input1,
	// 		input2: oldUserInputValue.input2,
	// 		input3: oldUserInputValue.input3,
	// 		input4: newValue,
	// 	};
	// 	this.props.onChange(newUserInputValue, oldUserInputValue);
	// }

	focusTextInput() {
		this.textInput.current.handleFocus();
	}

	isValidNumber(n) {
		const wins = this.props.wins;
		const current = wins < 60 ? (Math.floor(wins / 10)) : 6;
		return n < setList[current].length + 1; // 10 points to type coercion
	}

	render() {
		const value = this.props.value;

		return (
			<div className="userinput">
				<Controlled value={value.input1} name="i1" size="1" onChange={this.onInputChange} inputRef={this.props.inputRef} autoFocus required />
				<Controlled value={value.input2} name="i2" size="1" onChange={this.onInputChange} required />
				<Controlled value={value.input3} name="i3" size="1" onChange={this.onInputChange} required />
				<Controlled value={value.input4} name="i4" size="1" onChange={this.onInputChange} required />
			</div>
		);
	}
}

UserInput.propTypes = {
	value: PropTypes.shape({
		input1: PropTypes.string,
		input2: PropTypes.string,
		input3: PropTypes.string,
		input4: PropTypes.string,
	}),
	inputRef: PropTypes.Object,
	onChange: PropTypes.func,
	wins: PropTypes.number,
};

UserInput.defaultProps = {
	value: {
		input1: null,
		input2: null,
		input3: null,
		input4: null,
	},
	onChange: (newUserInputValue, oldUserInputValue) => console.log('UserInput Change', newUserInputValue, oldUserInputValue),
	wins: 0,
};

export default UserInput;
