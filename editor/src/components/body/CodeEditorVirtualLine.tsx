import { type CodeLine, type CodeLineNumber } from '../../CodeEditor';
import { CodeEditorLineNumber } from '../body/CodeEditorLineNumber';
import { cls } from '../../utils/cls';
import { memo } from 'react';

type CodeEditorVirtualLineProps = {
	line: CodeLine;
	lineCls: string;
	lineNumber: CodeLineNumber;
	isWrapEnabled: boolean;
	doHighlight: boolean;
	highlightLineCls: string;
};
export const CodeEditorVirtualLine = memo(
	({
		line,
		lineCls,
		lineNumber,
		isWrapEnabled,
		doHighlight,
		highlightLineCls,
	}: CodeEditorVirtualLineProps) => {
		const togglehighlightLineCls = (n: CodeLineNumber) =>
			doHighlight ? highlightLineCls : 'bg-surface-code';

		return (
			<>
				{/* line-number: isWrapEnabled */}
				{isWrapEnabled && (
					<CodeEditorLineNumber
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
