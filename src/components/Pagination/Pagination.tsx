/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ArrowIcon from '@/assets/arrow.svg?react';

type PaginationProps = {
	pageQuantity: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
};
const Pagination = ({ pageQuantity, currentPage, setCurrentPage }: PaginationProps) => {
	const [, setSearchParams] = useSearchParams();
	const limit = 10;

	useEffect(() => {
		if (currentPage === 1) {
			setSearchParams((searchParams) => {
				searchParams.delete('page');
				return searchParams;
			});
			return;
		}
		setSearchParams((searchParams) => {
			searchParams.set('page', currentPage.toString());
			return searchParams;
		});
	}, [currentPage, setSearchParams]);

	const pages = Array(limit)
		.fill(0)
		.map((_, index) => index + currentPage);

	function next() {
		setCurrentPage(currentPage + 1);
	}
	function back() {
		setCurrentPage(currentPage - 1);
	}
	return (
		<div className="flex justify-center w-full gap-x-4 bg-white rounded-lg pb-4 ">
			<button
				onClick={back}
				className="h-12 border-2 border-r-0 border-indigo-600 hover:text-white
               px-4 rounded-l-lg hover:bg-indigo-600  disabled:bg-gray-200"
				disabled={currentPage === 1}
			>
				<ArrowIcon className="transform -rotate-90 stroke-black" />
			</button>
			{pages.map((item, i) => (
				<button
					key={i}
					onClick={() => setCurrentPage(item)}
					className={`h-12 border-2 border-r-0 border-indigo-600  hover:text-white hover:bg-indigo-600 w-12 ${currentPage === item && 'bg-indigo-600 text-white'}`}
				>
					{item}
				</button>
			))}
			<button
				onClick={next}
				className="h-12 border-2  border-indigo-600 hover:text-white
               px-4 rounded-r-lg hover:bg-indigo-600  disabled:bg-gray-200 "
				disabled={currentPage === pageQuantity}
			>
				<ArrowIcon className="transform rotate-90" />
			</button>
		</div>
	);
};

export default Pagination;
