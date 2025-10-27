import Routes from './Routes';
import AuthenticationProvider from './contexts/Authentication/Authentication';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <AuthenticationProvider>
                <Routes />
            </AuthenticationProvider>
        </ErrorBoundary>
    );
}

export default App;
