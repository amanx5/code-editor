import { cls } from '../../utils';
import { memo } from 'react';
import { type TokenizedLine } from '../../utils/code-languages';
import { LineNumber } from './LineNumber';

type VirtualLineProps = {
	line: TokenizedLine;
	lineNumber: number;
	isWrapEnabled: boolean;
	doHighlight: boolean;
	highlightLineCls: string;
};
export const VirtualLine = memo(
	({
		line,
		lineNumber,
		isWrapEnabled,
		doHighlight,
		highlightLineCls,
	}: VirtualLineProps) => {
		// render
		return (
			<div className='inline-flex'>
				<div className='w-12 min-w-12 flex justify-end'>
					{/* line-numbers: wrap on */}
					{isWrapEnabled && (	// these line numbers can't be shown in wrap off as they will scroll along with the line
						<LineNumber isWrapEnabled lineNumber={lineNumber} />
					)}
				</div>

				{/* virtual line */}
				<pre
					className={cls(
						'ce-content flex-1',
						doHighlight && highlightLineCls,
						isWrapEnabled && 'whitespace-pre-wrap wrap-anywhere'
					)}
				>
					{line}
				</pre>
			</div>
		);
	}
);
