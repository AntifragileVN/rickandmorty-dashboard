import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError(error) {
			toast.error(`${error.message}`);
		},
	}),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter basename="rickandmorty-dashboard">
			<QueryClientProvider client={queryClient}>
				<App />
				<Toaster />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
