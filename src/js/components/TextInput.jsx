import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ControlledTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeWrapper = this.onChangeWrapper.bind(this);

		this.state = {
			htmlID: _.uniqueId(),
		};
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
		} = this.props;

		const inputView = (
			<input
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				id={this.state.htmlID}
				onChange={this.onChangeWrapper}
				/>
		);
		const labelView = label != null ? (
			<label htmlFor={this.state.htmlID}>
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

class UncontrolledTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
		};
		this.onChangeWrapper = this.onChangeWrapper.bind(this);
	}

	onChangeWrapper(newValue, oldValue) {
		const { onChange } = this.props;
		this.setState({ value: newValue }, () => onChange(newValue, oldValue));
	}

	render() {
		const { value } = this.state;
		const { onChangeWrapper } = this;

		const controlledProps = {
			...this.props,
			value,
			onChange: onChangeWrapper,
		};
		return (<ControlledTextInput {...controlledProps} />);
	}
}

UncontrolledTextInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

UncontrolledTextInput.defaultProps = {
	label: null,
	placeholder: null,
	disabled: false,
	value: '',
	onChange: (newValue, oldValue) => console.log(`ControlledTextInput.defaultProps.onChange ${newValue} ${oldValue}`),
};

export {
	ControlledTextInput as Controlled,
	UncontrolledTextInput as Uncontrolled,
};
