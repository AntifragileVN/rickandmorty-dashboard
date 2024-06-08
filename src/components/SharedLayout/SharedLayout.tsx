import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/Header';
import SideBar from '@/components/SideBar/SideBar';

export const SharedLayout = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

	const toggleSideBar = () => {
		setIsSideBarOpen((prev) => !prev);
	};

	return (
		<div className="flex h-screen">
			<SideBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
			<main className="bg-[url('https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png')] w-screen flex flex-col">
				<Header toggleSideBar={toggleSideBar} />
				<Suspense fallback={null}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};
