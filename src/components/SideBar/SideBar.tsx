/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Radio from '@/components/Radio/Radio';

import { SortMethod } from '@/shared/types';

import ArrowIcon from '@/assets/arrow.svg?react';
import BurgerIcon from '@/assets/burger.svg?react';
import CrossIcon from '@/assets/cross.svg?react';
import LightningIcon from '@/assets/lightning.svg?react';

type SideBarProps = {
	isSideBarOpen: boolean;
	toggleSideBar: () => void;
};

const SideBar = ({ isSideBarOpen, toggleSideBar }: SideBarProps) => {
	const [isStatusItemOpen, setIsStatusItemOpen] = useState<boolean>(false);
	const [isGenderFilterOpen, setIsGenderFilterOpen] = useState<boolean>(false);
	const [isSortFieldOpen, setIsSortFieldOpen] = useState<boolean>(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const filterStatus = searchParams.get('status') ?? '';
	const filterGender = searchParams.get('gender') ?? '';
	const sortMethod: SortMethod = (searchParams.get('sortBy') as SortMethod) ?? '';

	const setUrlParams = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		const value = event.target.value;

		setSearchParams((searchParams) => {
			searchParams.set(name, value);
			return searchParams;
		});
	};

	const clearAllFilters = () => {
		setSearchParams((searchParams) => {
			searchParams.delete('status');
			searchParams.delete('gender');
			searchParams.delete('sortBy');
			return searchParams;
		});
	};
	return (
		<div
			className={`absolute min-[300px]:flex z-20 min-h-screen overflow-y-auto bg-gray-800 transition-transform transform ease-in-out duration-300  flex-col w-64 ${isSideBarOpen ? 'hidden' : '-translate-x-full'}`}
		>
			<div className="flex items-center justify-between h-16 px-6 bg-gray-900">
				<span className="text-white font-bold uppercase">Filters</span>

				<button
					className="p-1 rounded-lg focus:outline-none focus:ring"
					onClick={toggleSideBar}
				>
					<CrossIcon className="h-6 w-6" />
				</button>
			</div>
			<div className="flex flex-col flex-1 overflow-y-auto">
				<nav className="flex-1 px-2 py-4 bg-gray-800">
					<a className="flex items-center duration-300 px-4 py-2 text-gray-100 hover:bg-gray-700">
						<BurgerIcon className="h-6 w-6 mr-2" />
						<div
							className="flex justify-between w-full items-center"
							onClick={() => setIsStatusItemOpen((prev) => !prev)}
						>
							Status
							<span
								className={`text-sm ${isStatusItemOpen ? 'rotate-180' : ''}`}
								id="arrow"
							>
								<ArrowIcon className="transform rotate-180" />
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
								currentValue={filterStatus}
								title="Alive"
								onChange={setUrlParams}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="status"
								value="dead"
								title="Dead"
								currentValue={filterStatus}
								onChange={setUrlParams}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="status"
								value="unknown"
								title="Uknown"
								currentValue={filterStatus}
								onChange={setUrlParams}
							/>
						</li>
					</ul>
					<a
						className="flex items-center duration-300 px-4 py-2 text-gray-100 hover:bg-gray-700"
						onClick={() => setIsSortFieldOpen((prev) => !prev)}
					>
						<CrossIcon className="h-6 w-6 mr-2" />
						<div className="flex justify-between w-full items-center">
							Sort By
							<span
								className={`text-sm ${isSortFieldOpen ? 'rotate-180' : ''}`}
								id="arrow"
							>
								<ArrowIcon className="transform rotate-180" />
							</span>
						</div>
					</a>
					<ul
						className={`text-left flex flex-col text-sm mt-2 w-4/5 mx-auto pl-4 text-gray-200 font-bold ${isSortFieldOpen ? '' : 'hidden'}`}
					>
						<li className="mb-2 inline-block">
							<Radio
								name="sortBy"
								id="sortGender"
								value="gender"
								currentValue={sortMethod}
								title="Gender"
								onChange={setUrlParams}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="sortBy"
								id="sortStatus"
								value="status"
								title="Status"
								currentValue={sortMethod}
								onChange={setUrlParams}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="sortBy"
								id="sortLocation"
								value="location"
								title="Location"
								currentValue={sortMethod}
								onChange={setUrlParams}
							/>
						</li>
					</ul>
					<a
						className="flex items-center duration-300 px-4 py-2 text-gray-100 hover:bg-gray-700"
						onClick={() => setIsGenderFilterOpen((prev) => !prev)}
					>
						<CrossIcon className="h-6 w-6 mr-2" />
						<div className="flex justify-between w-full items-center">
							Gender
							<span
								className={`text-sm ${isGenderFilterOpen ? 'rotate-180' : ''}`}
								id="arrow"
							>
								<ArrowIcon className="transform rotate-180" />
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
								currentValue={filterGender}
								title="Female"
								onChange={setUrlParams}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="gender"
								value="male"
								title="Male"
								currentValue={filterGender}
								onChange={setUrlParams}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="gender"
								value="genderless"
								title="Genderless"
								currentValue={filterGender}
								onChange={setUrlParams}
							/>
						</li>
						<li className="mb-2 inline-block">
							<Radio
								name="gender"
								id="genderUnknown"
								value="unknown"
								title="Unknown"
								currentValue={filterGender}
								onChange={setUrlParams}
							/>
						</li>
					</ul>
					<a
						className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
						onClick={clearAllFilters}
					>
						<LightningIcon className="h-6 w-6 mr-2" />
						Clear All
					</a>
				</nav>
			</div>
		</div>
	);
};

export default SideBar;
