import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Contact from "@/components/wedding/Contact";
import Footer from "@/components/wedding/Footer";
import Gallery from "@/components/wedding/Gallery";
import GuestWishes from "@/components/wedding/GuestWishes";
import JewelrySection from "@/components/wedding/JewelrySection";
import Loading from "@/components/wedding/Loading";
import MoreInfo from "@/components/wedding/MoreInfo";
import OurStory from "@/components/wedding/OurStory";
import Schedule from "@/components/wedding/Schedule";
import WeddingDetails from "@/components/wedding/WeddingDetails";
import WeddingHeader from "@/components/wedding/WeddingHeader";
import WeddingHero from "@/components/wedding/WeddingHero";
import { useWedding } from "@/context/useWedding";
import scrollToElement from "@/utils/ScrollToElement";

const WeddingIndex = () => {
    const { globalIsLoading } = useWedding();
    const location = useLocation();

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
            <Gallery />
            <GuestWishes />
            <MoreInfo />
            <Contact />
            <JewelrySection />
            <Footer />
        </main>
    );
};

export default WeddingIndex;
