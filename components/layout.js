import Head from 'next/head';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
    return (
        <div className="bg-primary">   
            <Head>
                <title>Pawever Friend</title>
                <meta name="description" content="반려견 입양 플랫폼" />
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            <Header/>              
            <div>{children}</div>
            <Footer/>
        </div>
    );
}
