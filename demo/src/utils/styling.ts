// TODO: Make common source of truth; tailwind.config.js
export const TW_CONFIG = {
	height: {
		header: '56px',
	},
	spacing: {
		pageY: '48px',
	}
};

export function pxToNum(px: string): number {
	return parseInt(px.replace('px', ''));
}
