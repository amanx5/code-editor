import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage, TryEditor, TryWorkbench } from './pages/';

export default function App() {
	return (
		<BrowserRouter>
			<AppWrapper>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/editor' element={<TryEditor />} />
					<Route path='/workbench' element={<TryWorkbench />} />
				</Routes>
			</AppWrapper>
		</BrowserRouter>
	);
}

function AppWrapper({ children }: { children: React.ReactNode }) {
	return (
		// app-wrapper
		<div className='min-h-screen min-w-60 flex flex-col'>
			{/* app-header */}
			<header className='bg-white border-b border-b-outline-subtle h-header w-full flex justify-center sticky top-0 z-[9999]'>
				<div className='h-full w-controlled px-controlled'>
					<div className='h-full flex items-center gap-4 font-sm font-semibold'>
						<Link to='/'>🛖</Link>
						<Link to='/editor'>Editor</Link>
						<Link to='/workbench'>Workbench</Link>
					</div>
				</div>
			</header>

			{/* app-main-content */}
			<main className='w-full flex flex-1 justify-center'>
				{/* page-wrapper */}
				<div className='w-controlled px-controlled'>
					{/* page */}
					{children}
				</div>
			</main>
		</div>
	);
}



