import { cls } from '../../utils';
import { ContentCopyTool, ContentFormatTool, ContentWrapTool } from './tools';
import { memo } from 'react';
import { Title } from './Title';

export type ToolbarOptions = {
	hideToolbar?: boolean;
	showWrapTool?: boolean;
	showCopyTool?: boolean;
	showFormatTool?: boolean;
};

export const ToolbarOptionsDefault = {
	hideToolbar: false,
	showWrapTool: true,
	showCopyTool: true,
	showFormatTool: false,
};

export type ToolbarProps = {
	options: ToolbarOptions;
};

export const Toolbar = memo(function Toolbar({ options }: ToolbarProps) {
	const { hideToolbar, showWrapTool, showCopyTool, showFormatTool } = options;

	if (hideToolbar) return null;

	return (
		<div
			className={cls(
				'bg-ce-bg-toolbar border-b border-b-ce-border-subtle',
				'flex items-center justify-between',
				'h-12 max-h-12',
				'px-6'
			)}
		>
			<Title />

			<div className='flex h-full items-center gap-4'>
				{showWrapTool && <ContentWrapTool />}
				{showCopyTool && <ContentCopyTool />}
				{showFormatTool && <ContentFormatTool />}
			</div>
		</div>
	);
});
