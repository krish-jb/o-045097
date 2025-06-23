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
import JewelrySection from "@/components/wedding/JewelrySection";

const WeddingIndex = () => {
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
        </main>
    );
};

export default WeddingIndex;
