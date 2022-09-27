import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useContract, useListings } from "@thirdweb-dev/react";
import type { Marketplace } from "@thirdweb-dev/sdk";

import { MARKETPLACE_CONTRACT_ADDRESS } from "../constant/app.constant";
import NfcCard, { INfcCard } from "../components/NftCard";
import Loading from "../components/Loading";

const Home: NextPage = () => {
    const [nftList, setNftList] = useState<INfcCard[]>([]);

    const { contract: marketContract } = useContract<Marketplace>(
        MARKETPLACE_CONTRACT_ADDRESS
    );
    const { data: nfts, isLoading } = useListings(marketContract, {
        start: 0,
        count: 25,
    });

    useEffect(() => {
        if (Array.isArray(nfts)) {
            const nftListViewData = nfts.map((nft) => ({
                imageUrl: nft.asset.image || "",
                name: nft.asset.name ? nft.asset.name.toString() : "",
                price: nft.buyoutCurrencyValuePerToken.displayValue,
                tokenId: nft.id,
                qty: +nft.quantity.toString(),
            }));

            console.log(nfts);
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
                    <div className="mb-16 grid grid-cols-2 gap-8 px-4 sm:px-0 md:grid-cols-3 xl:grid-cols-5">
                        {isLoading ? (
                            Array.from(Array(10)).map((_, index) => (
                                <div
                                    key={`skeleton_${index}`}
                                    className="animate-pulse cursor-pointer overflow-hidden rounded-md border border-slate-300 shadow"
                                >
                                    <div className="h-[280px] bg-slate-400" />
                                    <div className="p-2">
                                        <p className="h-4 w-[70%] bg-slate-400"></p>
                                        <p className="mt-4 h-4 w-[40%] bg-slate-400"></p>
                                    </div>
                                    <div className="h-8" />
                                </div>
                            ))
                        ) : (
                            <>
                                {nftList.map((nftInfo) => (
                                    <NfcCard
                                        key={nftInfo.imageUrl}
                                        imageUrl={nftInfo.imageUrl}
                                        name={nftInfo.name}
                                        price={nftInfo.price}
                                        tokenId={nftInfo.tokenId}
                                        qty={nftInfo.qty}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </section>
            <Loading open={isLoading} />
        </div>
    );
};

export default Home;
