import React from 'react';
import PropTypes from 'prop-types';

class ControlledTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeWrapper = this.onChangeWrapper.bind(this);
	}
	onChangeWrapper(event) {
		const { onChange, value } = this.props;
		onChange(event.target.value, value);
	}

	render() {
		const {
			label,
			placeholder,
			disabled,
			value,
			id,
		} = this.props;

		const inputView = (
			<input
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				id={id}
				onChange={this.onChangeWrapper}
				/>
		);
		const labelView = label != null ? (
			<label htmlFor={id}>
				{ label }
			</label>) : null;
		return (
			<React.Fragment>
				{labelView}
				{inputView}
			</React.Fragment>
		);
	}
}

ControlledTextInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

ControlledTextInput.defaultProps = {
	label: null,
	placeholder: null,
	disabled: false,
	value: '',
	onChange: (newValue, oldValue) => console.log(`ControlledTextInput.defaultProps.onChange ${newValue} ${oldValue}`),
};
