import { HeartIcon } from "lucide-react";
import React, { ReactNode } from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex h-screen w-full justify-center items-center ">
            <HeartIcon className="animate-bounce w-10 h-10 rounded-full" />
        </div>
    );
};

export default Loading;
