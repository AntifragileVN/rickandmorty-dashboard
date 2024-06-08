export type SortMethod = 'name' | 'gender' | 'location' | 'status';

export type GetCharactersParams = {
	page: number;
	gender?: string;
	status?: string;
	name?: string;
	sortBy?: SortMethod;
};
