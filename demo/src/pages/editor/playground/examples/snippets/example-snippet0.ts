
export const EXAMPLE_SNIPPET0 = `export default function App () {
    const document = {
        content: 'Hello World', // enter your text here
        language: 'txt',
    };

    const editorOptions = {
        highlightLines: [1],
    };

    return (
        <Editor
            document={document}
            editorOptions={editorOptions}
        />
    );
}`;
