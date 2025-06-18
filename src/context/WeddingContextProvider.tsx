import React, { useState, useEffect } from "react";
import { WeddingData, User } from "@/types/wedding";
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
    user: User | null;
    session: Session | null;
    isLoggedIn: boolean;
    updateWeddingData: (data: Partial<WeddingData>) => void;
    saveData: () => Promise<void>;
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
        groomName: "Nithin",
        brideName: "Nithya",
        weddingQuote:
            "Together We Journey – Two souls, one path, endless love.",
    },
    story: {
        title: "Love",
        content:
            "We met on a beautiful autumn day in the local coffee shop. What started as a chance encounter over spilled coffee became the beginning of our forever love story. After three wonderful years together, Nithin proposed during a romantic sunset at our favorite beach, and Isabella said yes with tears of joy.",
    },
    weddingDetails: {
        event1: {
            title: "Ceremony",
            date: "June 15, 2024",
            time: "4:00 PM",
            venue: "St. Mary's Cathedral",
            address: "123 Cathedral Street, City, State 12345",
        },
        event2: {
            title: "Reception",
            date: "June 15, 2024",
            time: "6:30 PM",
            venue: "Grand Ballroom",
            address: "456 Reception Avenue, City, State 12345",
        },
        toKnow1: {
            title: "Getting There",
            description:
                "The venue is easily accessible by car or public transport. Free shuttle service will be provided from the ceremony to reception venue.",
        },
        toKnow2: {
            title: "What to wear",
            description:
                "Semi-formal attire requested. Ladies: cocktail dresses or elegant separates. Gentlemen: suit and tie or dress shirt with slacks.",
        },
        toKnow3: {
            title: "Parking",
            description:
                "Complimentary valet parking available at both venues. Street parking is also available on surrounding streets.",
        },
    },
    schedule: [
        {
            id: "1",
            time: "3:30 PM",
            event: "Guest Arrival",
            description: "Welcome drinks and mingling",
        },
        {
            id: "2",
            time: "4:00 PM",
            event: "Ceremony",
            description: "Wedding ceremony begins",
        },
        {
            id: "3",
            time: "5:00 PM",
            event: "Cocktail Hour",
            description: "Photos and cocktails",
        },
        {
            id: "4",
            time: "6:30 PM",
            event: "Reception",
            description: "Dinner and dancing",
        },
    ],
    gallery: [
        {
            id: "1",
            url: "/couple/gallery_1.jpg",
            caption: "Our engagement photo",
        },
        {
            id: "2",
            url: "/couple/gallery_2.jpg",
            caption: "Our family photo",
        },
        {
            id: "3",
            url: "/couple/cover_image.jpg",
            caption: "Our friends",
        },
    ],
    guestWishes: [
        {
            id: "1",
            name: "Vishnu Das",
            message: "Wishing you both a lifetime of love and happiness!",
            date: "2024-01-15",
        },
        {
            id: "2",
            name: "Sarah & Mike",
            message: "Wishing you a life filled with adventures!",
            date: "2024-01-16",
        },
        {
            id: "3",
            name: "Jenna",
            message: "Wishing you two a healthy life!",
            date: "2024-01-16",
        },
    ],
    moreInfo: {
        title: "Additional Information",
        content:
            "For dietary restrictions, please contact us at least one week before the wedding. We will have vegetarian and gluten-free options available. Children are welcome at both the ceremony and reception.",
    },
    contact: {
        phone: "+91 956 5858 855",
        email: "wedding@nithin_nithya.com",
        address: "123 Main Street, City, State 12345",
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
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Set up auth state listener
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            if (session?.user) {
                const mappedUser: User = {
                    id: session.user.id,
                    email: session.user.email || "",
                    isAuthenticated: true,
                };
                setUser(mappedUser);
                setIsLoggedIn(true);

                // Load wedding data for authenticated user
                setTimeout(() => {
                    loadWeddingData(session.user.id);
                }, 0);
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
                loadWeddingData(session.user.id);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadWeddingData = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from("wedding_data")
                .select("data")
                .eq("user_id", userId)
                .maybeSingle();

            if (error) {
                console.error("Error loading wedding data:", error);
                return;
            }

            if (data?.data) {
                setWeddingData(data.data as unknown as WeddingData);
            }
        } catch (error) {
            console.error("Error loading wedding data:", error);
        }
    };

    const updateWeddingData = (data: Partial<WeddingData>) => {
        setWeddingData((prev) => ({ ...prev, ...data }));
    };

    const saveData = async () => {
        if (!user?.id) {
            console.error("No user logged in");
            return;
        }

        try {
            const { error } = await supabase.from("wedding_data").upsert({
                user_id: user.id,
                data: weddingData as unknown as Json,
                updated_at: new Date().toISOString(),
            });

            if (error) {
                console.error("Error saving wedding data:", error);
            }
        } catch (error) {
            console.error("Error saving wedding data:", error);
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
                user,
                session,
                isLoggedIn,
                updateWeddingData,
                saveData,
                login,
                signUp,
                logout,
            }}
        >
            {children}
        </WeddingContext.Provider>
    );
};
