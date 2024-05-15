import { Character } from '@/shared/types';

import alive from '@/assets/alive.svg';
import dead from '@/assets/dead.svg';
import unknown from '@/assets/unknown.svg';

import { formatId } from '@/utils/formatId';

type CharacterItemProps = {
	character: Character;
	onCharacterItemClick: (character: Character) => void;
};

const CharacterItem = ({ character, onCharacterItemClick }: CharacterItemProps) => {
	const { id, name, image, location, status } = character;

	return (
		<li className="relative overflow-hidden max-w-[300px] text-wrap rounded-md hover:animate-card-bounce">
			<div className="absolute flex items-center justify-center top-8 right-[1%] w-10 h-10 bg-white rounded-full -translate-y-1/2 -translate-x-1/2">
				{status === 'Dead' ? (
					<img className="h-3/4" src={dead} alt="dead" />
				) : null}
				{status === 'Alive' ? (
					<img className="h-3/4" src={alive} alt="alive" />
				) : null}
				{status === 'unknown' ? (
					<img className="h-3/4" src={unknown} alt="unknown" />
				) : null}
			</div>
			<img
				className="mb-1 rounded-md block w-full"
				src={image}
				alt={`${name} image`}
				onClick={() => onCharacterItemClick(character)}
			/>
			<div className="pl-2 ">
				<p className="font-medium mb-2 text-gray-400">#{formatId(id)}</p>
				<p className="font-semibold ">{name}</p>
				<p>Last location: {location.name}</p>
			</div>
		</li>
	);
};

export default CharacterItem;
