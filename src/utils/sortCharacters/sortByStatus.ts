import { Character } from '@/shared/types';

export function sortCharactersByStatus(characters: Character[]) {
	return characters.sort((a, b) => {
		const statusA = a.status.toUpperCase();
		const statusB = b.status.toUpperCase();

		if (statusA < statusB) {
			return -1;
		}
		if (statusA > statusB) {
			return 1;
		}
		return 0;
	});
}
