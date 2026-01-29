import { Routes, Route, Navigate } from 'react-router-dom';
import { EditorPlayground } from '../';

export function EditorRouter() {
	return (
		<Routes>
			<Route index element={<Navigate to='playground' replace />} />
			<Route path='playground' element={<EditorPlayground />} />
		</Routes>
	);
}
