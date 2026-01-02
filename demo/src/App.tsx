import { ExamplesPage } from './pages/examples';

export default function App() {
	return (
		<AppWrapper>
			<ExamplesPage />
		</AppWrapper>
	);
}

function AppWrapper({ children }: { children: React.ReactNode }) {
	return (
		// app-wrapper
		<div className='min-h-screen min-w-60 flex flex-col'>
			{/* app-header */}
			<header className='bg-white border-b border-b-outline-subtle h-header w-full flex justify-center sticky top-0 z-[9999]'>
				<div className='h-full w-controlled px-controlled'>
					<div className='h-full flex items-center'>
						<a className='font-bold text-2xl' href='/'>Code Editor</a>
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