import type { ExampleProps } from '../utils/example-props';
import { Editor } from 'code-editor';
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
		<div className='flex flex-col gap-2'>
			<div className='flex h-64 border'>
				<Editor
					{...exampleProps}
					listeners={{
						documentChange: (document, error) => {
							setContent(document.content);
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
		</div>
	);
}
