import type React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddNewImage from "@/components/ui-custom/AddNewImage";
import Footer from "@/components/wedding/Footer";
import Gallery from "@/components/wedding/Gallery";
import WeddingHeader from "@/components/wedding/WeddingHeader";
import useSyncUsername from "@/hooks/useSyncUsername";

const AllImages: React.FC = () => {
    const limit = import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 10;
    const { username } = useParams<{ username: string }>();

    // Use the custom hook to sync username
    useSyncUsername(username || "");

    // Add console.log for debugging
    useEffect(() => {
        console.log('Gallery - URL params:', { username });
        window.scrollTo(0, 0);
    }, [username]);

    return (
        <>
            <WeddingHeader />
            <Gallery limit={limit}>
                <AddNewImage />
            </Gallery>
            <Footer />
        </>
    );
};

export default AllImages;
