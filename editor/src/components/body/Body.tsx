import { useContext, useMemo } from 'react';
import {
	EditorDocumentContext,
	EditorOptionsContext,
	RootContext,
} from '../../contexts';
import { LineNumber, Editor, VirtualLine } from '..';
import { cls, tokenizeCode, range } from '../../utils';

/**
 * Code Editor Body Component
 *
 * TODO: Scroll the body when the user enters on last line or type in the end of a line
 */
export function Body() {
	const editorDocument = useContext(EditorDocumentContext);
	const { highlightLines = [], hideLineNumbers = false } =
		useContext(EditorOptionsContext);
	const {
		isWrapEnabled,
		internalContent,
		internalError,
		setInternalContent,
	} = useContext(RootContext);

	const virtualLines = useMemo(
		() => tokenizeCode(internalContent, editorDocument.language),
		[internalContent, editorDocument.language]
	);

	const lineNumbers = range(1, virtualLines.length);

	return (
		/* scroller */
		<div className={cls('flex flex-1 py-2 overflow-auto relative')}>
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
						hideLineNumbers={!!hideLineNumbers}
						line={line}
						lineNumber={index + 1}
						isHighlighted={highlightLines.includes(index + 1)}
						isInvalid={internalError?.line === index + 1}
						isWrapEnabled={isWrapEnabled}
					/>
				))}
			</div>

			{/* line-numbers: wrap off */}
			{!hideLineNumbers && (
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
						lineNumbers.map((num) => (
							<LineNumber key={num} lineNumber={num} />
						))}
				</div>
			)}

			{/* editor */}
			<Editor
				hideLineNumbers={!!hideLineNumbers}
				internalContent={internalContent}
				setInternalContent={setInternalContent}
			/>
		</div>
	);
}
