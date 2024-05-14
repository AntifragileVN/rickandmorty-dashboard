import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getCharacters } from 'rickmortyapi';

import Modal from '@/components/Modal/Modal';

import { Character } from '@/shared/types';

import CharacterCard from './CharacterCard/CharacterCard';
import CharactersList from './CharactersList/CharactersList';

// type CharactersProps =
// props:CharactersProps

const Characters = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [characterInfo, setCharacterInfo] = useState<Character | null>(null);

	const { data, isError } = useQuery({
		queryKey: ['characters'],
		queryFn: getCharacters,
	});

	const onCloseModal = () => {
		setShowModal(false);
	};

	const onCharacterItemClick = (character: Character): void => {
		setCharacterInfo(character);
		setShowModal(true);
	};

	console.log(data);

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
