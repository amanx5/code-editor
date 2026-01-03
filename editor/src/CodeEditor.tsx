import { useEffect, useRef, useState } from 'react';
import {
	Root,
	Body,
	Toolbar,
	type ToolbarOptions,
	ToolbarOptionsDefault,
} from './components';
import {
	type Content,
	type EditorDocument,
	type EditorOptions,
	EditorDocumentContext,
	EditorOptionsContext,
	EditorOptionsDefault,
	RootContext,
} from './contexts';
import { isPlainObject, validateCode, type CodeError } from './utils/';

export type CodeEditorProps = {
	document: EditorDocument;
	editor?: EditorOptions;
	toolbar?: ToolbarOptions;
	onChange?: (content: Content, error: CodeError) => void;
};

/**
 * Code Editor component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function CodeEditor({
	document,
	editor = EditorOptionsDefault,
	toolbar = ToolbarOptionsDefault,
	onChange,
}: CodeEditorProps) {
	// TODO: use ref instead of state, currently virtual lines are dependent on this state,
	// better approach is to mutate syntax layer automatically on content change and add a cursor layer
	// instead of double content layers
	const [internalContent, setInternalContent] = useState<Content>(
		document.content
	);
	const [internalError, setInternalError] = useState<CodeError>(null);

	const [isWrapEnabled, setIsWrapEnabled] = useState(
		isPlainObject(toolbar) ? !!toolbar.showWrapTool : false
	);

	
	const lastCommitRef = useRef(document.content);

	// effect to sync internalContent when external document.content changes
	useEffect(() => {
		// don't compare document.content with internal content as on rapid/continous user inputs
		// internal content will update continously while external content won't be able to sync with it 
		// so values will differ and will cause infinite nested updates 
		if (document.content !== lastCommitRef.current) {
			setInternalContent(document.content);
		}
	}, [document.content]);

	// effect to update internalError and call external onChange callback when internalContent changes
	useEffect(() => {
		const internalErrorUpdated = validateCode(
			internalContent,
			document.language
		);
		setInternalError(internalErrorUpdated);

		lastCommitRef.current = internalContent;
		onChange?.(internalContent, internalErrorUpdated);
	}, [internalContent, document.language]);

	const rootContextValue = {
		internalContent,
		internalError,
		isWrapEnabled,
		setIsWrapEnabled,
		setInternalContent,
	};

	return (
		<EditorDocumentContext.Provider value={document}>
			<EditorOptionsContext.Provider value={editor}>
				<RootContext.Provider value={rootContextValue}>
					<Root>
						<Toolbar options={toolbar} />
						<Body />
					</Root>
				</RootContext.Provider>
			</EditorOptionsContext.Provider>
		</EditorDocumentContext.Provider>
	);
}
