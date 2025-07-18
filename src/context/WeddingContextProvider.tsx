import type { AuthError, Session } from "@supabase/supabase-js";
import type React from "react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { User, WeddingData, WeddingWishType } from "@/types/wedding";
import uploadImage from "@/utils/UploadImage";
import { WeddingContext } from "./WeddingContext";

export interface WeddingContextType {
    weddingData: WeddingData;
    weddingWishes: WeddingWishType;
    setWeddingWishes: Dispatch<SetStateAction<WeddingWishType>>;
    user: User | null;
    session: Session | null;
    isLoggedIn: boolean;
    globalIsLoading: boolean;
    updateWeddingData: (data: Partial<WeddingData>) => Promise<boolean>;
    updateGalleryImage: (
        file: File | null,
        imageCaption: string | null,
        index: number,
    ) => Promise<void>;
    loadAllWeddingWishes: () => Promise<void>;
    saveData: (data: WeddingData) => Promise<boolean>;
    addWish: (data: WeddingWishType[number]) => Promise<void>;
    login: (
        email: string,
        password: string,
    ) => Promise<{ error: AuthError | null }>;
    logout: () => Promise<void>;
}

const defaultWeddingData: WeddingData = {
    couple: {
        groomName: "Nithin",
        brideName: "Nithya",
        weddingQuote:
            "Together We Journey – Two souls, one path, endless love.",
        image: "/couple/white.png",
    },
    story: {
        title: "Brewing Love",
        content:
            "We met on a beautiful autumn day in the local coffee shop. What started as a chance encounter over spilled coffee became the beginning of our forever love story. After three wonderful years together, Nithin proposed during a romantic sunset at our favorite beach, and Nithya said yes with tears of joy.",
        image: "/couple/white.png",
    },
    weddingDetails: {
        event1: {
            title: "Ceremony",
            date: "June 15, 2024",
            time: "4:00 PM",
            venue: "St. Mary's Cathedral",
            address: "123 Cathedral Street, City, State 12345",
            addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
        },
        event2: {
            title: "Reception",
            date: "June 15, 2024",
            time: "6:30 PM",
            venue: "Grand Ballroom",
            address: "456 Reception Avenue, City, State 12345",
            addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
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
            id: "0",
            url: "/couple/white.png",
            caption: null,
            name: null,
        },
        {
            id: "1",
            url: "/couple/white.png",
            caption: null,
            name: null,
        },
        {
            id: "2",
            url: "/couple/white.png",
            caption: null,
            name: null,
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
        addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
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
    const [globalIsLoading, setGloabalIsLoading] = useState(true);

    useEffect(() => {
        // Set up auth state listener
        const loadWeddingData = async (id: string) => {
            try {
                const { data: weddingData, error: weddingError } =
                    await supabase
                        .from("wedding_data")
                        .select("data")
                        .eq("user_id", id)
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

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, session) => {
            flushSync(() => setSession(session));
            loadWeddingData(import.meta.env.VITE_WEBSITE_KEY);

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

    const updateWeddingData = async (
        data: Partial<WeddingData>,
    ): Promise<boolean> => {
        const prev = structuredClone(weddingData);
        const updated = { ...weddingData, ...data };

        setWeddingData(updated);

        const success = await saveData(updated);

        if (!success) setWeddingData(prev);

        return success;
    };

    const updateGalleryImage = async (
        file: File | null,
        imageCaption: string | null,
        index: number,
    ) => {
        const imageId = `${Date.now()}-${crypto.randomUUID()}`;
        const imageName = `gallery_image_${imageId}`;

        const updatedGallery = [...weddingData.gallery];

        if (index >= updatedGallery.length) {
            updatedGallery.push({
                id: imageId,
                url: "",
                caption: imageCaption,
                name: imageName,
            });
        }

        if (file) {
            const imageUrl = await uploadImage(file, user, imageName);
            if (!imageUrl) return;
            updatedGallery[index].url = imageUrl;
        }

        updatedGallery[index].caption = imageCaption;
        updateWeddingData({ gallery: updatedGallery });
    };

    const saveData = async (data: WeddingData): Promise<boolean> => {
        if (!user?.id) {
            console.error("No user logged in");
            return false;
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
                return false;
            }
        } catch (error) {
            console.error("Error saving wedding data:", error);
            return false;
        }
        return true;
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
                globalIsLoading,
                updateWeddingData,
                updateGalleryImage,
                saveData,
                addWish,
                login,
                logout,
            }}
        >
            {children}
        </WeddingContext.Provider>
    );
};
