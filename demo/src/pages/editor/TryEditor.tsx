import { useState } from 'react';
import { Editor } from 'code-editor';
import type { EditorError } from 'code-editor/utils';

export function TryEditor() {
    const [content, setContent] = useState('hello world\nhow are you doing');
    const language = 'txt';
    const [error, setError] = useState<EditorError>(null);

    return (
        <div className='flex flex-col gap-2 mt-20'>
            <h1 className='text-xl font-semibold'>States</h1>
            <div className='flex flex-col gap-2 border rounded-lg p-3'>
                {/* content */}
                <div className='flex gap-2'>
                    <span className='font-semibold'>Content:</span>
                    <textarea
                        className='flex-1 p-2 bg-slate-50'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                {/* error */}
                <div className='flex gap-2'>
                    <span className='font-semibold'>Error:</span>
                    <pre className='max-h-10 overflow-auto bg-red-50 p-2 flex-1'>
                        {JSON.stringify(error)}
                    </pre>
                </div>
            </div>

            <h1 className='text-xl font-semibold mt-20'>Editor</h1>
            <div className='flex h-64 border'>
                <Editor
                    document={{
                        content,
                        language,
                    }}
                    listeners={{
                        onChange: setContent,
                        onError: setError,
                    }}
                />
            </div>
        </div>
    );
}
