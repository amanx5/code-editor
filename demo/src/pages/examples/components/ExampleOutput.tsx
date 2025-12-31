import { useState } from 'react';
import { CodeEditor } from 'code-editor';
import type { ExampleProps } from '../utils/example-props';

export function ExampleOutput({
	exampleProps
}: {
exampleProps: ExampleProps;
}) {
	const [code, setCode] = useState(exampleProps.code);

	return (
		<>
			<CodeEditor
				{...exampleProps}
				code={code}
				setCode={setCode}
		 	/>
		</>
	);
}
