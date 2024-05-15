import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
	currentPage: number;
	setCurrentPage: (page: number) => void;
};
const Pagination = ({ currentPage, setCurrentPage }: PaginationProps) => {
	const [num, setNum] = useState(1);
	const [, setSearchParams] = useSearchParams();

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

	const pages = [
		{ page: num },
		{ page: num + 1 },
		{ page: num + 2 },
		{ page: num + 3 },
	];

	function next() {
		setNum(num + 1);
	}
	function back() {
		num > 1 && setNum(num - 1);
	}
	return (
		<div className="flex justify-center w-full gap-x-4 bg-white rounded-lg pb-4 ">
			<button
				onClick={back}
				className="h-12 border-2 border-r-0 border-indigo-600
               px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white"
			>
				<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
					<path
						d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					></path>
				</svg>
			</button>
			{pages.map((pg, i) => (
				<button
					key={i}
					onClick={() => setCurrentPage(pg.page)}
					className={`h-12 border-2 border-r-0 border-indigo-600
               w-12 ${currentPage === pg.page && 'bg-indigo-600 text-white'}`}
				>
					{pg.page}
				</button>
			))}
			<button
				onClick={next}
				className="h-12 border-2  border-indigo-600
               px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white"
			>
				<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
					<path
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					></path>
				</svg>
			</button>
		</div>
	);
};

export default Pagination;
