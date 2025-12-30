import { useContext, useMemo } from 'react';
import { CodeEditorContext } from '../../CodeEditor';
import { LineNumber, Editor, VirtualLine} from '../../components';
import { cls } from '../../utils';

export function Body() {
	const { code, isWrapEnabled, highlightLines, highlightLineCls } =
		useContext(CodeEditorContext);

	// TODO: use tokenizer 
	const virtualLines = useMemo(() => code.split('\n'), [code]);

	const lineCls = cls(
		'flex-1',
		'leading-5 text-sm',
		isWrapEnabled ? 'whitespace-pre-wrap wrap-anywhere' : 'min-w-full'
	);

	return (
		/* scroller */
		<div className={`flex flex-1 py-3 overflow-auto relative`}>
			{/* line-numbers: !isWrapEnabled */}
			{!isWrapEnabled && (
				<div aria-hidden className={`flex flex-col sticky left-0 z-20`}>
					{virtualLines.map((_, index) => (
						<LineNumber
							key={index}
							className='bg-surface-code  select-none'
							lineNumber={index + 1}
						/>
					))}
				</div>
			)}

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
				{virtualLines.map((line, index) => (
					<div key={index} className='inline-flex'>
						<VirtualLine
							line={line}
							lineCls={lineCls}
							lineNumber={index + 1}
							isWrapEnabled={isWrapEnabled}
							doHighlight={highlightLines.includes(index + 1)}
							highlightLineCls={highlightLineCls}
						/>
					</div>
				))}
			</div>

			{/* edit-surface-wrapper */}
			<div className='inline-block flex-1 z-10'>
				<Editor lineCls={lineCls} />
			</div>
		</div>
	);
}
