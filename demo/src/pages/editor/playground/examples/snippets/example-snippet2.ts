import { getExampleLines } from '../../../../../utils';

export const EXAMPLE_SNIPPET2 = `export default function App () {
    const text = \`${getExampleLines(1, 0, 5)}\`;

    return (
        <Editor
            document={{
                content: text,
                language: 'txt',
            }}
            editorOptions={{
                highlightLines: [1],
            }}
        />
    );
}`;
