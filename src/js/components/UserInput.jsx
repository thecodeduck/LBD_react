import React from 'react';
import PropTypes from 'prop-types';

import { Controlled } from './TextInput';
import Button from './Button';
import { set0 } from './logic';

const isValidNumber = (number) => set0.has(number);

class UserInput extends React.Component {
	constructor(props) {
		super(props);

		this.onInput1Change = this.onInput1Change.bind(this);
		this.onInput2Change = this.onInput2Change.bind(this);
		this.onInput3Change = this.onInput3Change.bind(this);
		this.onInput4Change = this.onInput4Change.bind(this);
	}

	onInput1Change(newValue) {
		newValue = isValidNumber(newValue) ? String(newValue) : '';
		const oldUserInputValue = this.props.value;
		const newUserInputValue = {
			input1: newValue,
			input2: oldUserInputValue.input2,
			input3: oldUserInputValue.input3,
			input4: oldUserInputValue.input4,
		};
		this.props.onChange(newUserInputValue, oldUserInputValue);
	}

	onInput2Change(newValue) {
		newValue = isValidNumber(newValue) ? String(newValue) : '';
		const oldUserInputValue = this.props.value;
		const newUserInputValue = {
			input1: oldUserInputValue.input1,
			input2: newValue,
			input3: oldUserInputValue.input3,
			input4: oldUserInputValue.input4,
		};
		this.props.onChange(newUserInputValue, oldUserInputValue);
	}
	onInput3Change(newValue) {
		newValue = isValidNumber(newValue) ? String(newValue) : '';
		const oldUserInputValue = this.props.value;
		const newUserInputValue = {
			input1: oldUserInputValue.input1,
			input2: oldUserInputValue.input2,
			input3: newValue,
			input4: oldUserInputValue.input4,
		};
		this.props.onChange(newUserInputValue, oldUserInputValue);
	}
	onInput4Change(newValue) {
		newValue = isValidNumber(newValue) ? String(newValue) : '';
		const oldUserInputValue = this.props.value;
		const newUserInputValue = {
			input1: oldUserInputValue.input1,
			input2: oldUserInputValue.input2,
			input3: oldUserInputValue.input3,
			input4: newValue,
		};
		this.props.onChange(newUserInputValue, oldUserInputValue);
	}

	render() {
		const value = this.props.value;

		return (
			<div>
				<Controlled value={value.input1} onChange={this.onInput1Change} />
				<Controlled value={value.input2} onChange={this.onInput2Change} />
				<Controlled value={value.input3} onChange={this.onInput3Change} />
				<Controlled value={value.input4} onChange={this.onInput4Change} />
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
	onChange: PropTypes.func,
};

UserInput.defaultProps = {
	value: {
		input1: null,
		input2: null,
		input3: null,
		input4: null,
	},
	onChange: (newUserInputValue, oldUserInputValue) => console.log('UserInput Change', newUserInputValue, oldUserInputValue),
};

export default UserInput;
