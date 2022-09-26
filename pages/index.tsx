import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useContract, useActiveListings } from "@thirdweb-dev/react";
import type { Marketplace } from "@thirdweb-dev/sdk";

import { MARKETPLACE_CONTRACT_ADDRESS } from "../constant/app.constant";
import NfcCard, { INfcCard } from "../components/NftCard";

const Home: NextPage = () => {
    const [nftList, setNftList] = useState<INfcCard[]>([]);

    const { contract: marketContract } = useContract<Marketplace>(
        MARKETPLACE_CONTRACT_ADDRESS
    );
    const { data: nfts, isLoading } = useActiveListings(marketContract, {
        start: 0,
        count: 25,
    });

    useEffect(() => {
        if (Array.isArray(nfts)) {
            const nftListViewData = nfts.map((nft) => ({
                imageUrl: nft.asset.image || "",
                name: nft.asset.name ? nft.asset.name.toString() : "",
                price: nft.buyoutCurrencyValuePerToken.displayValue,
            }));

            setNftList(nftListViewData);
        }
    }, [JSON.stringify(nfts)]);

    return (
        <div>
            <Head>
                <title>Opensea | Clone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="relative h-[20vh] min-h-[200px] w-full bg-[url('/banner.avif')] bg-cover bg-center">
                <div className="absolute -bottom-1/2 left-1/2 box-border h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 border-slate-300 bg-[url('/Collection.avif')] bg-cover sm:h-40 sm:w-40"></div>
            </section>
            <section>
                <div className="container mx-auto">
                    <div className="py-20 text-center">
                        <h2 className="text-3xl font-bold">PhantaBear</h2>
                        <p>
                            by{" "}
                            <span className="text-md font-bold text-slate-500">
                                EzekClub
                            </span>
                        </p>
                    </div>
                    {isLoading ? (
                        <p>Is Loading ....</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-8 px-4 sm:grid-cols-5 sm:px-0">
                            {nftList.map((nftInfo) => (
                                <NfcCard
                                    key={nftInfo.imageUrl}
                                    imageUrl={nftInfo.imageUrl}
                                    name={nftInfo.name}
                                    price={nftInfo.price}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
