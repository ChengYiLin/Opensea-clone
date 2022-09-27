import type { FC } from "react";
import { useState } from "react";
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";

export interface INfcCard {
    imageUrl: string;
    name: string;
    price: string;
    tokenId: string;
}

const NfcCard: FC<INfcCard> = ({ imageUrl, name, price, tokenId }) => {
    const [showBuyButton, setShowBuyButton] = useState(false);

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
                <div className="relative h-8">
                    <div
                        className={`absolute inset-x-0 flex h-8 items-center justify-center bg-sky-400 font-bold text-white transition-all ${
                            showBuyButton ? "top-0" : "top-full"
                        }`}
                    >
                        Buy Now
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NfcCard;
