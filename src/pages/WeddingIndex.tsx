import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Contact from "@/components/wedding/Contact";
import Footer from "@/components/wedding/Footer";
import Gallery from "@/components/wedding/GallerySection";
import GuestWishes from "@/components/wedding/GuestWishes";
import JewelrySection from "@/components/wedding/JewelrySection";
import Loading from "@/components/wedding/Loading";
import MoreInfo from "@/components/wedding/MoreInfo";
import OurStory from "@/components/wedding/OurStory";
import Schedule from "@/components/wedding/Schedule";
import WeddingDetails from "@/components/wedding/WeddingDetails";
import WeddingHeader from "@/components/wedding/WeddingHeader";
import WeddingHero from "@/components/wedding/WeddingHero";
import useWedding from "@/hooks/useWedding";
import useSyncUsername from "@/hooks/useSyncUsername";
import scrollToElement from "@/utils/ScrollToElement";
import GallerySection from "@/components/wedding/GallerySection";

const WeddingIndex = () => {
    const { globalIsLoading } = useWedding();
    const location = useLocation();
    const { username } = useParams<{ username: string }>();

    // Use the custom hook to sync username
    useSyncUsername(username || "");

    // Add console.log for debugging
    useEffect(() => {
        console.log('WeddingIndex - URL params:', { username });
        console.log('WeddingIndex - Current pathname:', location.pathname);
    }, [username, location.pathname]);

    useEffect(() => {
        const elementId = location.state?.scrollTo;
        if (elementId) {
            scrollToElement(elementId);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <main className="relative">
            <WeddingHeader />
            <WeddingHero />
            <OurStory />
            <WeddingDetails />
            <Schedule />
            <GallerySection />
            <GuestWishes />
            <MoreInfo />
            <Contact />
            <JewelrySection />
            <Footer />
        </main>
    );
};

export default WeddingIndex;
