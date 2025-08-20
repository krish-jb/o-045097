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
import  useWedding from "@/hooks/useWedding";
import scrollToElement from "@/utils/ScrollToElement";
import GallerySection from "@/components/wedding/GallerySection";

const WeddingIndex = () => {
    const { globalIsLoading, setUser } = useWedding();
    const location = useLocation();
    const { username } = useParams<{ username: string }>();

    // Add this useEffect to extract and set username
    useEffect(() => {
        console.log('WeddingIndex - URL params:', { username });
        console.log('WeddingIndex - Current pathname:', location.pathname);
        
        if (username) {
            console.log('WeddingIndex - Setting username in context:', username);
            setUser(prev => ({ 
                ...prev, 
                username: username 
            }));
        }
    }, [username, location.pathname, setUser]);

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
