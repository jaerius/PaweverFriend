import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { WalletProvider } from './walletContext'

function MyApp({ Component, pageProps }) {
    return(
        <WalletProvider>
        <ThemeProvider attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
        </WalletProvider>
    );
}

export default MyApp
