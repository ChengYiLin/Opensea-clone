import { FC, Fragment } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ILoading {
    open: boolean;
}

const Loading: FC<ILoading> = ({ open }) => {
    return open ? (
        <div className="fixed inset-0 flex justify-center bg-slate-500 opacity-75">
            <div className="pt-[10vh]">
                <AiOutlineLoading3Quarters className="animate-spin text-6xl text-white" />
            </div>
        </div>
    ) : (
        <Fragment />
    );
};

export default Loading;
