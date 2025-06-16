
import React, { useEffect } from 'react';
import WeddingHeader from '@/components/wedding/WeddingHeader';
import WeddingHero from '@/components/wedding/WeddingHero';
import OurStory from '@/components/wedding/OurStory';
import WeddingDetails from '@/components/wedding/WeddingDetails';
import Schedule from '@/components/wedding/Schedule';
import Gallery from '@/components/wedding/Gallery';
import GuestWishes from '@/components/wedding/GuestWishes';
import MoreInfo from '@/components/wedding/MoreInfo';
import Contact from '@/components/wedding/Contact';
import JewelrySection from '@/components/wedding/JewelrySection';
import { WeddingProvider } from '@/context/WeddingContext';

const WeddingIndex = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for header height
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          // Cleanup
        });
      });
    };
  }, []);
  
  return (
    <WeddingProvider>
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
    </WeddingProvider>
  );
};

export default WeddingIndex;
