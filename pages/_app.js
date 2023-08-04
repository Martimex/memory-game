import ErrorBoundary from '../src/components/error_boundary';
import '../src/index.css'
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <ErrorBoundary>
                <Component {...pageProps} />
            </ErrorBoundary>
        </SessionProvider>
    );
}