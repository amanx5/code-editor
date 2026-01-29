import { Component } from 'react';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';

export type ErrorBoundaryProps = {
	children: React.ReactNode;
	Fallback?: typeof ErrorBoundaryFallback;
};

export type ErrorBoundaryState = {
	error: Error | null;
};

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = { error: null };

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	componentDidCatch() {}

	render() {
		const { children, Fallback } = this.props;
		const FallbackComponent = Fallback ?? ErrorBoundaryFallback;

		return this.state.error instanceof Error ? (
			<FallbackComponent error={this.state.error} />
		) : (
			children
		);
	}
}
