import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Radio from '@/components/Radio/Radio';

type SideBarProps = {
	isSideBarOpen: boolean;
	toggleSideBar: () => void;
};

const SideBar = ({ isSideBarOpen, toggleSideBar }: SideBarProps) => {
	const [isStatusItemOpen, setIsStatusItemOpen] = useState<boolean>(false);
	const [isGenderFilterOpen, setIsGenderFilterOpen] = useState<boolean>(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentStatus, setCurrentStatus] = useState<string>(
		searchParams.get('status') || '',
	);
	const [gender, setGender] = useState<string>(searchParams.get('gender') || '');

	useEffect(() => {
		setSearchParams((searchParams) => {
			if (currentStatus === '') {
				searchParams.delete('status');
			}
			if (gender === '') {
				searchParams.delete('gender');
			}
			return searchParams;
		});
	}, [currentStatus, gender, setSearchParams]);

	useEffect(() => {
		setSearchParams((searchParams) => {
			gender && searchParams.set('gender', gender);
			currentStatus && searchParams.set('status', currentStatus);
			return searchParams;
		});
	}, [gender, currentStatus, setSearchParams]);

	const onStatusChange = (value: string): void => {
		setCurrentStatus(value);
	};

	const onGenderChange = (value: string): void => {
		setGender(value);
	};

	const clearAllFilters = () => {
		setSearchParams((searchParams) => {
			searchParams.delete('status');
			searchParams.delete('gender');
			return searchParams;
		});

		setCurrentStatus('');
		setGender('');
	};
	return (
		<div
			className={`absolute z-20 min-h-screen overflow-y-auto bg-gray-800 transition-transform transform ease-in-out duration-300 md:flex flex-col w-64 ${isSideBarOpen ? '-translate-x-full' : 'hidden'}`}
		>
			<div className="flex items-center justify-between h-16 px-6 bg-gray-900">
				<span className="text-white font-bold uppercase">Filters</span>

				<button
					className="p-1 rounded-lg focus:outline-none focus:ring"
					onClick={toggleSideBar}
				>
					<svg
						className="w-6 h-6"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div className="flex flex-col flex-1 overflow-y-auto">
				<nav className="flex-1 px-2 py-4 bg-gray-800">
					<a className="flex items-center duration-300 px-4 py-2 text-gray-100 hover:bg-gray-700">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
						<div
							className="flex justify-between w-full items-center"
							onClick={() => setIsStatusItemOpen((prev) => !prev)}
						>
							Status
							<span
								className={`text-sm ${isStatusItemOpen ? 'rotate-180' : ''}`}
								id="arrow"
							>
								<svg
									id="icon1"
									className="transform rotate-180"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18 15L12 9L6 15"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</span>
						</div>
					</a>
					<ul
						className={`text-left flex flex-col text-sm mt-2 w-4/5 mx-auto pl-4 text-gray-200 font-bold ${isStatusItemOpen ? '' : 'hidden'}`}
					>
						<li className="mb-2 inline-block">
							<Radio
								name="status"
								value="alive"
								currentValue={currentStatus}
								title="Alive"
								onChange={onStatusChange}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="status"
								value="dead"
								title="Dead"
								currentValue={currentStatus}
								onChange={onStatusChange}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="status"
								value="unknown"
								title="Uknown"
								currentValue={currentStatus}
								onChange={onStatusChange}
							/>
						</li>
					</ul>
					<a
						className="flex items-center duration-300 px-4 py-2 text-gray-100 hover:bg-gray-700"
						onClick={() => setIsGenderFilterOpen((prev) => !prev)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
						<div className="flex justify-between w-full items-center">
							Gender
							<span
								className={`text-sm ${isGenderFilterOpen ? 'rotate-180' : ''}`}
								id="arrow"
							>
								<svg
									id="icon1"
									className="transform rotate-180"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18 15L12 9L6 15"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</span>
						</div>
					</a>
					<ul
						className={`text-left flex flex-col text-sm mt-2 w-4/5 mx-auto pl-4 text-gray-200 font-bold ${isGenderFilterOpen ? '' : 'hidden'}`}
					>
						<li className="mb-2 inline-block">
							<Radio
								name="gender"
								value="female"
								currentValue={gender}
								title="Female"
								onChange={onGenderChange}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="gender"
								value="male"
								title="Male"
								currentValue={gender}
								onChange={onGenderChange}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="gender"
								value="genderless"
								title="Genderless"
								currentValue={gender}
								onChange={onGenderChange}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="gender"
								id="genderUnknown"
								value="unknown"
								title="Unknown"
								currentValue={gender}
								onChange={onGenderChange}
							/>
						</li>
					</ul>
					<a
						className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
						onClick={clearAllFilters}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						Clear All
					</a>
				</nav>
			</div>
		</div>
	);
};

export default SideBar;
