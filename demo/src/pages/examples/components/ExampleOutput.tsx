import { CodeEditor } from 'code-editor';
import type { ExampleProps } from '../utils/example-props';

export function ExampleOutput({
	exampleProps,
}: {
	exampleProps: ExampleProps;
}) {
	return (
		<div className='flex h-64'>
			<CodeEditor {...exampleProps} />
		</div>
	);
}
