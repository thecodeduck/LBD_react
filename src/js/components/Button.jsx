import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { props } = this;
		const {
			label,
			type,
			name,
			onClick,
		} = props;

		const clickWrapper = (evt) => onClick(name);

		return (
			<button type={type} onClick={clickWrapper} name={name}>
				<p>{ label }</p>
			</button>
		);
	}
}

Button.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	label: 'Default Label',
	name: 'Default Name',
	type: 'button',
	onClick: (...args) => {
		console.log('button.defaultProps.onClick', args);
	},
};

export default Button;
