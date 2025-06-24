import React from "react";
import { useWedding } from "@/context/useWedding";
import FadeIn from "@/components/animations/FadeIn";
import EditableImage from "./EditableImage";
import uploadImage from "@/utils/UploadImage";
import LinkButton from "../ui/LinkButton";
import { useNavigate } from "react-router-dom";

const Gallery: React.FC = () => {
    const { weddingData, updateGalleryImage } = useWedding();
    const navigate = useNavigate();

    return (
        <section id="gallery" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">
                            Our Gallery
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Moments captured through our journey together
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weddingData.gallery.slice(0, 3).map((photo, index) => (
                        <FadeIn key={photo.id} delay={100 * (index + 1)}>
                            <EditableImage
                                label={`Edit Gallery Image ${index + 1}`}
                                onUpdate={updateGalleryImage}
                                index={index}
                                isImageCaptionAvailable={true}
                                imageCaption={photo.caption}
                            >
                                <div className="relative group overflow-hidden rounded-lg aspect-square">
                                    <img
                                        src={photo.url}
                                        alt={photo.caption}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                    {photo.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                                            <p className="text-white text-sm">
                                                {photo.caption}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </EditableImage>
                        </FadeIn>
                    ))}
                </div>
                <div className="flex justify-center items-center w-full p-4 mt-3">
                    <LinkButton
                        text={"View All"}
                        onClick={() => {
                            navigate("/gallery");
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Gallery;
