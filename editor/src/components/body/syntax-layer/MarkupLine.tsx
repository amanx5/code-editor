import { cls, type EditorMarkup } from '../../../utils';
import { memo } from 'react';
import { LineNumber } from '../LineNumber';

type MarkupLineProps = {
	hideLineNumbers: boolean;
	lineContent: EditorMarkup;
	lineNumber: number;
	isHighlighted: boolean;
	isInvalid: boolean;
	isWrapEnabled: boolean;
};
export const MarkupLine = memo(function MarkupLine({
	hideLineNumbers,
	lineContent,
	lineNumber,
	isHighlighted,
	isInvalid,
	isWrapEnabled,
}: MarkupLineProps) {
	// render
	return (
		<div className='inline-flex'>
			{/* wrapper to ensure w-12 is occupied always even if line numbers are rendered from body and not here*/}
			{!hideLineNumbers && (
				<div className='w-12 min-w-12 flex justify-end'>
					{/* line-numbers: wrap on */}
					{isWrapEnabled && ( // these line numbers can't be shown in wrap off as they will scroll along with the line
						<LineNumber isWrapEnabled lineNumber={lineNumber} />
					)}
				</div>
			)}

			{/* virtual line */}
			<pre
				className={cls(
					'ce-content flex-1',
					hideLineNumbers && 'ce-content-pd',
					isHighlighted && 'bg-ce-bg-highlight',
					isInvalid && 'bg-ce-bg-error',
					isWrapEnabled && 'ce-content-wrap'
				)}
			>
				{lineContent}
			</pre>
		</div>
	);
});
