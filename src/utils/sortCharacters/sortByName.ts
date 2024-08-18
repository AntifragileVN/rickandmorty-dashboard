import type { Character } from 'rickmortyapi';

export function sortCharactersByName(characters: Character[]) {
	return characters.sort((a, b) => {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();

		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}

		return 0;
	});
}
