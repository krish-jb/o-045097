import React, { useEffect } from "react";
import WeddingHeader from "@/components/wedding/WeddingHeader";
import WeddingHero from "@/components/wedding/WeddingHero";
import OurStory from "@/components/wedding/OurStory";
import WeddingDetails from "@/components/wedding/WeddingDetails";
import Schedule from "@/components/wedding/Schedule";
import Gallery from "@/components/wedding/Gallery";
import GuestWishes from "@/components/wedding/GuestWishes";
import MoreInfo from "@/components/wedding/MoreInfo";
import Contact from "@/components/wedding/Contact";
import Footer from "@/components/wedding/Footer";
import JewelrySection from "@/components/wedding/JewelrySection";
import { useWedding } from "@/context/useWedding";
import Loading from "@/components/wedding/Loading";

const WeddingIndex = () => {
    const { gloabalIsLoading } = useWedding();

    if (gloabalIsLoading) {
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
