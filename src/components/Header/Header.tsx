import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
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
