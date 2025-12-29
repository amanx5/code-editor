import { CodeEditorExamples } from './components';

export default function App() {
	return (
		<AppWrapper>
			<CodeEditorExamples />
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
					Code Editor
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