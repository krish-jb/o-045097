import type React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import useWedding from "@/hooks/useWedding";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import scrollToElement from "@/utils/ScrollToElement";

const WeddingHeader: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { isLoggedIn, logout } = useWedding();
    const { weddingData } = useWedding();
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = useParams<{ username: string }>();

    // Navigation items configuration
    const navigationItems = [
        { id: "home", label: "Home" },
        { id: "story", label: "Our Story" },
        { id: "wedding-details", label: "Details" },
        { id: "schedule", label: "Schedule" },
        { id: "gallery", label: "Gallery" },
        { id: "contact", label: "Contact Us" },
    ];

    // Handle scroll events for header background and active section detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Active section detection using IntersectionObserver
    useEffect(() => {
        const sections = navigationItems.map(item => document.getElementById(item.id)).filter(Boolean);
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: "-20% 0px -70% 0px"
            }
        );

        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false);
        setActiveSection(id); // Add this line to immediately update active section
        if (location.pathname !== `/${username}`) {
            navigate(`/${username}`, { state: { scrollTo: id } });
            return;
        }
        scrollToElement(id);
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        toast({ title: "You have logged out!" });
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

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
                    {/* Logo/Brand */}
                    <Link
                        to={`/${username}`}
                        className="text-xl font-serif font-medium tracking-tight transition-all duration-300 hover:opacity-80 hover:scale-105 transform"
                    >
                        {`${weddingData.couple.groomName[0]} & ${weddingData.couple.brideName[0]} Wedding`}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-6">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    className={cn(
                                        "relative text-sm font-medium transition-all duration-300 py-2 px-3 rounded-none group", // removed rounded to make minimal
                                        activeSection === item.id
                                        ? "text-black border-b-2 border-black" // solid black, subtle underline
                                        : "text-neutral-700 hover:text-black"  // darker idle state
                                    )}
                                    onClick={() => scrollToSection(item.id)}
                                    type="button"
                                    >
                                    {item.label}
                                    </button>

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

                    {/* Mobile Menu Button */}
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

            {/* Mobile Menu Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300",
                    isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={closeMobileMenu}
                aria-hidden="true"
            />

            {/* Mobile Sidebar Menu */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform transition-all duration-300 ease-in-out md:hidden",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-lg font-serif font-medium text-gray-900">
                        Navigation
                    </h2>
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onClick={closeMobileMenu}
                        aria-label="Close menu"
                        type="button"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Mobile Menu Content */}
                <nav className="flex flex-col p-6 space-y-2">
                    {navigationItems.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                "flex items-center w-full text-left p-4 rounded-xl transition-all duration-300 group",
                                activeSection === item.id
                                    ? "bg-orange-50 text-orange-600 shadow-sm"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                            )}
                            onClick={() => scrollToSection(item.id)}
                            type="button"
                        >
                            <span className="text-base font-medium">{item.label}</span>
                            {activeSection === item.id && (
                                <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full" />
                            )}
                        </button>
                    ))}
                    
                    {/* Mobile Logout Button */}
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
