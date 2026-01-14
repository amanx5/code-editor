import type { ExampleProps } from '../utils/example-props';
import { CodeEditor } from 'code-editor';
import type { EditorError } from 'code-editor/utils';
import { useState } from 'react';

export function ExampleOutput({
	exampleProps,
}: {
	exampleProps: ExampleProps;
}) {
	const [content, setContent] = useState(exampleProps.document.content);
	const [error, setError] = useState<EditorError>(null);

	return (
		<>
			<div className='flex h-64'>
				<CodeEditor
					{...exampleProps}
					listeners={{
						onChange: (content) => {
							setContent(content);
						},
						onError: (error) => {
							setError(error);
						},
					}}
				/>
			</div>
			<div className='bg-blue-50 flex flex-col gap-2 border rounded-lg p-3'>
				<div className='flex gap-2'>
					<span className='font-semibold'>Content:</span>
					<pre className='max-h-20 overflow-auto'>{content}</pre>
				</div>
				<div className='flex gap-2'>
					<span className='font-semibold'>Error:</span>
					<pre className='max-h-10 overflow-auto'>
						{JSON.stringify(error)}
					</pre>
				</div>
			</div>
		</>
	);
}
