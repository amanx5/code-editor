import { useContext, useMemo } from 'react';
import { CodeEditorContext } from '../../CodeEditor';
import { LineNumber, Editor, VirtualLine } from '../../components';
import { cls, tokenizeCode } from '../../utils';

/**
 * Code Editor Body Component
 *
 * TODO: Scroll the body when the user enters on last line or type in the end of a line
 */
export function Body() {
	const { code, codeLang, isWrapEnabled, highlightLines, highlightLineCls } =
		useContext(CodeEditorContext);

	const virtualLines = useMemo(
		() => tokenizeCode(code, codeLang),
		[code, codeLang]
	);

	return (
		/* scroller */
		<div className={`flex flex-1 py-3 overflow-auto relative`}>
			{/* syntax-highlight-layer */}
			<div
				aria-hidden
				className={cls(
					'absolute flex flex-col',
					'pointer-events-none select-none',
					'w-full z-0',
					!isWrapEnabled && 'min-w-max'
				)}
			>
				{/* virtual-lines */}
				{virtualLines.map((line, index) => (
					<VirtualLine
						key={index}
						line={line}
						lineNumber={index + 1}
						isWrapEnabled={isWrapEnabled}
						doHighlight={highlightLines.includes(index + 1)}
						highlightLineCls={highlightLineCls}
					/>
				))}
			</div>

			{/* line-numbers: wrap off */}
			<div
				aria-hidden
				className={cls(
					'flex flex-col',
					'min-h-full min-w-12',
					'sticky left-0',
					!isWrapEnabled && 'z-20' // to prevent line-numbers from being overlapped by the editor (z-10)
				)}
			>
				{!isWrapEnabled && // these line numbers can't be shown in wrap on as their height will not adapt with line
					virtualLines.map((_, index) => (
						<LineNumber key={index} lineNumber={index + 1} />
					))}
			</div>

			{/* editor */}
			<Editor />
		</div>
	);
}
