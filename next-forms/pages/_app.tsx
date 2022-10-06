import '../styles/globals.css';
import { AppProps } from 'next/app';
import { AuthProvider } from '../lib/AuthContext';

const App = ({ Component, pageProps }: AppProps) => {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </>
    );
};

export default App;