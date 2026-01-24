import { useState } from 'react';
import { Workbench } from 'code-workbench';
import {
	LANGUAGE_NAMES,
	type EditorDocument,
	type EditorError,
	type Language,
	type LanguageName,
} from 'code-editor';

export function TryWorkbench() {
	const [document, setDocument] = useState<EditorDocument>({
		content: 'hello world\nhow are you doing',
		language: 'txt',
	});

	const [error, setError] = useState<EditorError>(null);
	const languages = Object.entries(LANGUAGE_NAMES) as Array<
		[Language, LanguageName]
	>;

	return (
		<div className='flex flex-col gap-10 py-10'>
			<div className='bg-slate-50 flex flex-col gap-5 border rounded-lg p-3'>
				{/* header */}
				<h1 className='text-xl font-semibold italic'>States</h1>

				{/* states */}
				<div className='flex flex-col gap-2'>
					{/* content */}
					<div className='flex gap-2'>
						<span className='font-semibold'>Content:</span>
						<textarea
							className='flex-1 p-2 '
							value={document.content}
							onChange={(e) =>
								setDocument({
									...document,
									content: e.target.value,
								})
							}
						/>
					</div>
					{/* language */}
					<div className='flex gap-2'>
						<span className='font-semibold'>Language:</span>
						<select
							className='flex-1 p-2 '
							value={document.language}
							onChange={(e) =>
								setDocument({
									...document,
									language: e.target.value as Language,
								})
							}
						>
							<option disabled value=''>
								Select Language
							</option>
							{languages.map(([language, languageName]) => (
								<option key={language} value={language}>
									{languageName}
								</option>
							))}
						</select>
					</div>
					{/* error */}
					<div className='flex gap-2'>
						<span className='font-semibold '>Error:</span>
						<pre className='max-h-10 overflow-auto bg-white p-2 flex-1'>
							{JSON.stringify(error)}
						</pre>
					</div>
				</div>
			</div>

			<div className='bg-yellow-50 flex flex-col gap-5 h-64 border p-3 rounded-lg'>
				{/* header */}
				<h1 className='text-xl font-semibold italic'>Workbench</h1>

				{/* workbench */}
				<Workbench
					editorProps={{
						document,
						listeners: {
							documentChange: (document, error) => {
								setDocument(document);
								setError(error);
							},
						},
					}}
				/>
			</div>
		</div>
	);
}
