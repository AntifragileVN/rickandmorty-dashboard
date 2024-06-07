import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';

import { useGetCharacters } from '@/hooks/useGetCharacters';

import { Character, SortMethod } from '@/shared/types';

import CharacterCard from './CharacterCard/CharacterCard';
import CharactersList from './CharactersList/CharactersList';

const Characters = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [characterInfo, setCharacterInfo] = useState<Character | null>(null);
	const [searchParams] = useSearchParams();

	const searchedPage = searchParams.get('page') ?? '1';
	const searchedCharacter = searchParams.get('character') ?? '';
	const filterStatus = searchParams.get('status') ?? '';
	const filterGender = searchParams.get('gender') ?? '';
	const sortMethod: SortMethod = (searchParams.get('sortBy') as SortMethod) ?? '';

	const { data, isLoading } = useGetCharacters({
		page: parseInt(searchedPage),
		gender: filterGender,
		status: filterStatus,
		name: searchedCharacter,
		sortBy: sortMethod,
	});

	const onCloseModal = () => {
		setShowModal(false);
	};

	const onCharacterItemClick = (character: Character): void => {
		setCharacterInfo(character);
		setShowModal(true);
	};

	return (
		<div className="w-full pt-16 max-w-[1400px] mx-auto items-center ">
			{/* {data?.status === 404 ? (
				<div className=" mt-4 text-center text-lg font-medium">
					There is no such character
				</div>
			) : null}
			{data?.status === 500 ? (
				<div className=" mt-4 text-center text-lg font-medium">
					Something went wrong
				</div>
			) : null} */}
			{isLoading ? (
				<div className=" mt-4 text-center text-lg font-medium">Loading ...</div>
			) : null}
			<div className="bg-white w-full">
				{data?.results ? (
					<>
						<CharactersList
							characters={data.results}
							onCharacterItemClick={onCharacterItemClick}
						/>

						{data?.info?.pages && data?.info?.pages > 1 ? (
							<Pagination
								currentPage={parseInt(searchedPage)}
								pageQuantity={data?.info?.pages}
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
