import React, { useState, useEffect, useMemo, useRef } from 'react';
import { transform } from 'sucrase';
import { Editor, type DocumentIssues, type EditorProps } from 'code-editor';
import { EXAMPLE_SNIPPETS } from './examples';
import {
	PlaygroundInput,
	PlaygroundPreview,
	PlaygroundStatus,
} from './components';

export function EditorPlayground() {
	const [selectedExampleId, setSelectedExampleId] = useState(
		EXAMPLE_SNIPPETS[0].id,
	);
	const [editorCode, setEditorCode] = useState(EXAMPLE_SNIPPETS[0].snippet);
	const editorErrorRef = useRef<Error | null>(null);

	const [status, setStatus] = useState<{
		content: string;
		issues: DocumentIssues;
	}>({ content: '', issues: {} });

	const appFileName = 'App.jsx';
	const App = useMemo(() => {
		try {
			// Transpile JSX/TS + ES Modules (for exports)
			const transpiledCode = transform(editorCode, {
				transforms: ['typescript', 'jsx', 'imports'],
				production: true,
			}).code;

			const exports = {};

			// Scoped Execution
			const scope = {
				React,
				useState,
				useEffect,
				useMemo,
				exports,
				// Tracked Editor to report status back to the playground
				Editor: (props: EditorProps) => (
					<Editor
						{...props}
						listeners={{
							...props.listeners,
							documentChange: (doc, issues) => {
								props.listeners?.documentChange?.(doc, issues);
								setStatus({
									content: doc.content,
									issues,
								});
							},
						}}
					/>
				),
			};

			// Execute the transpiledCode
			const executeCode = new Function(
				...Object.keys(scope),
				transpiledCode,
			);
			executeCode(...Object.values(scope));

			if (
				'default' in exports &&
				isFunctionalComponent(exports.default)
			) {
				return exports.default;
			} else {
				throw new Error(
					`No component exported. Make sure to default export a React functional component.`,
				);
			}
		} catch (e) {
			if (e instanceof Error) {
				editorErrorRef.current = e;
			}
		}
	}, [editorCode]);

	const handleExampleChange = (id: string) => {
		const example = EXAMPLE_SNIPPETS.find((e) => e.id === id)!;
		setSelectedExampleId(id);
		setEditorCode(example.snippet);
		setStatus({ content: '', issues: {} });
	};

	return (
		<div className='flex flex-col gap-6 py-pageY h-[calc(100vh-theme(height.header)-2rem)]'>
			<div className='flex-1 flex gap-4 min-h-0'>
				<PlaygroundInput
					code={editorCode}
					fileName={appFileName}
					onChange={setEditorCode}
					selectedExampleId={selectedExampleId}
					onExampleChange={handleExampleChange}
				/>

				<PlaygroundPreview
					App={App}
					error={editorErrorRef.current}
					fileName={appFileName}
				/>
			</div>

			<PlaygroundStatus content={status.content} issues={status.issues} />
		</div>
	);
}

function isFunctionalComponent(value: unknown): value is React.FC {
	return (
		typeof value === 'function'
		// value.prototype?.isReactComponent // this marker exists only for class components
	);
}
