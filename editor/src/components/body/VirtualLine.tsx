import { type CodeLine, type CodeLineNumber } from '../../CodeEditor';
import { LineNumber } from './LineNumber';
import { cls } from '../../utils/cls';
import { memo } from 'react';

type VirtualLineProps = {
	line: CodeLine;
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
		const togglehighlightLineCls = (n: CodeLineNumber) =>
			doHighlight ? highlightLineCls : 'bg-surface-code';

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
						!isWrapEnabled && 'pl-12 h-5',
						togglehighlightLineCls(lineNumber),
						lineCls
					)}
				>
					{line}
				</pre>
			</>
		);
	}
);
