export type Language = keyof typeof LANGUAGE_NAMES;
export type LanguageName = (typeof LANGUAGE_NAMES)[Language];

export enum LANGUAGE_NAMES {
	cmd = 'Command',
	js = 'JavaScript',
	jsx = 'JavaScript XML',
	json = 'JSON',
	ts = 'TypeScript',
	tsx = 'TypeScript XML',
	txt = 'Text',
}
