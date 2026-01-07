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
					onChange={(content, error) => {
						setContent(content);
						setError(error);
					}}
				/>
			</div>
			<div className='bg-yellow-50 flex flex-col gap-2 border rounded-lg p-3'>
				<div className='flex gap-2'>
					<span>Content:</span>
					<pre className='max-h-20 overflow-auto'>{content}</pre>
				</div>
				<div className='flex gap-2'>
					<span>Error:</span>
					<pre className='max-h-10 overflow-auto'>{error?.message}</pre>
				</div>
			</div>
		</>
	);
}
