import { Character } from 'rickmortyapi';

export function sortCharactersByGender(characters: Character[]) {
	return characters.sort((a, b) => {
		const genderA = a.gender.toUpperCase();
		const genderB = b.gender.toUpperCase();

		if (genderA < genderB) {
			return -1;
		}
		if (genderA > genderB) {
			return 1;
		}
		return 0;
	});
}
