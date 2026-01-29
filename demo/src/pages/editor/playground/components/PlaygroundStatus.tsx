import { beautifyJson, type DocumentIssues } from 'code-editor';

type PlaygroundStatusProps = {
	content: string;
	issues: DocumentIssues;
};

export function PlaygroundStatus({ content, issues }: PlaygroundStatusProps) {
	return (
		<div className='flex flex-col gap-2 shrink-0'>
			<h2 className='font-semibold tracking-wide'>STATUS</h2>
			<div className='bg-background-subtle flex gap-4 border border-outline-subtle rounded-lg p-4 font-mono text-xs overflow-hidden h-48'>
				<div className='flex-1 flex flex-col gap-1 overflow-hidden'>
					<div className='font-bold uppercase tracking-wider text-outline'>
						Content:
					</div>
					<pre className='flex-1 whitespace-pre-wrap bg-white p-2 border border-outline-subtle rounded overflow-auto'>
						{content}
					</pre>
				</div>
				<div className='w-1/3 flex flex-col gap-1 overflow-hidden'>
					<div className='font-bold uppercase tracking-wider text-outline'>
						Issues:
					</div>
					<pre className='flex-1 bg-white p-2 border border-outline-subtle rounded overflow-auto'>
						{beautifyJson(issues)}
					</pre>
				</div>
			</div>
		</div>
	);
}
