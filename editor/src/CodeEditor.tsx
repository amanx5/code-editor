import { createContext, useState } from 'react';
import { Header, Body } from './components';
import { cls, type CodeError, type CodeLanguage } from './utils';

export type Code = string;
export type CodeLineNumber = number;

export type CodeEditorProps = {
	className?: string;
	code: Code;
	codeError?: CodeError;
	codeLang: CodeLanguage;
	fileName?: string;
	highlightLines?: CodeLineNumber[];
	setCode?: React.Dispatch<React.SetStateAction<Code>>;
	setCodeError?: React.Dispatch<React.SetStateAction<CodeError>>;
};

/**
 * Code Editor component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function CodeEditor({
	className = '',
	code,
	codeError = null,
	codeLang,
	fileName = '',
	highlightLines = [],
	setCode,
	setCodeError,
}: CodeEditorProps) {
	const [isWrapEnabled, setIsWrapEnabled] = useState(true);

	return (
		<CodeEditorContext.Provider
			value={{
				code,
				codeError,
				codeLang,
				fileName,
				highlightLines,
				isWrapEnabled,
				setCode,
				setCodeError,
				setIsWrapEnabled,
			}}
		>
			<div
				// flex-1: for forcing grow if consumer wraps CodeEditor in flex container
				// don-t add min-h as it can be extra if there is only one line of code
				// overflow-hidden: to make sure rounded borders are not overlapped by children
				className={cls(
					'bg-ce-bg-root',
					'border border-ce-border-subtle rounded-lg',
					'flex-1 flex flex-col',
					'overflow-hidden',
					className
				)}
			>
				<Header />
				<Body />
			</div>
		</CodeEditorContext.Provider>
	);
}

export type CodeEditorContext = {
	code: Code;
	codeError: CodeError;
	codeLang: CodeLanguage;
	fileName: string;
	highlightLines: number[];
	isWrapEnabled: boolean;
	setCode?: React.Dispatch<React.SetStateAction<Code>>;
	setCodeError?: React.Dispatch<React.SetStateAction<CodeError>>;
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CodeEditorContext = createContext<CodeEditorContext>({
	code: '',
	codeError: null,
	codeLang: 'cmd',
	fileName: '',
	highlightLines: [],
	isWrapEnabled: true,
	setCode: () => undefined,
	setCodeError: () => undefined,
	setIsWrapEnabled: () => undefined,
});
