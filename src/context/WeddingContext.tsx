import { createContext } from "react";
import type { WeddingContextType } from "./WeddingContextProvider";

export const WeddingContext = createContext<WeddingContextType | undefined>(
    undefined,
);
