import { useState } from 'react';
import { Workbench } from 'code-workbench';
import {
	LANGUAGE_NAMES,
	Editor,
	type EditorDocument,
	type EditorProps,
	type Language,
	type LanguageName,
	type DocumentIssues,
} from 'code-editor';

export function TryWorkbench({
	disableWorkbench,
}: {
	disableWorkbench?: boolean;
}) {
	const [document, setDocument] = useState<EditorDocument>({
		content: 'hello world\nhow are you doing\nare you well\nare you well\nwhat is the plan for today\nthanks and bye',
		language: 'txt',
	});

	const [issues, setIssues] = useState<DocumentIssues>({});
	const languages = Object.entries(LANGUAGE_NAMES) as Array<
		[Language, LanguageName]
	>;

	const editorProps: EditorProps = {
		document,
		listeners: {
			documentChange: (document, documentIssues) => {
				setDocument(document);
				setIssues(documentIssues);
			},
		},
	};

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
					{/* Issues */}
					<div className='flex gap-2'>
						<span className='font-semibold '>Issues:</span>
						<pre className='max-h-10 overflow-auto bg-white p-2 flex-1'>
							{JSON.stringify(issues)}
						</pre>
					</div>
				</div>
			</div>

			<div className='bg-yellow-50 flex flex-col gap-5 h-64 border p-3 rounded-lg'>
				{/* heading */}
				<h1 className='text-xl font-semibold italic'>
					{disableWorkbench ? 'Editor' : 'Workbench'}
				</h1>

				{/* output */}
				{disableWorkbench ? (
					<Editor {...editorProps} />
				) : (
					<Workbench editorProps={editorProps} />
				)}
			</div>
		</div>
	);
}
