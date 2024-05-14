import { Character } from '@/shared/types';

import CharacterItem from './CharacterItem/CharacterItem';

type CharactersListProps = {
	characters: Character[];
};

const CharactersList = ({ characters }: CharactersListProps) => {
	return (
		<>
			{characters ? (
				<ul className="flex flex-wrap gap-4 items-center justify-between">
					{characters.map((character) => (
						<CharacterItem key={character.id} character={character} />
					))}
				</ul>
			) : null}
		</>
	);
};

export default CharactersList;
