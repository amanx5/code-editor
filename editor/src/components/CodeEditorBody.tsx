import { useContext, useEffect, useState } from 'react';
import { CodeEditorContext } from '../CodeEditor';
import { CodeEditorLineNumber } from './body/CodeEditorLineNumber';
import { ContentEditor } from './body/ContentEditor';
import { convertToVirtualLines } from '../utils/virtualLinesUtil';
import { CodeEditorVirtualLine } from './body/CodeEditorVirtualLine';
import { cls } from '../utils/cls';

export function CodeEditorBody() {
	const { code, isWrapEnabled } = useContext(CodeEditorContext);

	const [virtualLines, setVirtualLines] = useState(
		convertToVirtualLines(code)
	);

	const lineCls = cls(
		'flex-1',
		'leading-5 text-sm',
		isWrapEnabled ? 'whitespace-pre-wrap wrap-anywhere' : 'min-w-full'
	);

	const linesWrapperCls = cls(!isWrapEnabled && 'min-w-max');

	useEffect(() => {
		setVirtualLines(convertToVirtualLines(code));
	}, [code]);

	return (
		/* scroller */
		<div className={`flex flex-1 py-3 overflow-auto relative`}>
			{/* line-numbers: !isWrapEnabled */}
			{!isWrapEnabled && (
				<div aria-hidden className={`flex flex-col sticky left-0 z-20`}>
					{virtualLines.map((_, index) => (
						<CodeEditorLineNumber
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
					<div
						key={index}
						className={cls('inline-flex', linesWrapperCls)}
					>
						<CodeEditorVirtualLine
							line={line}
							lineCls={lineCls}
							lineNumber={index + 1}
						/>
					</div>
				))}
			</div>

			{/* edit-surface-wrapper */}
			<div className={cls('inline-block flex-1 z-10', linesWrapperCls)}>
				<ContentEditor lineCls={lineCls} />
			</div>
		</div>
	);
}
