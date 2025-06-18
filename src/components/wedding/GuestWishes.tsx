import React from "react";
import { useWedding } from "@/context/useWedding";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";

const GuestWishes: React.FC = () => {
    const { weddingData } = useWedding();

    return (
        <section id="wishes" className="py-20 md:py-32 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">
                            Guest Wishes
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Beautiful messages from our loved ones
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {weddingData.guestWishes.map((wish, index) => (
                        <FadeIn key={wish.id} delay={100 * (index + 1)}>
                            <Card className="h-full">
                                <CardContent className="p-6">
                                    <blockquote className="text-muted-foreground mb-4 italic">
                                        "{wish.message}"
                                    </blockquote>
                                    <cite className="text-sm font-medium text-orangery-500">
                                        - {wish.name}
                                    </cite>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GuestWishes;
