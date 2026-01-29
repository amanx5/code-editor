import { getExampleLines } from '../../../../../utils';

export const EXAMPLE_SNIPPET3 = `export default function App () {
    const text = \`${getExampleLines(2, 0, 10)}\`;
    
    return (
        <Editor
            document={{
                content: text,
                language: 'txt',
            }}
            editorOptions={{
                highlightLines: [2],
                hideLineNumbers: true,
            }}
        />
    );
}`;
