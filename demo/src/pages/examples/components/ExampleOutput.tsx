import { useState } from 'react';
import { CodeEditor } from 'code-editor';
import type { ExampleProps } from '../utils/example-props';
import type { CodeError } from 'code-editor/utils';

export function ExampleOutput({
	exampleProps
}: {
exampleProps: ExampleProps;
}) {
	const [code, setCode] = useState(exampleProps.code);
	const [error, setError] = useState<CodeError>(null);

	return (
		<>
			<CodeEditor
				{...exampleProps}
				code={code}
				codeError={error}
				setCode={setCode}
				setCodeError={setError}
		 	/>
		</>
	);
}
