
export type ErrorBoundaryFallbackProps = {
	error: Error;
	fileName?: string;
}
export function ErrorBoundaryFallback({
	error,
	fileName,
}: ErrorBoundaryFallbackProps) {
	const { message } = error;

	return (
		<div
			className='
				flex flex-col gap-2
				bg-white
				border border-red-700 rounded-md
				p-4	
			'
		>
			<p className='font-semibold text-xl text-red-700'>Error</p>
			<div className='text-sm text-text-muted'>
				{fileName && (
					<pre className='inline font-semibold'>{fileName}: </pre>
				)}
				<pre className='inline whitespace-pre-wrap'>{message}</pre>
			</div>
		</div>
	);
}
