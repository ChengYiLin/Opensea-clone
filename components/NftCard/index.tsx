import type { FC, SyntheticEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";
import { useBuyNow, useContract, useAddress } from "@thirdweb-dev/react";
import { ListingType, Marketplace } from "@thirdweb-dev/sdk";

import { MARKETPLACE_CONTRACT_ADDRESS } from "../../constant/app.constant";
import Loading from "../Loading";

export interface INfcCard {
    imageUrl: string;
    name: string;
    price: string;
    tokenId: string;
    qty: number;
}

const NfcCard: FC<INfcCard> = ({ imageUrl, name, price, tokenId, qty }) => {
    const [showBuyButton, setShowBuyButton] = useState(false);

    const address = useAddress();

    const { contract: marketContract } = useContract<Marketplace>(
        MARKETPLACE_CONTRACT_ADDRESS
    );
    const { mutate: buyNow, isLoading } = useBuyNow(marketContract);

    const handleBuyNow = (e: SyntheticEvent, listingId: string) => {
        e.preventDefault();
        e.stopPropagation();

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

    return (
        <Link href={`/detail/${tokenId}`}>
            <div
                className="cursor-pointer overflow-hidden rounded-md border border-slate-300 shadow"
                onMouseEnter={() => setShowBuyButton(true)}
                onMouseLeave={() => setShowBuyButton(false)}
            >
                <div className="h-[280px] overflow-hidden ">
                    <div
                        className={`h-full bg-cover bg-center transition-all ${
                            showBuyButton ? "scale-110" : "scale-100"
                        }`}
                        style={{
                            backgroundImage: `urL(${imageUrl})`,
                        }}
                    />
                </div>
                <div className="p-2">
                    <p>{name}</p>
                    <div className="flex items-center">
                        <FaEthereum />
                        <span className="pl-2">{price} Eth</span>
                    </div>
                </div>
                <div className="relative h-8 px-2">
                    {qty > 0 ? (
                        <>
                            <p>Remaining: {qty}</p>
                            <div
                                className={`absolute inset-x-0 flex h-8 items-center justify-center bg-sky-400 font-bold text-white transition-all ${
                                    showBuyButton ? "top-0" : "top-full"
                                }`}
                                onClick={(e) => handleBuyNow(e, tokenId)}
                            >
                                Buy Now
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-rose-500 text-white">
                            Sold Out
                        </div>
                    )}
                </div>
                <Loading open={isLoading} />
            </div>
        </Link>
    );
};

export default NfcCard;
