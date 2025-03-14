
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import Button from './ui-custom/Button';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer id="contact" className={cn('py-20 md:py-32 bg-white border-t border-gray-100', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-16 md:mb-24">
          <FadeIn>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-6">Get in touch</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Whether you're a founder looking for funding or a potential partner, we'd love to hear from you.
              </p>
              <form className="space-y-4 max-w-md">
                <div>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orangery-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orangery-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Message" 
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orangery-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <Button type="submit" size="lg">Send Message</Button>
              </form>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-medium mb-6">Our offices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-2">San Francisco</h4>
                  <address className="text-muted-foreground not-italic mb-4">
                    1234 Market Street<br />
                    Suite 500<br />
                    San Francisco, CA 94103
                  </address>
                </div>
                <div>
                  <h4 className="font-medium mb-2">London</h4>
                  <address className="text-muted-foreground not-italic mb-4">
                    45 King's Road<br />
                    Chelsea<br />
                    London, SW3 4ND
                  </address>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Singapore</h4>
                  <address className="text-muted-foreground not-italic mb-4">
                    42 Carpenter Street<br />
                    #04-01<br />
                    Singapore 059921
                  </address>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Berlin</h4>
                  <address className="text-muted-foreground not-italic mb-4">
                    Friedrichstraße 68<br />
                    10117 Berlin<br />
                    Germany
                  </address>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-serif font-medium tracking-tight">
              Orangery Ventures
            </Link>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/" className="text-sm hover:text-orangery-500 transition-colors">Home</Link>
            <Link to="/#manifesto" className="text-sm hover:text-orangery-500 transition-colors">Manifesto</Link>
            <Link to="/#about" className="text-sm hover:text-orangery-500 transition-colors">About</Link>
            <Link to="/#contact" className="text-sm hover:text-orangery-500 transition-colors">Contact</Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Orangery Ventures. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
