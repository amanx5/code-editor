import { getExampleLines } from '../../../../../utils';

export const EXAMPLE_SNIPPET4 = `export default function App () {
    //#region Example Text
    const text = \`${getExampleLines(1000, 0, 40)}\`;
    //#endregion
    
    return (
        <Editor
            document={{
                content: text,
                language: 'txt',
            }}
            editorOptions={{
                highlightLines: [1, 3],
            }}
        />
    );
}`;
