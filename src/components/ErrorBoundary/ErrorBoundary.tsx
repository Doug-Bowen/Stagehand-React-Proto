import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <h1>There was an error, please go back and try again.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
