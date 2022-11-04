import { AppProps } from 'next/app';
import '../styles/globals.css';

const PortalGatewayApp = ({ Component, pageProps }: AppProps) => (
    <Component {...pageProps} />
);

export default PortalGatewayApp;
