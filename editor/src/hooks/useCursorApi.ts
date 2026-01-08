import { useRef } from 'react';
import type { CursorElement } from '../components';

export type CursorApi = {
	cursorRef: React.RefObject<CursorElement | null>;
	getCursorPosition: () => { x: number; y: number };
	setCursorPosition: (x: number, y: number) => void;
};

export function useCursorApi(): CursorApi {
	const cursorRef = useRef<CursorElement>(null);
	const cursorPositionRef = useRef<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});

	const getCursorPosition = () => cursorPositionRef.current;
	const setCursorPosition = (x: number, y: number) => {
		if (!cursorRef.current) {
			return;
		}
		cursorPositionRef.current = { x, y };
		
		cursorRef.current.style.left = `${x}px`;
		cursorRef.current.style.top = `${y}px`;
	};

	return {
		cursorRef,
		getCursorPosition,
		setCursorPosition,
	};
}
