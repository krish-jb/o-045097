import type React from "react";
import { useEffect, useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UploadButton from "@/components/ui/UploadButton";
import Button from "@/components/ui-custom/Button";
import ImageDropArea from "@/components/ui-custom/ImageDropArea";
import DeletableItem from "@/components/wedding/DeleteableItem";
import EditableImage from "@/components/wedding/EditableImage";
import Footer from "@/components/wedding/Footer";
import WeddingHeader from "@/components/wedding/WeddingHeader";
import { useWedding } from "@/context/useWedding";
import deleteImage from "@/utils/DeleteImage";

const Gallery: React.FC = () => {
    const {
        weddingData,
        updateWeddingData,
        updateGalleryImage,
        isLoggedIn,
        user,
    } = useWedding();
    const [isOpen, setIsOpen] = useState(false);
    const [imageCaption, setImageCaption] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const limit = import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 10;

    const handleUpdate = async () => {
        setIsLoading(true);
        await updateGalleryImage(
            image,
            imageCaption,
            weddingData.gallery.length,
        );
        setImage(null);
        setIsOpen(false);
        setIsLoading(false);
    };

    const handleCancel = () => {
        setImageCaption(imageCaption);
        setImage(null);
        setIsOpen(false);
    };

    const handleDelete = async (name: string, indexToRemove: number) => {
        setIsLoading(true);
        const updatedGallery = [...weddingData.gallery];
        updatedGallery.splice(indexToRemove, 1);

        const updated = await deleteImage(user, name);

        if (!updated) {
            return;
        }

        updateWeddingData({ gallery: updatedGallery });
        setIsLoading(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <WeddingHeader />
            <section id={"gallery"} className="py-20 md:py-32 bg-white">
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
                        {weddingData.gallery
                            .slice(0, limit)
                            .map((photo, index) => (
                                <FadeIn
                                    key={photo.id}
                                    delay={100 * (index + 1)}
                                >
                                    <DeletableItem
                                        onDelete={() =>
                                            handleDelete(
                                                `gallery_image_${index}`,
                                                index,
                                            )
                                        }
                                        label={
                                            "Sure you want to delete this image?"
                                        }
                                        isLoading={isLoading}
                                    >
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
                                    </DeletableItem>
                                </FadeIn>
                            ))}
                    </div>
                    {isLoggedIn && (
                        <div className="flex items-center justify-center m-10">
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <UploadButton
                                        text={"Add New Image"}
                                        disabled={
                                            weddingData.gallery.length >= limit
                                        }
                                    />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add new image to gallery
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="edit-caption">
                                                Caption
                                            </Label>
                                            <Input
                                                id={"edit-caption"}
                                                value={imageCaption}
                                                onChange={(e) =>
                                                    setImageCaption(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <ImageDropArea setImage={setImage} />
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleCancel}
                                            className="rounded-sm"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleUpdate}
                                            variant="primary"
                                            className="rounded-sm"
                                            disabled={!image}
                                        >
                                            {isLoading ? "Uploading..." : "Add"}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Gallery;
