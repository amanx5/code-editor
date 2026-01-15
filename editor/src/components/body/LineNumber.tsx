import { cls } from "../../utils";
import type { CodeLineNumber } from "./layers";

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
				'align-top',
				'ceContent',
				'w-12 min-w-12 pr-4',
				'text-right text-text-muted select-none',
				!isWrapEnabled && 'bg-ceRoot' // to hide any content behind the line-numbers when scrolled
			)}
		>
			{lineNumber}
		</span>
	);
}
