import { EXAMPLES_PROPS } from './utils/example-props';
import { ExampleSection } from './components/ExampleSection';
import { SectionNavigator } from '../../components/SectionNavigator';

const EXAMPLE_SECTIONS = EXAMPLES_PROPS.map((props, index) => ({
	id: `example${index + 1}`,
	title: `Example ${index + 1}`,
	props,
}));

export function ExamplesPage() {
	return (
		<div className='flex flex-col gap-4 lg:flex-row lg:gap-8'>
			{/* Navigation */}
			<SectionNavigator sections={EXAMPLE_SECTIONS} />

			{/* Main content */}
			<div className='flex-1 lg:order-1 py-pageY overflow-auto'>
				{EXAMPLE_SECTIONS.map(({ id, title, props }) => (
					<ExampleSection
						key={id}
						id={id}
						title={title}
						exampleProps={props}
					/>
				))}
			</div>
		</div>
	);
}
