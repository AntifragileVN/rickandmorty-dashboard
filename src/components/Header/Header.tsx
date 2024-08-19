import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useDebounce from '@/hooks/useDebounce';

import BurgerIcon from '@/assets/burger.svg?react';

type HeaderProps = {
	toggleSideBar: () => void;
};

const Header = ({ toggleSideBar }: HeaderProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [character, setCharacter] = useState(searchParams.get('character') ?? '');
	const debouncedCharacter = useDebounce(character, 500);

	useEffect(() => {
		setSearchParams((searchParams) => {
			searchParams.set('page', '1');

			if (debouncedCharacter.length === 0) {
				searchParams.delete('character');
			} else {
				searchParams.set('character', debouncedCharacter);
			}
			return searchParams;
		});
	}, [debouncedCharacter, setSearchParams]);

	const onSearchCharacterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const character = e.target.value.trim();
		setCharacter(character);
	};

	return (
		<div className=" sm:px-0 dark:bg-gray-950 dark:border-gray-600 flex h-16 fixed justify-start z-10 w-full py-2 bg-white border-b border-gray-200">
			<div className="container mx-auto px-4 flex max-w-[1400px]  w-full justify-start items-center">
				<button
					onClick={toggleSideBar}
					className="text-gray-500 focus:outline-none focus:text-gray-700"
				>
					<BurgerIcon className="h-6 w-6" />
				</button>
				<input
					className="mx-4 w-full max-w-[500px] border rounded-md px-4 py-2"
					type="text"
					placeholder="Search"
					value={character}
					onChange={onSearchCharacterChange}
				/>
			</div>
		</div>
	);
};

export default Header;
