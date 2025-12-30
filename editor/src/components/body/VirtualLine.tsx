import { type CodeLineNumber } from '../../CodeEditor';
import { LineNumber } from './LineNumber';
import { cls } from '../../utils';
import { memo } from 'react';
import { type TokenizedLine } from '../../utils/code-languages';

type VirtualLineProps = {
	line: TokenizedLine;
	lineCls: string;
	lineNumber: CodeLineNumber;
	isWrapEnabled: boolean;
	doHighlight: boolean;
	highlightLineCls: string;
};
export const VirtualLine = memo(
	({
		line,
		lineCls,
		lineNumber,
		isWrapEnabled,
		doHighlight,
		highlightLineCls,
	}: VirtualLineProps) => {
		// render
		return (
			<>
				{/* line-number: isWrapEnabled */}
				{isWrapEnabled && (
					<LineNumber
						className='inline-block'
						lineNumber={lineNumber}
					/>
				)}
				{/* virtual-line */}
				<pre
					className={cls(
						lineCls,
						!isWrapEnabled && 'pl-12 h-5',
						doHighlight ? highlightLineCls : 'bg-surface-code'
					)}
				>
					{line}
				</pre>
			</>
		);
	}
);
