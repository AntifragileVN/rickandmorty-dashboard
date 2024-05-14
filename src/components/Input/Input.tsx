import React, { FC } from 'react';

type InputProps = {
	id: string;
	label: string;
};

const Input: FC<InputProps> = ({ id, label, ...rest }: InputProps) => {
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input type="text" id={id} {...rest} />
		</div>
	);
};

export default Input;
