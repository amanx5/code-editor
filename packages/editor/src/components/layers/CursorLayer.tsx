export function CursorLayer({ children }: { children: React.ReactNode }) {
	return (
		<div aria-hidden className='absolute select-none pointer-events-none'>
			{children}
		</div>
	);
}
