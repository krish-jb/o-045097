import type React from "react";
import { useEffect } from "react";
import AddNewImage from "@/components/ui-custom/AddNewImage";
import Footer from "@/components/wedding/Footer";
import Gallery from "@/components/wedding/Gallery";
import WeddingHeader from "@/components/wedding/WeddingHeader";

const AllImages: React.FC = () => {
    const limit = import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 10;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
