import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider
            desiredChainId={ChainId.Goerli}
            chainRpc={{
                [ChainId.Goerli]:
                    "https://goerli.infura.io/v3/bfd4eabbbfb446f480fa9495634e641c",
            }}
        >
            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}

export default MyApp;
