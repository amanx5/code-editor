import { useState } from 'react';
import { cls } from 'code-editor/utils';
import { Section } from '../../../components/Section';
import type { ExampleProps } from '../utils/example-props';
import { ExampleData } from './ExampleData';
import { ExampleOutput } from './ExampleOutput';

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
			enabled: showProps,
			toggle: () => setShowProps(!showProps),
		},
		{
			label: 'Show Output',
			enabled: showOutput,
			toggle: () => setShowOutput(!showOutput),
		},
	];

	return (
		<Section id={id} title={title}>
			<div className='border border-outline-subtle flex flex-col p-4 mb-10 gap-4'>
				{/* header */}
				<div className='flex justify-end gap-2'>
					{exampleSectionOptions.map(({ label, enabled, toggle }) => (
						<button
							key={label}
							type='button'
							onClick={toggle}
							className={cls(
								'px-4 py-2 rounded-full text-sm font-medium',
								'border transition-colors',
								enabled
									? 'bg-blue-600 text-white border-blue-600'
									: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
							)}
						>
							{label}
						</button>
					))}
				</div>

				{/* data */}
				{showProps && <ExampleData exampleProps={exampleProps} />}

				{/* output */}
				{showOutput && <ExampleOutput exampleProps={exampleProps} />}
			</div>
		</Section>
	);
}
