import type { FC, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

interface ILayout {
    children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
    const connectMetamask = useMetamask();
    const userAddress = useAddress();

    const handelConnect = () => {
        connectMetamask();
    };

    return (
        <div className="flex min-h-screen w-full flex-col overflow-hidden">
            <header className="border-b-2 bg-white">
                <div className="container mx-auto flex justify-between py-4 px-4 sm:px-0">
                    <Link href={"/"} className="cursor-pointer">
                        <h1 className="flex items-center font-extrabold">
                            <Image src="/opensea.svg" width={36} height={36} />
                            <span className="pl-2 text-xl sm:pl-4 sm:text-2xl">
                                Opensea
                            </span>
                        </h1>
                    </Link>
                    <button
                        className="max-w-[120px] truncate  rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-5 text-white hover:opacity-80 sm:max-w-[200px]"
                        onClick={handelConnect}
                    >
                        {userAddress ? userAddress : "Connect MetaMask"}
                    </button>
                </div>
            </header>
            <main className="grow pt-14">{children}</main>
            <footer className="bg-blue-500">
                <div className="container mx-auto">
                    <p className="py-4 text-center text-white">
                        © Martin Lin 2022
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
