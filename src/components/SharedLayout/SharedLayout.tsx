import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const SharedLayout = () => {
	return (
		<main className="bg-[url('https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png')] w-screen">
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
		</main>
	);
};
