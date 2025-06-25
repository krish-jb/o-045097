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

const WeddingIndex = () => {
    const { globalIsLoading } = useWedding();

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
