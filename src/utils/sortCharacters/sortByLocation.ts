import { Character } from 'rickmortyapi';

export function sortCharactersByLocation(characters: Character[]) {
	return characters.sort((a, b) => {
		const locationA = a.location.name.toUpperCase();
		const locationB = b.location.name.toUpperCase();

		if (locationA < locationB) {
			return -1;
		}
		if (locationA > locationB) {
			return 1;
		}
		return 0;
	});
}
