import type { ExampleProps } from '../utils/example-props';
import { Editor, type DocumentIssues } from 'code-editor';
import { useState } from 'react';

export function ExampleOutput({
	exampleProps,
}: {
	exampleProps: ExampleProps;
}) {
	const [content, setContent] = useState(exampleProps.document.content);
	const [issues, setIssues] = useState<DocumentIssues>({});

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex h-64 border'>
				<Editor
					{...exampleProps}
					listeners={{
						documentChange: (document, documentIssues) => {
							setContent(document.content);
							setIssues(documentIssues);
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
					<span className='font-semibold'>Issues:</span>
					<pre className='max-h-10 overflow-auto'>
						{JSON.stringify(issues)}
					</pre>
				</div>
			</div>
		</div>
	);
}
