import { useQuery } from '@tanstack/react-query';
import { getCharacters } from 'rickmortyapi';

import { GetCharactersParams } from '@/shared/types';

import { sortCharacters } from '@/utils/sortCharacters/sortCharacters';

const QUERY_KEY = ['Character'];

const getQueryFn = ({ name, gender, status, page }: GetCharactersParams) => {
	const query: GetCharactersParams = {
		page,
	};

	if (name) {
		query.name = name;
	}
	if (gender) {
		query.gender = gender;
	}
	if (status) {
		query.status = status;
	}

	return getCharacters(query);
};

export const useGetCharacters = (params: GetCharactersParams) => {
	return useQuery({
		queryKey: [QUERY_KEY, params],
		queryFn: () =>
			getQueryFn(params).then((response) => {
				if (response.status === 404) {
					throw new Error('There is no such character');
				}
				return response;
			}),
		select: ({ data }) => {
			if (params.sortBy && data.results) {
				const sortedCharacters = sortCharacters(params.sortBy, data.results);
				return {
					...data,
					results: sortedCharacters,
				};
			}
			return data;
		},
	});
};
