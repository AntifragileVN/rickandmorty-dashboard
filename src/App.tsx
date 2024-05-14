import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCharacters } from 'rickmortyapi';

import CharactersList from './pages/Characters/CharactersList/CharactersList';

function App() {
	const { data, isError } = useQuery({
		queryKey: ['characters'],
		queryFn: getCharacters,
	});

	console.log(data);

	return <>{data ? <CharactersList characters={data.data.results} /> : null}</>;
}

export default App;
