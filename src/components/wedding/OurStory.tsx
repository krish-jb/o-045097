import React from "react";
import { useWedding } from "@/context/WeddingContext";
import EditableText from "./EditableText";
import FadeIn from "@/components/animations/FadeIn";

const OurStory: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateStoryTitle = (newTitle: string) => {
        updateWeddingData({
            story: { ...weddingData.story, title: newTitle },
        });
    };

    const updateStoryContent = (newContent: string) => {
        updateWeddingData({
            story: { ...weddingData.story, content: newContent },
        });
    };

    return (
        <section id="story" className="py-20 md:py-32 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
                    <FadeIn className="md:col-span-5">
                        <div className="relative h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden">
                            <img
                                src="/couple/our_story.jpg"
                                alt="Our story photo"
                                className="w-full h-full object-cover object-[0%_80%] scale-110"
                            />
                        </div>
                    </FadeIn>

                    <FadeIn delay={150} className="md:col-span-7">
                        <div className="flex flex-col space-y-6">
                            <div>
                                <span className="text-sm md:text-base font-medium text-orangery-500 mb-2 inline-block">
                                    Our Story
                                </span>
                                <EditableText
                                    value={weddingData.story.title}
                                    onSave={updateStoryTitle}
                                    label="Edit Story Title"
                                    className="block text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6"
                                />
                            </div>

                            <EditableText
                                value={weddingData.story.content}
                                onSave={updateStoryContent}
                                label="Edit Story Content"
                                multiline
                                className="text-lg text-muted-foreground leading-relaxed"
                            />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
