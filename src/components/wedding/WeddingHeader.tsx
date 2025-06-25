import type React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWedding } from "@/context/useWedding";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const WeddingHeader: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useWedding();
    const { weddingData } = useWedding();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        if (location.pathname !== "/") {
            navigate("/");
            return;
        }
        if (id === "home") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        toast({ title: "You have logged out!" });
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
                isScrolled
                    ? "py-3 bg-white border-b border-gray-200/20 shadow-sm"
                    : "py-5 bg-transparent",
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-xl font-serif font-medium tracking-tight transition-opacity hover:opacity-80"
                >
                    {`${weddingData.couple.groomName[0]} &
                    ${weddingData.couple.brideName[0]} Wedding`}
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <nav className="flex items-center space-x-6">
                        <button
                            className="text-sm font-medium hover:text-orangery-500 transition-colors"
                            onClick={() => scrollToSection("home")}
                            type="button"
                        >
                            Home
                        </button>
                        <button
                            className="text-sm font-medium hover:text-orangery-500 transition-colors"
                            onClick={() => scrollToSection("story")}
                            type="button"
                        >
                            Our Story
                        </button>
                        <button
                            className="text-sm font-medium hover:text-orangery-500 transition-colors"
                            onClick={() => scrollToSection("wedding-details")}
                            type="button"
                        >
                            Details
                        </button>
                        <button
                            className="text-sm font-medium hover:text-orangery-500 transition-colors"
                            onClick={() => scrollToSection("schedule")}
                            type="button"
                        >
                            Schedule
                        </button>
                        <button
                            className="text-sm font-medium hover:text-orangery-500 transition-colors"
                            onClick={() => scrollToSection("gallery")}
                            type="button"
                        >
                            Gallery
                        </button>
                        <button
                            className="text-sm font-medium hover:text-orangery-500 transition-colors"
                            onClick={() => scrollToSection("contact")}
                            type="button"
                        >
                            Contact Us
                        </button>
                        {isLoggedIn && (
                            <button
                                className="text-sm font-medium hover:text-orangery-500 transition-colors"
                                onClick={handleLogout}
                                type="button"
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                </div>

                <button
                    className="md:hidden flex items-center"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    type="button"
                >
                    <span
                        className={cn(
                            "block w-6 transition-all duration-300",
                            isMobileMenuOpen ? "opacity-0" : "opacity-100",
                        )}
                    >
                        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
                        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
                        <span className="block w-4 h-0.5 bg-foreground" />
                    </span>
                </button>
            </div>

            <div
                className={cn(
                    "fixed bg-white inset-0 z-40 flex flex-col pt-24 px-6 duration-500 transition-opacity transform ease-in-out md:hidden",
                    isMobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0",
                )}
            >
                <button
                    className="absolute top-5 right-5 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Close menu"
                    type="button"
                >
                    <span className="block w-6 h-0.5 bg-foreground transform rotate-45 translate-y-0.5" />
                    <span className="block w-6 h-0.5 bg-foreground transform -rotate-45" />
                </button>

                <nav className="flex flex-col space-y-6 text-lg">
                    <button
                        className="text-left hover:text-orangery-500 transition-colors"
                        onClick={() => scrollToSection("home")}
                        type="button"
                    >
                        Home
                    </button>
                    <button
                        className="text-left hover:text-orangery-500 transition-colors"
                        onClick={() => scrollToSection("story")}
                        type="button"
                    >
                        Our Story
                    </button>
                    <button
                        className="text-left hover:text-orangery-500 transition-colors"
                        onClick={() => scrollToSection("wedding-details")}
                        type="button"
                    >
                        Details
                    </button>
                    <button
                        className="text-left hover:text-orangery-500 transition-colors"
                        onClick={() => scrollToSection("schedule")}
                        type="button"
                    >
                        Schedule
                    </button>
                    <button
                        className="text-left hover:text-orangery-500 transition-colors"
                        onClick={() => scrollToSection("gallery")}
                        type="button"
                    >
                        Gallery
                    </button>
                    {isLoggedIn && (
                        <button
                            className="text-left hover:text-orangery-500 transition-colors"
                            onClick={handleLogout}
                            type="button"
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default WeddingHeader;
