
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FadeIn from './animations/FadeIn';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [email, setEmail] = useState('');
  
  const messages = [
    "List of top 50 active Baltic early stage VCs",
    "All Baltic female founders who raised capital 2024",
    "AI-native Baltic startups that secured funding this year"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fading out
      setOpacity(0);
      
      // Change message after fade out
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        // Start fading in
        setOpacity(1);
      }, 1000);
    }, 4000); // Total time for each message
    
    return () => clearInterval(interval);
  }, [messages.length]);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      // Here you would typically send this to a backend
      alert(`Thanks for subscribing with ${email}!`);
      setEmail('');
    }
  };
  
  return (
    <section className={cn('relative min-h-screen flex items-center overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/a0278ce1-b82d-4ed6-a186-14a9503ef65c.png" 
          alt="Orangery" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-tight mb-6">
              Orangery Ventures
            </h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Backing overlooked founders in the Baltics with the first check
            </p>
          </FadeIn>
          
          <FadeIn delay={400}>
            <div className="flex justify-center mb-8">
              <Button 
                variant="outline" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 min-h-[3.5rem] min-w-[250px] md:min-w-[400px]"
              >
                <span 
                  className="transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: opacity }}
                >
                  {messages[messageIndex]}
                </span>
              </Button>
            </div>
          </FadeIn>
          
          <FadeIn delay={500}>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="text-gray-800 bg-white/90 border-0 focus-visible:ring-orangery-500" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-orangery-500 hover:bg-orangery-600 text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
