/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BurgerIcon from '@/assets/burger.svg?react';

type HeaderProps = {
	toggleSideBar: () => void;
};

const Header = ({ toggleSideBar }: HeaderProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [character, setCharacter] = useState<string>(
		searchParams.get('character') || '',
	);

	useEffect(() => {
		if (character === '') {
			setSearchParams((searchParams) => {
				searchParams.delete('character');
				return searchParams;
			});
			return;
		}
		setSearchParams((searchParams) => {
			searchParams.set('character', character);
			return searchParams;
		});
	}, [character, setSearchParams]);

	return (
		<div className="flex h-16 fixed justify-start z-10 w-full py-2 bg-white border-b border-gray-200">
			<div className="flex max-w-[1400px] mx-auto w-full justify-start items-center  px-4">
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
					onChange={(e) => setCharacter(e.target.value.trim())}
				/>
			</div>
		</div>
	);
};

export default Header;
