import { Link } from "react-router-dom";

export function HomePage() {

	return (
		<div className='flex flex-col gap-2 mt-20 text-center'>
			<Link className='text-lg font-semibold' to='/editor'>Try Editor ↗</Link>
			<Link className='text-lg font-semibold' to='/workbench'>Try Workbench ↗</Link>
		</div>
	);
}
