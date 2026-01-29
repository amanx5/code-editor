import MonacoEditor from '@monaco-editor/react';
import { EXAMPLE_SNIPPETS } from '../examples';

type PlaygroundInputProps = {
	fileName: string;
	code: string;
	onChange: (value: string) => void;
	selectedExampleId: string;
	onExampleChange: (id: string) => void;
};

export function PlaygroundInput({
	fileName,
	code,
	onChange,
	selectedExampleId,
	onExampleChange,
}: PlaygroundInputProps) {
	return (
		<div className='flex-1 flex flex-col border rounded border-outline-subtle overflow-hidden'>
			<header className='min-h-10 bg-background-subtle px-3 py-1.5 border-b border-outline-subtle flex items-center justify-between shrink-0'>
				<div className='font-semibold text-xs'>{fileName}</div>
				<div className='flex items-center gap-2'>
					<select
						value={selectedExampleId}
						onChange={(e) => onExampleChange(e.target.value)}
						className='max-w-36 text-xs px-1.5 py-0.5 border rounded border-outline-subtle bg-white focus:outline-none focus:ring-1 focus:ring-primary h-7'
					>
						{EXAMPLE_SNIPPETS.map((example) => (
							<option key={example.id} value={example.id}>
								{example.title}
							</option>
						))}
					</select>
				</div>
			</header>
			<div className='flex-1'>
				<MonacoEditor
					height='100%'
					language='javascript'
					value={code}
					onChange={(value) => onChange(value || '')}
					options={{
						minimap: { enabled: false },
						fontSize: 14,
						scrollBeyondLastLine: false,
						automaticLayout: true,
					}}
				/>
			</div>
		</div>
	);
}
