import React from "react";
import  useWedding from "@/hooks/useWedding";
import EditableText from "./EditableText";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JewelrySection: React.FC = () => {
        const { weddingAd } = useWedding();
    console.log("Wedding Ad:", weddingAd);
    // Provide default values if weddingAd is null/undefined
    const safeWeddingAd = weddingAd || {
        Ad_section: {
            title: 'Our Trusted Jeweler',
            image: '/jeweller/ad-1.jpg',
            description: 'Discover our exclusive collection of fine jewelry and wedding rings.',
            shopName: 'Luxury Jewelers',
            website: '#',
            disabled: false
        }
    };
    if (safeWeddingAd.Ad_section.disabled) {
        return null;
    }


    return (
        <section id="jeweller" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <Card className="overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-0">
                                <div
                                    className="relative h-96 md:h-full cursor-pointer"
                                    onClick={() => window.open(safeWeddingAd.Ad_section.website, "_blank")} 
                                >
                                    <img
                                        src={safeWeddingAd.Ad_section.image} 
                                        alt="Wedding Jewellery"
                                        className="w-full h-full object-cover object-[0%_15%] hover:scale-105 duration-500"
                                    />
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <CardHeader className="p-0 mb-6">
                                        <p className="block text-2xl md:text-3xl font-serif font-medium tracking-tight mb-4">
                                            {safeWeddingAd.Ad_section.title}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="p-0 space-y-6">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {safeWeddingAd.Ad_section.description}
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="font-medium text-orangery-500 mb-2">
                                                    Shop
                                                </p>
                                                <p className="text-lg font-medium">
                                                    {
                                                        safeWeddingAd.Ad_section
                                                            .shopName
                                                    }
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                onClick={() => window.open(safeWeddingAd.Ad_section.website, "_blank")} 
                                                className="w-full mt-5"
                                            >
                                                Visit Website
                                            </Button>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default JewelrySection;
