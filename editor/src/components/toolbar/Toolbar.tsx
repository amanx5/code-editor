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
				'border-b border-b-cePanel',
				'flex items-stretch justify-between',
				'h-9 max-h-9',
			)}
		>
			<Title />

			<div className='flex h-full items-stretch'>
				{showWrapTool && <ContentWrapTool />}
				{showCopyTool && <ContentCopyTool />}
				{showFormatTool && <ContentFormatTool />}
			</div>
		</div>
	);
});
