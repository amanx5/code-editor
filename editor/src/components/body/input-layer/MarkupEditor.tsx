import { useContext } from 'react';
import { getEventHandlers } from './utils';
import { cls, type MarkupGeneratorOptions } from '../../../utils';
import {
	EditorDocumentContext,
	EditorOptionsContext,
	RootContext,
} from '../../../contexts';
import { useMarkupRenderer } from './hooks';

export type MarkupEditorElement = HTMLPreElement;

export function MarkupEditor() {
	const document = useContext(EditorDocumentContext);
	const editorOptions = useContext(EditorOptionsContext);
	const { isWrapEnabled, onChange } = useContext(RootContext);
	const markupOptions:MarkupGeneratorOptions = {
		highlightLines: editorOptions.highlightLines,
		wrapContent: isWrapEnabled,
	}
	const rendererObject =
		useMarkupRenderer(document,markupOptions, onChange );


	return (
		<pre
			className={cls(
				'ce-content',
				'flex-1 inline-flex flex-col h-max',
				'focus:outline-none',
				editorOptions.hideLineNumbers && 'ce-content-pd',
				'z-10'
			)}
			contentEditable={!editorOptions.disabled}
			ref={rendererObject.editorRef}
			spellCheck={false}
			{...getEventHandlers(rendererObject)}
		/>
	);
}
