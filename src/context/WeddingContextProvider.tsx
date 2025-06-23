import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { WeddingData, User, WeddingWishType } from "@/types/wedding";
import { supabase } from "@/integrations/supabase/client";
import {
    AuthError,
    Session,
    User as SupabaseUser,
} from "@supabase/supabase-js";
import { Json } from "@/integrations/supabase/types";
import { WeddingContext } from "./WeddingContext";

export interface WeddingContextType {
    weddingData: WeddingData;
    weddingWishes: WeddingWishType;
    setWeddingWishes: Dispatch<SetStateAction<WeddingWishType>>;
    user: User | null;
    session: Session | null;
    isLoggedIn: boolean;
    gloabalIsLoading: boolean;
    updateWeddingData: (data: Partial<WeddingData>) => void;
    loadAllWeddingWishes: () => Promise<void>;
    saveData: (data: WeddingData) => Promise<void>;
    addWish: (data: WeddingWishType[number]) => Promise<void>;
    login: (
        email: string,
        password: string,
    ) => Promise<{ error: AuthError | null }>;
    signUp: (
        email: string,
        password: string,
        fullName?: string,
    ) => Promise<{ error: AuthError | null }>;
    logout: () => Promise<void>;
}

const defaultWeddingData: WeddingData = {
    couple: {
        groomName: "",
        brideName: "",
        weddingQuote: "",
        image: "/couple/white.png",
    },
    story: {
        title: "",
        content: "",
        image: "/couple/white.png",
    },
    weddingDetails: {
        event1: {
            title: "",
            date: "",
            time: "",
            venue: "",
            address: "",
        },
        event2: {
            title: "",
            date: "",
            time: "",
            venue: "",
            address: "",
        },
        toKnow1: {
            title: "",
            description: "",
        },
        toKnow2: {
            title: "",
            description: "",
        },
        toKnow3: {
            title: "",
            description: "",
        },
    },
    schedule: [
        {
            id: "1",
            time: "",
            event: "",
            description: "",
        },
        {
            id: "2",
            time: "",
            event: "",
            description: "",
        },
        {
            id: "3",
            time: "",
            event: "",
            description: "",
        },
        {
            id: "4",
            time: "",
            event: "",
            description: "",
        },
    ],
    gallery: [
        {
            id: "1",
            url: "/couple/white.png",
            caption: null,
        },
        {
            id: "2",
            url: "/couple/white.png",
            caption: null,
        },
        {
            id: "3",
            url: "/couple/white.png",
            caption: null,
        },
    ],
    moreInfo: {
        title: "",
        content: "",
    },
    contact: {
        phone: "",
        email: "",
        address: "",
    },
    jeweller: {
        title: "Our Wedding Jeweller",
        description:
            "Discover exquisite wedding rings and jewellery collections from our trusted partner.",
        shopName: "Edimannickal Gold and Diamonds",
        website:
            "https://www.instagram.com/edimannickalgoldanddiamonds?igsh=czd3ZzV3bjNvMQ==",
    },
};

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [weddingData, setWeddingData] =
        useState<WeddingData>(defaultWeddingData);
    const [weddingWishes, setWeddingWishes] = useState<WeddingWishType>([]);
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [gloabalIsLoading, setGloabalIsLoading] = useState(true);

    useEffect(() => {
        // Set up auth state listener
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            setTimeout(() => {
                loadWeddingData(import.meta.env.VITE_WEBSITE_KEY);
            }, 0);
            if (session?.user) {
                const mappedUser: User = {
                    id: session.user.id,
                    email: session.user.email || "",
                    isAuthenticated: true,
                };
                setUser(mappedUser);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        });

        // Check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                const mappedUser: User = {
                    id: session.user.id,
                    email: session.user.email || "",
                    isAuthenticated: true,
                };
                setUser(mappedUser);
                setIsLoggedIn(true);
                loadWeddingData(import.meta.env.VITE_WEBSITE_KEY);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadWeddingData = async (id: string) => {
        try {
            const { data: weddingData, error: weddingError } = await supabase
                .from("wedding_data")
                .select("data")
                .eq("id", id)
                .maybeSingle();

            const { data: wishData, error: wishError } = await supabase
                .from("guest_wishes")
                .select("id, name, message")
                .eq("variant", id)
                .order("created_at", { ascending: false })
                .limit(3);

            if (weddingError) {
                console.error("Error loading wedding data:", weddingError);
                return;
            }

            if (wishError) {
                console.error("Error loading wish data: ", wishError);
            }

            if (weddingData?.data) {
                setWeddingData(weddingData.data as unknown as WeddingData);
                setGloabalIsLoading(false);
            }

            if (wishData) {
                setWeddingWishes(wishData);
            }
        } catch (error) {
            console.error("Error loading wedding data:", error);
        }
    };

    const loadAllWeddingWishes = async () => {
        try {
            const { data: wishData, error: wishError } = await supabase
                .from("guest_wishes")
                .select("id, name, message")
                .eq("variant", import.meta.env.VITE_WEBSITE_KEY)
                .order("created_at", { ascending: false });

            if (wishError) {
                console.log(
                    "Error loading all wishes (Supabase error): ",
                    wishError,
                );
                return;
            }

            if (wishData) {
                setWeddingWishes(wishData);
            }
        } catch (error) {
            console.log("Error loading all wishes: ", error);
        }
    };

    const updateWeddingData = (data: Partial<WeddingData>) => {
        setWeddingData((prev) => {
            const updated = { ...prev, ...data };
            saveData(updated); // save to backend

            return updated;
        });
    };

    const saveData = async (data: WeddingData) => {
        if (!user?.id) {
            console.error("No user logged in");
            return;
        }

        try {
            const { error } = await supabase.from("wedding_data").upsert(
                {
                    user_id: user.id,
                    data: data as unknown as Json,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: "user_id" },
            );

            if (error) {
                console.error("Error saving wedding data:", error);
            }
        } catch (error) {
            console.error("Error saving wedding data:", error);
        }
    };

    const addWish = async (wish: WeddingWishType[number]) => {
        try {
            const { error } = await supabase.from("guest_wishes").insert({
                name: wish.name,
                message: wish.message,
                variant: import.meta.env.VITE_WEBSITE_KEY,
            });

            if (error) {
                console.log("Error adding new wish(Supabase error)", error);
            }
        } catch (error) {
            console.log("Error adding new wish", error);
        }
    };

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const signUp = async (
        email: string,
        password: string,
        fullName?: string,
    ) => {
        const redirectUrl = `${window.location.origin}/`;

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: redirectUrl,
                data: {
                    full_name: fullName,
                },
            },
        });
        return { error };
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <WeddingContext.Provider
            value={{
                weddingData,
                weddingWishes,
                setWeddingWishes,
                loadAllWeddingWishes,
                user,
                session,
                isLoggedIn,
                gloabalIsLoading,
                updateWeddingData,
                saveData,
                addWish,
                login,
                signUp,
                logout,
            }}
        >
            {children}
        </WeddingContext.Provider>
    );
};
