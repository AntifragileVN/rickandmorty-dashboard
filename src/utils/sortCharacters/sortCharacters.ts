import { Character } from '@/shared/types';
import { SortMethod } from '@/shared/types';

import * as sort from './index';

export function sortCharacters(
	sortMethod: SortMethod,
	characters: Character[],
): Character[] {
	switch (sortMethod) {
		case 'status':
			return sort.sortCharactersByStatus(characters);
		case 'name':
			return sort.sortCharactersByName(characters);
		case 'gender':
			return sort.sortCharactersByGender(characters);
		case 'location':
			return sort.sortCharactersByLocation(characters);
		default:
			console.log('Invalid criteria');
			return characters;
	}
}
