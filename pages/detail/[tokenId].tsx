import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import type { SyntheticEvent } from "react";
import {
    useContract,
    useListing,
    useNFT,
    useBuyNow,
    useAddress,
} from "@thirdweb-dev/react";
import { ListingType, Marketplace } from "@thirdweb-dev/sdk";
import { FaEthereum, FaRegHeart } from "react-icons/fa";

import {
    MARKETPLACE_CONTRACT_ADDRESS,
    NFT_CONTRACT_ADDRESS,
} from "../../constant/app.constant";
import Loading from "../../components/Loading";

interface IDetail {
    tokenId: string;
}

const Detail: NextPage<IDetail> = () => {
    const [exchangeRate, setExchangeRate] = useState(null);

    const router = useRouter();
    const tokenId = router.query["tokenId"] as string;

    // Get Wallet Address
    const address = useAddress();

    // Get Market Place Info
    const { contract: marketContract } = useContract<Marketplace>(
        MARKETPLACE_CONTRACT_ADDRESS
    );
    const { data: marketPlaceInfo, isLoading: IsMarketInfoLoading } =
        useListing(marketContract, tokenId);

    // Get NFT Info
    const { contract: nftContract } = useContract(NFT_CONTRACT_ADDRESS);
    const { data: nftInfo, isLoading: isNftInfoLoading } = useNFT(
        nftContract,
        tokenId
    );

    // handle Buy Now
    const { mutate: buyNow, isLoading: isBuyingNow } =
        useBuyNow(marketContract);

    const handleBuyNow = (listingId: string) => {
        if (!address) {
            alert("Please Connect Your Metamask");
            return;
        }

        buyNow({
            type: ListingType.Direct,
            id: listingId,
            buyAmount: 1,
        });
    };

    // Get The Exchange Rate : eth -> USD
    useEffect(() => {
        fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
            .then((res) => res.json())
            .then((res) => {
                setExchangeRate(res["USD"]);
            })
            .catch((err) => {
                console.error("Get Exchange Rate Error ", err);
                setExchangeRate(null);
            });
    }, []);

    return (
        <div>
            <Head>
                <title>Detail - </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container mx-auto py-8">
                <div className="flex gap-8">
                    <div className="basis-2/5">
                        <div className="mx-auto w-4/5 overflow-hidden rounded-lg border-2 border-gray-300">
                            <div className="flex justify-between py-2 px-3 text-sm text-slate-500">
                                <FaEthereum className="cursor-pointer hover:text-slate-800" />
                                <FaRegHeart className="cursor-pointer hover:text-rose-300" />
                            </div>
                            {IsMarketInfoLoading ? (
                                <div className="h-[400px] animate-pulse bg-slate-300" />
                            ) : (
                                <div
                                    className="h-[400px] w-full bg-[url('/noImage.png')] bg-cover"
                                    style={{
                                        backgroundImage: `urL(${
                                            marketPlaceInfo?.asset.image ||
                                            "/noImage.png"
                                        })`,
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>
                    <div className="basis-3/5">
                        <Link href={"/"}>
                            <p className="cursor-pointer font-bold text-sky-500">
                                PHANTA BEAR
                            </p>
                        </Link>
                        <h2>
                            {marketPlaceInfo?.asset.name ? (
                                <span className="text-3xl font-bold">
                                    {marketPlaceInfo.asset.name}
                                </span>
                            ) : (
                                <span className="inline-block h-8 w-[200px] animate-pulse rounded-xl bg-slate-400" />
                            )}
                        </h2>

                        <div className="pt-6 text-sm text-slate-400">
                            Owned by{" "}
                            <span className="inline-block text-lg">
                                {marketPlaceInfo?.sellerAddress ? (
                                    `${marketPlaceInfo?.sellerAddress.slice(
                                        0,
                                        5
                                    )}...${marketPlaceInfo?.sellerAddress.slice(
                                        marketPlaceInfo.sellerAddress.length - 4
                                    )}`
                                ) : (
                                    <span className="inline-block h-4 w-[80px] animate-pulse rounded-xl bg-slate-400" />
                                )}
                            </span>
                        </div>
                        <div className="py-4">
                            {nftInfo?.type ? (
                                <p className="inline-block rounded-full bg-slate-400 py-2 px-4 text-sm text-slate-50">
                                    {nftInfo?.type}
                                </p>
                            ) : (
                                <p className="inline-block h-9 w-20 animate-pulse rounded-full bg-slate-400" />
                            )}
                        </div>

                        <div className="overflow-hidden rounded-lg border-2 border-gray-300">
                            <div className="bg-sky-50 py-2 px-4">
                                <p>Current Price</p>
                                <div className="flex items-center gap-2 py-4 text-3xl">
                                    <FaEthereum className="text-violet-700" />
                                    {
                                        marketPlaceInfo
                                            ?.buyoutCurrencyValuePerToken
                                            .displayValue
                                    }
                                    {exchangeRate &&
                                        marketPlaceInfo
                                            ?.buyoutCurrencyValuePerToken
                                            .displayValue && (
                                            <span className="self-end text-base text-slate-500">
                                                {`$${(
                                                    +marketPlaceInfo
                                                        .buyoutCurrencyValuePerToken
                                                        .displayValue *
                                                    exchangeRate
                                                ).toFixed(2)}`}
                                            </span>
                                        )}
                                </div>
                                <p className="">
                                    {`Remaining : ${
                                        marketPlaceInfo?.quantity.toString() ||
                                        ""
                                    }`}
                                </p>
                                <div className="flex py-4">
                                    {marketPlaceInfo?.quantity.toString() ===
                                    "0" ? (
                                        <button className="basis-1/2 cursor-not-allowed rounded-xl bg-rose-500 p-4 text-white hover:opacity-80">
                                            Sold Out
                                        </button>
                                    ) : (
                                        <button
                                            className="basis-1/2 rounded-xl bg-blue-500 p-4 text-white hover:opacity-80"
                                            onClick={() =>
                                                handleBuyNow(tokenId)
                                            }
                                        >
                                            Buy Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loading
                open={isNftInfoLoading || IsMarketInfoLoading || isBuyingNow}
            />
        </div>
    );
};

export default Detail;
