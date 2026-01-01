import { useState } from 'react';
import { cls } from 'code-editor/utils';
import { Section } from '../../../components/Section';
import { ExampleOutput } from './ExampleOutput';
import type { ExampleProps } from '../utils/example-props';

type ExampleSectionProps = {
	id: string;
	title: string;
	exampleProps: ExampleProps;
};
export function ExampleSection({
	id,
	title,
	exampleProps,
}: ExampleSectionProps) {
	const [showProps, setShowProps] = useState(false);
	const [showOutput, setShowOutput] = useState(true);
	const exampleSectionOptions = [
		{
			label: 'Show Props',
			checked: showProps,
			toggle: () => setShowProps(!showProps),
		},
		{
			label: 'Show Output',
			checked: showOutput,
			toggle: () => setShowOutput(!showOutput),
		},
	];

	return (
		<Section id={id} title={title}>
			<div className='min-h-96 bg-surface-muted border border-outline-subtle flex flex-col p-4 mb-10 gap-4'>
				{/* checkboxes to toggle visibility */}
				<div className='flex justify-end gap-2'>
					{exampleSectionOptions.map(({ label, checked, toggle }) => (
						<button
							key={label}
							type='button'
							onClick={toggle}
							className={cls(
								'px-4 py-2 rounded-full text-sm font-medium',
								'border transition-colors',
								checked
									? 'bg-blue-600 text-white border-blue-600'
									: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
							)}
						>
							{label}
						</button>
					))}
				</div>

				{/* example data */}
				{showProps && (
					<div className='flex flex-col gap-1'>
						{Object.entries(exampleProps).map(
							([key, value], index) => (
								<div key={index} className='flex gap-2'>
									<pre className='font-semibold'>{key}:</pre>

									<pre className='overflow-auto max-h-20 font-semibold text-text-primary'>
										{formatValue(value)}
									</pre>
								</div>
							)
						)}
					</div>
				)}

				{/* editor */}
				{showOutput && (
					<div className={`flex h-64`}>
						<ExampleOutput exampleProps={exampleProps} />
					</div>
				)}
			</div>
		</Section>
	);
}

function formatValue(value: unknown): string {
	return Array.isArray(value)
		? '[ ' + value.join(', ') + ' ]'
		: isBoolean(value)
		? toBoolIcon(value)
		: String(value);
}

export function isBoolean(arg: unknown): arg is boolean {
	return typeof arg === 'boolean';
}

export function toBoolIcon(bool: boolean): string {
	return bool == true ? '✓' : '✗';
}
