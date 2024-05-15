import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCharacters } from 'rickmortyapi';

import Modal from '@/components/Modal/Modal';

import { Character } from '@/shared/types';

import CharacterCard from './CharacterCard/CharacterCard';
import CharactersList from './CharactersList/CharactersList';

type Query = {
	currentPage: number;
	gender?: string;
	status?: string;
	name?: string;
};

const Characters = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [characterInfo, setCharacterInfo] = useState<Character | null>(null);
	const [searchParams] = useSearchParams();
	const searchedCharacter = searchParams.get('character') ?? '';
	const filterStatus = searchParams.get('status') ?? '';
	const filterGender = searchParams.get('gender') ?? '';

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pagesCount, setPagesCount] = useState<number>(1);

	const getQueryFn = useCallback(() => {
		const query: Query = {
			currentPage,
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
		if (data?.data?.info?.pages) {
			setPagesCount(data?.data?.info?.pages);
		}
		console.log(pagesCount);
	}, [data, pagesCount]);

	const onCloseModal = () => {
		setShowModal(false);
	};

	const onCharacterItemClick = (character: Character): void => {
		setCharacterInfo(character);
		setShowModal(true);
	};

	return (
		<div className="w-full max-w-[1400px] mx-auto md:items-center ">
			<div className="bg-white w-full">
				{data?.data?.results ? (
					<CharactersList
						characters={data?.data?.results}
						onCharacterItemClick={onCharacterItemClick}
					/>
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
