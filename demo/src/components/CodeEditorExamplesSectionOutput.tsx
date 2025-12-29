import { useState } from 'react';
import { type Code, type CodeLineNumber, CodeEditor } from 'code-editor';

export function CodeEditorExamplesSectionOutput({
	exampleCode,
	highlightLines,
}: {
	exampleCode: Code;
	highlightLines: CodeLineNumber[];
}) {
	const [code, setCode] = useState(exampleCode);

	return (
		<>
			<CodeEditor
				code={code}
				setCode= {setCode}
				codeLang='cmd'
				highlightLines={highlightLines}
		 	/>
		</>
	);
}
