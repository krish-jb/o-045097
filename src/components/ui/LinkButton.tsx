import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

interface LinkButtonProps {
    text: string;
    onClick: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({
    text = "LinkButton",
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onClick={onClick}
            className={`flex items-center justify-center bg-white py-2 border-b-2 transition-all duration-300 tr hover:border-black hover:px-4 hover:tracking-wider select-none outline-none`}
        >
            {text}
            <span
                className={`ml-0 transition-transform duration-200 ${
                    isHovered ? "ml-3" : ""
                }`}
            >
                <div
                    className={`w-2 h-2 opacity-0 rounded-full duration-200 ${isHovered ? "w-5 h-5 opacity-100" : ""}`}
                >
                    <ArrowRight
                        className={`-ml-2 w-full h-full transition-transform duration-200 ${isHovered ? "text-black translate-x-2" : "text-white"}`}
                    />
                </div>
            </span>
        </button>
    );
};

export default LinkButton;
