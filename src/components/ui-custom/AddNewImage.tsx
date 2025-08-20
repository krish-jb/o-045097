import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import  useWedding from "@/hooks/useWedding";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UploadButton from "../ui/UploadButton";
import Button from "./Button";
import ImageDropArea from "./ImageDropArea";

const AddNewImage: React.FC = () => {
    const { weddingData, isLoggedIn, updateGalleryImage } = useWedding();

    const [isOpen, setIsOpen] = useState(false);
    const [imageCaption, setImageCaption] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const limit = import.meta.env.VITE_GALLERY_IMAGE_LIMIT;

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

    if (!isLoggedIn) {
        return;
    }

    return (
        <div className="flex items-center justify-center m-10">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <UploadButton
                        text={"Add New Image"}
                        disabled={weddingData.gallery.length >= limit}
                    />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add new image to gallery</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-caption">Caption</Label>
                            <Input
                                id={"edit-caption"}
                                value={imageCaption}
                                onChange={(e) =>
                                    setImageCaption(e.target.value)
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
    );
};

export default AddNewImage;
