import React from 'react';

import { Character } from '@/shared/types';

import alive from '@/assets/alive.svg';
import dead from '@/assets/dead.svg';

import { formatId } from '@/utils/formatId';

type CharacterCardProps = {
	characterInfo: Character;
};

const CharacterCard = ({ characterInfo }: CharacterCardProps) => {
	const { id, name, image, location, status, gender, type } = characterInfo;
	return (
		<div className="bg-white rounded-lg p-5 flex items-center justify-between gap-5 text-lg">
			<div className="relative">
				<div className="absolute flex items-center justify-center top-8 right-[1%] w-10 h-10 bg-white rounded-full -translate-y-1/2 -translate-x-1/2">
					{status === 'Dead' ? (
						<img className="h-6" src={dead} alt="dead" />
					) : (
						<img className="h-8" src={alive} alt="alive" />
					)}
				</div>
				<img className="mb-1 rounded-md block" src={image} alt={name} />
			</div>
			<div>
				<h2 className="font-bold mb-2">
					{name}
					<span className="font-medium mb-2 text-gray-400">
						#{formatId(id)}
					</span>
				</h2>
				<p>
					<span className="font-medium">Status: </span>
					{status} {type ? `-${type}` : ''}
				</p>
				<p>
					<span className="font-medium">Gender: </span>
					{gender}
				</p>
				<p>
					<span className="font-medium">Type: </span>
					{gender}
				</p>
				<p>
					<span className="font-medium">Last location: </span>
					{location.name}
				</p>
			</div>
		</div>
	);
};

export default CharacterCard;
