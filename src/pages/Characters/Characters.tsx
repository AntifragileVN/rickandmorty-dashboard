import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCharacters } from 'rickmortyapi';

import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';

import { Character, SortMethod } from '@/shared/types';

import { sortCharacters } from '@/utils/sortCharacters/sortCharacters';

import CharacterCard from './CharacterCard/CharacterCard';
import CharactersList from './CharactersList/CharactersList';

type Query = {
	page: number;
	gender?: string;
	status?: string;
	name?: string;
};

const Characters = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [charactersData, setCharactersData] = useState<Character[]>([]);
	const [characterInfo, setCharacterInfo] = useState<Character | null>(null);
	const [searchParams] = useSearchParams();

	const searchedPage = searchParams.get('page') ?? '1';
	const searchedCharacter = searchParams.get('character') ?? '';
	const filterStatus = searchParams.get('status') ?? '';
	const filterGender = searchParams.get('gender') ?? '';
	const sortMethod: SortMethod = (searchParams.get('sortBy') as SortMethod) ?? '';

	const [currentPage, setCurrentPage] = useState<number>(parseInt(searchedPage ?? '1'));

	useEffect(() => {
		const page = searchParams.get('page') ?? '1';
		console.log(page);
		setCurrentPage(parseInt(page, 10));
	}, [searchParams]);

	// useEffect(() => {
	// 	console.log('curPage', currentPage);
	// }, [currentPage]);

	const [pagesQuantity, setPagesQuantity] = useState<number>(0);
	console.log(pagesQuantity);

	const getQueryFn = useCallback(() => {
		const query: Query = {
			page: currentPage,
		};

		if (searchedCharacter) {
			query.name = searchedCharacter;
		}
		if (filterGender) {
			query.gender = filterGender;
		}
		if (filterStatus) {
			query.status = filterStatus;
		}

		return getCharacters(query);
	}, [searchedCharacter, filterGender, filterStatus, currentPage]);

	const { data, isError } = useQuery({
		queryKey: [
			'characters',
			searchedCharacter,
			filterGender,
			filterStatus,
			currentPage,
		],
		queryFn: getQueryFn,
	});

	useEffect(() => {
		if (data?.data?.results) {
			setCharactersData(data.data.results);
		}
	}, [data]);

	useEffect(() => {
		if (data?.data?.info?.pages) {
			setPagesQuantity(data?.data?.info?.pages);
		}
	}, [data, pagesQuantity]);

	useEffect(() => {
		if (charactersData && sortMethod) {
			const sortedCharacters = sortCharacters(sortMethod, charactersData);
			setCharactersData(sortedCharacters);
		}
	}, [charactersData, sortMethod]);

	const onCloseModal = () => {
		setShowModal(false);
	};

	const onCharacterItemClick = (character: Character): void => {
		setCharacterInfo(character);
		setShowModal(true);
	};

	return (
		<div className="w-full pt-16 max-w-[1400px] mx-auto items-center ">
			{data?.status === 404 ? (
				<div className=" mt-4 text-center text-lg font-medium">
					There is no such character
				</div>
			) : null}
			{data?.status === 404 ? (
				<div className=" mt-4 text-center text-lg font-medium">
					Something went wrong
				</div>
			) : null}
			<div className="bg-white w-full">
				{data?.data?.results ? (
					<>
						<CharactersList
							characters={data?.data?.results}
							onCharacterItemClick={onCharacterItemClick}
						/>

						{pagesQuantity !== 0 ? (
							<Pagination
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								pageQuantity={pagesQuantity}
							/>
						) : null}
					</>
				) : null}
				{showModal && characterInfo ? (
					<Modal onClose={onCloseModal}>
						<CharacterCard characterInfo={characterInfo} />
					</Modal>
				) : null}
			</div>
		</div>
	);
};

export default Characters;
