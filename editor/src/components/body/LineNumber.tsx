import { cls } from '../../utils';
import type { CodeLineNumber } from '../../contexts';

export function LineNumber({
	isWrapEnabled,
	lineNumber,
}: {
	isWrapEnabled?: boolean;
	lineNumber: CodeLineNumber;
}) {
	return (
		<span
			className={cls(
				'ce-content',
				'align-top',
				'w-12 min-w-12 pr-4',
				'text-right text-text-muted select-none',
				!isWrapEnabled && 'bg-ce-bg-root' // to hide any content behind the line-numbers when scrolled
			)}
		>
			{lineNumber}
		</span>
	);
}
