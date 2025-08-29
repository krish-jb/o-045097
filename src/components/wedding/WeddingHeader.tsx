import type React from "react";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import useWedding from "@/hooks/useWedding";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import scrollToElement from "@/utils/ScrollToElement";

// Navigation button component
const NavButton: React.FC<{
  item: { id: string; label: string };
  isActive: boolean;
  onClick: (id: string) => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
  mobile?: boolean;
}> = ({ item, isActive, onClick, buttonRef, mobile }) => (
  <button
    ref={buttonRef}
    className={cn(
      mobile
        ? "flex items-center w-full text-left p-4 rounded-xl transition-all duration-300"
        : "relative text-sm font-medium transition-all duration-500 py-2 px-3",
      isActive
        ? mobile
          ? "bg-orange-50 text-orange-600 shadow-sm"
          : "text-black font-semibold"
        : mobile
        ? "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
        : "text-neutral-700 hover:text-black"
    )}
    onClick={() => onClick(item.id)}
    type="button"
  >
    <span className={mobile ? "text-base font-medium" : undefined}>
      {item.label}
    </span>
    {isActive && mobile && (
      <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full" />
    )}
  </button>
);

// Custom hook for event listeners
const useEventListener = (
  event: string,
  handler: EventListener,
  element: Window | Document = window,
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    element.addEventListener(event, handler, { passive: true });
    return () => element.removeEventListener(event, handler);
  }, deps);
};

// Custom hook for debounced values
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

const WeddingHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  
  const { isLoggedIn, logout, weddingData } = useWedding();
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollY = useRef(0);
  const animationFrameRef = useRef<number>();

    const navigationItems = useMemo(
        () => [
            { id: "hero", label: "Home", disabled: false },
            {
                id: "story",
                label: "Our Story",
                disabled: weddingData?.story?.disabled,
            },
            {
                id: "details",
                label: "Details",
                disabled: weddingData?.weddingDetails?.disabled,
            },
            { id: "schedule", label: "Schedule", disabled: false },
            { id: "gallery", label: "Gallery", disabled: false },
            {
                id: "wishes",
                label: "Wishes",
                disabled: weddingData?.wishDisabled,
            },
            {
                id: "contact",
                label: "Contact",
                disabled: weddingData?.contact?.disabled,
            },
            { id: "info", label: "Info", disabled: true },
            {
                id: "jewellery",
                label: "Jewellery",
                disabled: weddingData?.jeweller?.disabled,
            },
        ],
        [
            weddingData?.story?.disabled,
            weddingData?.weddingDetails?.disabled,
            weddingData?.wishDisabled,
            weddingData?.contact?.disabled,
            weddingData?.jeweller?.disabled,
        ],
    );

  // Debounced active section for smoother transitions
  const debouncedActiveSection = useDebounce(activeSection, 50);

  const updateUnderlinePosition = useCallback((sectionId: string) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      const activeButton = buttonRefs.current[sectionId];
      const navContainer = navRef.current;
      
      if (activeButton && navContainer) {
        const navRect = navContainer.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        setUnderlineStyle({
          left: buttonRect.left - navRect.left,
          width: buttonRect.width,
          opacity: 1,
        });
      }
    });
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 10);
    
    // Track scroll direction for better section detection
    setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
    lastScrollY.current = currentScrollY;
    
    // Set user scrolling state
    setIsUserScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Reset user scrolling state after scroll ends
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 150);
  }, []);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    setIsMobileMenuOpen(false);
    
    // Immediately update active section for instant visual feedback
    setActiveSection(id);
    
    if (location.pathname !== `/${username}`) {
      navigate(`/${username}`, { state: { scrollTo: id } });
      return;
    }
    
    // Disable observer temporarily during programmatic scroll
    setIsUserScrolling(true);
    scrollToElement(id);
    
    // Re-enable observer after scroll animation
    setTimeout(() => {
      setIsUserScrolling(false);
    }, 800);
  }, [location.pathname, username, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    setIsMobileMenuOpen(false);
    toast({ title: "You have logged out!" });
  }, [logout]);

  const brandText = useMemo(() => 
    `${weddingData?.couple?.groomName?.[0] || ""} & ${weddingData?.couple?.brideName?.[0] || ""} Wedding`,
    [weddingData?.couple?.groomName, weddingData?.couple?.brideName]
  );

  // Enhanced scroll event listener
  useEventListener("scroll", handleScroll);
  useEventListener("keydown", handleKeyDown, document, [isMobileMenuOpen]);
  
  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      updateUnderlinePosition(activeSection);
    });
  }, [activeSection, updateUnderlinePosition]);
  
  useEventListener("resize", handleResize, window, [handleResize]);

  // Enhanced IntersectionObserver for perfect section detection
  useEffect(() => {
    const sections = navigationItems
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates during user scrolling to prevent conflicts
        if (isUserScrolling) return;
        
        // Get all visible sections with their intersection data
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            boundingRect: entry.boundingClientRect,
            rootBounds: entry.rootBounds,
          }))
          .sort((a, b) => {
            // Prioritize sections based on scroll direction and visibility
            if (scrollDirection === 'down') {
              // When scrolling down, prioritize the section closest to the top
              return a.boundingRect.top - b.boundingRect.top;
            } else {
              // When scrolling up, prioritize the section with highest intersection ratio
              return b.ratio - a.ratio;
            }
          });

        if (visibleSections.length > 0) {
          const newActiveSection = visibleSections[0].id;
          
          // Only update if the section actually changed
          if (newActiveSection !== activeSection) {
            setActiveSection(newActiveSection);
          }
        }
      },
      {
        // More granular thresholds for precise detection
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        // Adjusted root margin for better section boundaries
        rootMargin: "-15% 0px -60% 0px"
      }
    );

    sections.forEach(section => observer.observe(section));
    
    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [navigationItems, isUserScrolling, scrollDirection, activeSection]);

  // Update underline position with smooth animation
  useEffect(() => {
    updateUnderlinePosition(debouncedActiveSection);
  }, [debouncedActiveSection, updateUnderlinePosition]);
  
  // Handle body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled
            ? "py-3 bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-lg"
            : "py-5 bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link
            to={`/${username}`}
            className="text-xl font-serif font-medium tracking-tight transition-all duration-300 hover:opacity-80 hover:scale-105 transform"
          >
            {brandText}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6 relative" ref={navRef}>
              {/* Enhanced animated underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-black via-gray-800 to-black transition-all duration-500 ease-out rounded-full"
                style={{
                  left: `${underlineStyle.left}px`,
                  width: `${underlineStyle.width}px`,
                  opacity: underlineStyle.opacity,
                  transform: 'translateY(8px)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              
              {navigationItems.filter((item) => !item.disabled)
                .map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={scrollToSection}
                  buttonRef={(el) => { buttonRefs.current[item.id] = el; }}
                />
              ))}
              
              {isLoggedIn && (
                <button
                  className="flex items-center space-x-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 py-2 px-3 rounded-lg"
                  onClick={handleLogout}
                  type="button"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </nav>
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <Menu
              className={cn(
                "w-6 h-6 transition-all duration-300",
                isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform transition-all duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-serif font-medium text-gray-900">Navigation</h2>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-2">
          {navigationItems
          .filter((item) => !item.disabled)
          .map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={scrollToSection}
              mobile
            />
          ))}
          
          {isLoggedIn && (
            <>
              <div className="border-t border-gray-200 my-4" />
              <button
                className="flex items-center w-full text-left p-4 rounded-xl transition-all duration-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
                type="button"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span className="text-base font-medium">Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default WeddingHeader;