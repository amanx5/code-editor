import React from 'react';
import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import {
	ErrorBoundaryFallback,
	type ErrorBoundaryFallbackProps,
} from '../../../../components';

export type PlaygroundPreviewProps = {
	App?: React.FC;
	error: Error | null;
	fileName: string;
};

export function PlaygroundPreview({
	App,
	error,
	fileName,
}: PlaygroundPreviewProps) {
	if (!App && !(error instanceof Error)) {
		throw new Error(
			'Invalid usage of `PlaygroundPreview`. Provide atleast one of the prop: App or error',
		);
	}

	return (
		<div className='flex-1 flex flex-col border rounded border-outline-subtle overflow-hidden'>
			<header className='min-h-10 bg-background-subtle px-3 py-1.5 border-b border-outline-subtle flex items-center shrink-0'>
				<div className='font-semibold text-xs'>Preview</div>
			</header>
			<div className='flex-1 relative bg-[#f6f7f9]'>
				{App ? (
					<ErrorBoundary Fallback={FallbackWrapper}>
						<App />
					</ErrorBoundary>
				) : (
					<FallbackWrapper error={error!} fileName={fileName} />
				)}
			</div>
		</div>
	);
}

function FallbackWrapper(props: ErrorBoundaryFallbackProps) {
	return (
		<div className='p-4'>
			<ErrorBoundaryFallback {...props} />
		</div>
	);
}
