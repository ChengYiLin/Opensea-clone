import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CHAIN_NAME } from "../constant/app.constant";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider
            desiredChainId={CHAIN_NAME}
            chainRpc={{
                [CHAIN_NAME]:
                    "https://goerli.infura.io/v3/bfd4eabbbfb446f480fa9495634e641c",
            }}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThirdwebProvider>
    );
}

export default MyApp;
