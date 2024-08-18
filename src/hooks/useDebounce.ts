import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500): T => {
	const [debounceValue, setDebounceValue] = useState<T>(value);

	useEffect(() => {
		console.log('Debounce Start');
		const id = setTimeout(() => {
			setDebounceValue(value), value;
		}, delay);
		return () => {
			console.log('Debounce ENd');
			clearTimeout(id);
		};
	}, [value, delay]);

	return debounceValue;
};

export default useDebounce;
