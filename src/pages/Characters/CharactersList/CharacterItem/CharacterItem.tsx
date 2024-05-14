import { Character } from '@/shared/types';

import alive from '@/assets/alive.svg';
import dead from '@/assets/dead.svg';

import { formatId } from '@/utils/formatId';

type CharacterItemProps = {
	character: Character;
};

const CharacterItem = ({ character }: CharacterItemProps) => {
	const { id, name, image, location, status } = character;
	return (
		<li className="relative overflow-hidden rounded-md hover:animate-card-bounce ">
			<div className="absolute flex items-center justify-center top-8 right-4 w-10 h-10 bg-white rounded-full -translate-y-1/2 -translate-x-1/2">
				{status === 'Dead' ? (
					<img className="h-3/4" src={dead} alt="dead" />
				) : (
					<img className="h-3/4" src={alive} alt="alive" />
				)}
			</div>
			<img className="mb-1 rounded-md block" src={image} alt="" />
			<div className="pl-2 ">
				<p className="font-medium mb-2 text-gray-400">#{formatId(id)}</p>
				<p className="font-semibold ">{name}</p>
				<p>Last location: {location.name}</p>
			</div>
		</li>
	);
};

export default CharacterItem;
