import React from "react";
import { useWedding } from "@/context/WeddingContext";
import EditableText from "./EditableText";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JewelrySection: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateJewelry = (field: string, value: string) => {
        updateWeddingData({
            jeweller: { ...weddingData.jeweller, [field]: value },
        });
    };

    const goToJewellerWebsite = () => {
        window.open(weddingData.jeweller.website, "_blank");
    };

    return (
        <section id="jeweller" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <Card className="overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-0">
                                <div
                                    className="relative h-96 md:h-full cursor-pointer"
                                    onClick={goToJewellerWebsite}
                                >
                                    <img
                                        src="/jewelry/ad-2.jpg"
                                        alt="Wedding Jewellery"
                                        className="w-full h-full object-cover object-[0%_15%] hover:scale-105 duration-500"
                                    />
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <CardHeader className="p-0 mb-6">
                                        <EditableText
                                            value={weddingData.jeweller.title}
                                            onSave={(value) =>
                                                updateJewelry("title", value)
                                            }
                                            label="Edit Jewelry Title"
                                            className="block text-2xl md:text-3xl font-serif font-medium tracking-tight mb-4"
                                        />
                                    </CardHeader>
                                    <CardContent className="p-0 space-y-6">
                                        <EditableText
                                            value={
                                                weddingData.jeweller.description
                                            }
                                            onSave={(value) =>
                                                updateJewelry(
                                                    "description",
                                                    value,
                                                )
                                            }
                                            label="Edit Jewelry Description"
                                            multiline
                                            className="text-muted-foreground leading-relaxed"
                                        />

                                        <div className="space-y-4">
                                            <div>
                                                <p className="font-medium text-orangery-500 mb-2">
                                                    Shop
                                                </p>
                                                <EditableText
                                                    value={
                                                        weddingData.jeweller
                                                            .shopName
                                                    }
                                                    onSave={(value) =>
                                                        updateJewelry(
                                                            "shopName",
                                                            value,
                                                        )
                                                    }
                                                    label="Edit Shop Name"
                                                    className="text-lg font-medium"
                                                />
                                            </div>

                                            <EditableText
                                                value={
                                                    weddingData.jeweller.website
                                                }
                                                onSave={(value) =>
                                                    updateJewelry(
                                                        "website",
                                                        value,
                                                    )
                                                }
                                                label="Edit Website URL"
                                            >
                                                <Button
                                                    variant="outline"
                                                    onClick={
                                                        goToJewellerWebsite
                                                    }
                                                    className="w-full mt-5"
                                                >
                                                    Visit Store
                                                </Button>
                                            </EditableText>
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
