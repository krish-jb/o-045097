import { createContext } from "react";
import { WeddingContextType } from "./WeddingContextProvider";

export const WeddingContext = createContext<WeddingContextType | undefined>(
    undefined,
);
