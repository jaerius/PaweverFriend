import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { WalletProvider } from './walletContext'
import { AuthProvider } from '../components/auth';

function MyApp({ Component, pageProps }) {
    return(
        <AuthProvider>
        <WalletProvider>
        <ThemeProvider attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
        </WalletProvider>
        </AuthProvider>
    );
}

export default MyApp
