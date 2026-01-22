import { cls, isPlainObject} from 'code-editor';
import { formatPropValue, type ExampleProps } from '../utils/example-props';

export function ExampleData({ exampleProps }: { exampleProps: ExampleProps }) {
	return (
		<>
			<div
				className={cls(
					'bg-surface-muted border border-outline-subtle rounded-md',
					'flex flex-col gap-1 p-4',
				)}
			>
				{Object.entries(exampleProps).map(([key, value], index) =>
					isPlainObject(value)
						? Object.entries(value).map(
								([keyInner, value], index) =>
									KeyValue({
										index,
										key: key + '.' + keyInner,
										value,
									}),
							)
						: KeyValue({ index, key, value }),
				)}
			</div>
		</>
	);
}

function KeyValue({
	index,
	key,
	value,
}: {
	index: number;
	key: string;
	value: unknown;
}) {
	return (
		<div key={index} className='flex gap-2'>
			<pre className=''>{key}:</pre>

			<pre className='flex-1 overflow-auto max-h-20 text-text-primary'>
				{formatPropValue(value)}
			</pre>
		</div>
	);
}
