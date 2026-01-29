import { useEditorApi } from '../../../hooks';
import { EditorOptions } from '../../../Editor';
import { cls } from '../../../utils';
import { DecorationMemo } from './Decoration';

export type DecorationLayerProps = {
	editorOptions?: EditorOptions;
};
export function DecorationLayer({ editorOptions }: DecorationLayerProps) {
	const { cursor, markup } = useEditorApi();
	cursor;
	const lineMetas = markup.commit?.markupMeta ?? [];

	return (
		<div
			aria-hidden
			className={cls(
				'absolute',
				'flex-1 inline-flex flex-col min-h-full min-w-full h-max',
				'select-none pointer-events-none',
			)}
		>
			{lineMetas.map((lineMeta) => (
				<DecorationMemo
					key={lineMeta.number}
					editorOptions={editorOptions}
					{...lineMeta}
				/>
			))}
		</div>
	);
}
