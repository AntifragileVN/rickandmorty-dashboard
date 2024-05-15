type RadioProps = {
	id?: string;
	name: string;
	title: string;
	value: string;
	currentValue: string;
	onChange: (value: string) => void;
};

const Radio = ({
	id,
	currentValue,
	name,
	title,
	value,
	onChange,
	...rest
}: RadioProps) => {
	return (
		<div className="flex gap-2 items-start">
			<div className="grid place-items-center mt-1">
				<input
					type="radio"
					id={id ? id : value}
					name={name}
					checked={currentValue === value}
					className=" peer col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-blue-500 rounded-full focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-400 disabled:border-gray-400"
					onChange={() => onChange(value)}
					value={value}
					{...rest}
				/>
				<div
					className={
						'pointer-events-none col-start-1 row-start-1 w-2 h-2 rounded-full peer-checked:bg-blue-500 peer-checked:peer-disabled:bg-gray-400'
					}
				/>
			</div>
			<label htmlFor={id ? id : value}>{title}</label>
		</div>
	);
};

export default Radio;
