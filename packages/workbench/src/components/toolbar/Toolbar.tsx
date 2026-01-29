import { cls, applyDefaults } from 'code-editor';
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

export type ToolbarStateValues = {
	isWrapEnabled: boolean;
	isFormatEnabled: boolean;
};

export type ToolbarStateSetters = {
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
	setIsFormatEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ToolbarStates = ToolbarStateValues & ToolbarStateSetters;

export const ToolbarStatesDefault: Required<ToolbarStates> = {
	isWrapEnabled: false,
	isFormatEnabled: false,
	setIsWrapEnabled: () => {},
	setIsFormatEnabled: () => {},
};

export type ToolbarProps = {
	options?: ToolbarOptions;
	states: ToolbarStates;
};

export const Toolbar = memo(function Toolbar({
	options,
	states,
}: ToolbarProps) {
	options = applyDefaults(options, ToolbarOptionsDefault);
	const {
		isWrapEnabled,
		isFormatEnabled,
		setIsWrapEnabled,
		setIsFormatEnabled,
	} = states;
	const { hideToolbar, showWrapTool, showCopyTool, showFormatTool } = options;

	if (hideToolbar) return null;

	return (
		<div
			className={cls(
				'border-b border-b-cwPanel',
				'flex items-stretch justify-between',
				'h-9 max-h-9',
			)}
		>
			<Title />

			<div className='flex h-full items-stretch'>
				{showWrapTool && (
					<ContentWrapTool
						isWrapEnabled={isWrapEnabled}
						setIsWrapEnabled={setIsWrapEnabled}
					/>
				)}
				{showCopyTool && <ContentCopyTool />}
				{showFormatTool && (
					<ContentFormatTool
						isFormatEnabled={isFormatEnabled}
						setIsFormatEnabled={setIsFormatEnabled}
					/>
				)}
			</div>
		</div>
	);
});
