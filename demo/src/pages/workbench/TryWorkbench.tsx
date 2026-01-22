import { useState } from 'react';
import { Workbench } from 'code-workbench';
import type { EditorError } from 'code-editor/utils';

export function TryWorkbench() {
	const [content, setContent] = useState('hello world\nhow are you doing');
	const language = 'txt';
	const [error, setError] = useState<EditorError>(null);

	return (
		<div className='flex flex-col gap-10 py-10'>
			<div className='bg-slate-50 flex flex-col gap-5 border rounded-lg p-3'>
				{/* header */}
				<h1 className='text-xl font-semibold italic'>States</h1>

				{/* content */}
				<div className='flex gap-2'>
					<span className='font-semibold'>Content:</span>
					<textarea
						className='flex-1 p-2 '
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>

				{/* error */}
				<div className='flex gap-2'>
					<span className='font-semibold '>Error:</span>
					<pre className='max-h-10 overflow-auto bg-white p-2 flex-1'>
						{JSON.stringify(error)}
					</pre>
				</div>
			</div>

			<div className='bg-yellow-50 flex flex-col gap-5 h-64 border p-3 rounded-lg'>
				{/* header */}
				<h1 className='text-xl font-semibold italic'>Workbench</h1>

				{/* workbench */}
				<Workbench
					editorProps={{
						document: {
							content,
							language,
						},
						listeners: {
							documentChange: (document, error) => {
								setContent(document.content);
								setError(error);
							},
						},
					}}
				/>
			</div>
		</div>
	);
}
