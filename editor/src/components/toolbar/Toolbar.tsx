import { cls } from '../../utils';
import { ContentCopyTool, ContentWrapTool } from './tools';
import { memo } from 'react';
import { Title } from './Title';

export type ToolbarOptions = {
	hideToolbar?: boolean;
	showWrapTool?: boolean;
	showCopyTool?: boolean;
};

export const ToolbarOptionsDefault = {
	hideToolbar: false,
	showWrapTool: true,
	showCopyTool: true,
};

export type ToolbarProps = {
	options: ToolbarOptions;
};

export const Toolbar = memo(function Toolbar(
	{ options }: ToolbarProps
) {
	const {
		hideToolbar = ToolbarOptionsDefault.hideToolbar,
		showWrapTool = ToolbarOptionsDefault.showWrapTool,
		showCopyTool = ToolbarOptionsDefault.showCopyTool,
	} = options;

	if (hideToolbar) return null;

	return (
		<div
			className={cls(
				'bg-ce-bg-toolbar border-b border-b-ce-border-subtle',
				'flex justify-between',
				'h-12 max-h-12',
				'px-6 py-2'
			)}
		>
			<Title />

			<div className='flex h-full items-center gap-4'>
				{showWrapTool && <ContentWrapTool />}
				{showCopyTool && <ContentCopyTool />}
			</div>
		</div>
	);
});
