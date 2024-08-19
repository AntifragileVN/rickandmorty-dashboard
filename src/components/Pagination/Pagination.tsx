import { useSearchParams } from 'react-router-dom';

import ArrowIcon from '@/assets/arrow.svg?react';

import c from './Pagination.module.scss';

type PaginationProps = {
	pageQuantity: number;
	currentPage: number;
};

const Pagination = ({ pageQuantity, currentPage }: PaginationProps) => {
	const pageLimit = 10;
	const [, setSearchParams] = useSearchParams();
	const pages = Array(pageQuantity >= pageLimit ? pageLimit : pageQuantity)
		.fill(0)
		.map((_, index) => {
			if (currentPage >= pageLimit / 2) {
				return currentPage - pageLimit / 2 + index;
			}

			return index + 1;
		});
	const setPageParam = (value: number) => {
		setSearchParams((searchParams) => {
			searchParams.set('page', value.toString());
			return searchParams;
		});
	};

	function next() {
		setPageParam(currentPage + 1);
	}

	function back() {
		setPageParam(currentPage - 1);
	}

	const onPaginationClick = (value: number) => {
		setPageParam(value);
	};

	return (
		<div className="flex justify-center flex-wrap align-middle w-full gap-x-4 bg-white dark:bg-black rounded-lg py-2 ">
			<button onClick={back} className={c.arrowBtn} disabled={currentPage === 1}>
				<ArrowIcon className="transform -rotate-90 stroke-black" />
			</button>
			{pages.map((item, i) => (
				<button
					key={i}
					onClick={() => onPaginationClick(item)}
					className={`h-12 border-2 border-r-0 border-indigo-600  hover:text-white hover:bg-indigo-600 w-12 ${currentPage === item && 'bg-indigo-600 text-white'}`}
				>
					{item}
				</button>
			))}
			<button
				onClick={next}
				className={c.arrowBtn}
				disabled={currentPage === pageQuantity}
			>
				<ArrowIcon className="transform rotate-90" />
			</button>
		</div>
	);
};

export default Pagination;
