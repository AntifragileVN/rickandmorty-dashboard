import { Character } from '@/shared/types';

import CharacterItem from './CharacterItem/CharacterItem';

type CharactersListProps = {
	characters: Character[];
	onCharacterItemClick: (character: Character) => void;
};

const CharactersList = ({ characters, onCharacterItemClick }: CharactersListProps) => {
	return (
		<>
			{characters ? (
				<ul className="flex flex-wrap w-full gap-4 justify-center p-4 sm:justify-center">
					{characters.map((character) => (
						<CharacterItem
							key={character.id}
							character={character}
							onCharacterItemClick={onCharacterItemClick}
						/>
					))}
				</ul>
			) : null}
		</>
	);
};

export default CharactersList;
