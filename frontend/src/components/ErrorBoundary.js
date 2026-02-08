import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card shadow-lg border-0 rounded-4 border-danger">
                                <div className="card-body p-5 text-center">
                                    <h2 className="text-danger mb-3">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        Oops! Something went wrong
                                    </h2>
                                    <p className="text-muted mb-4">
                                        We encountered an unexpected error. Please try refreshing the page.
                                    </p>
                                    {process.env.NODE_ENV === 'development' && (
                                        <div className="alert alert-secondary text-start small">
                                            <strong>Error Details:</strong>
                                            <pre className="mt-2">{this.state.error?.toString()}</pre>
                                        </div>
                                    )}
                                    <button
                                        className="btn btn-primary rounded-pill px-4 fw-bold me-2"
                                        onClick={this.resetError}
                                    >
                                        Try Again
                                    </button>
                                    <a href="/" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
                                        Go Home
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
