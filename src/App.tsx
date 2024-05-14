import { Route, Routes } from 'react-router-dom';

import { SharedLayout } from '@/components/SharedLayout/SharedLayout';

import Characters from './pages/Characters/Characters';

function App() {
	return (
		<Routes>
			<Route path="/" element={<SharedLayout />}>
				<Route index element={<Characters />} />
			</Route>
		</Routes>
	);
}

export default App;
