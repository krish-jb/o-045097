import { useWedding } from "@/context/useWedding";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../ui-custom/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import ImageDropArea from "../ui-custom/ImageDropArea";
import { Input } from "../ui/input";

type EditableImageProps = {
    className?: string;
    label?: string;
    isImageCaptionAvailable?: boolean;
    imageCaption?: string;
    index?: number;
    onUpdate: (
        newImage: File | null,
        imageCaption?: string,
        index?: number,
    ) => Promise<void>;
    children: React.ReactNode;
};

const EditableImage: React.FC<EditableImageProps> = ({
    onUpdate,
    index,
    className,
    isImageCaptionAvailable = false,
    imageCaption = null,
    label = "Edit Image",
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn } = useWedding();
    const [editedImageCaption, setEditedImageCaption] = useState<string>(
        imageCaption || "",
    );
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUpdate = async () => {
        setIsLoading(true);
        await onUpdate(image, editedImageCaption, index);
        setImage(null);
        setIsOpen(false);
        setIsLoading(false);
    };

    const handleCancel = () => {
        setEditedImageCaption(imageCaption);
        setImage(null);
        setIsOpen(false);
    };

    if (!isLoggedIn) {
        return <div className={`${className}`}>{children}</div>;
    }

    const isUpdateDisabled = (
        isLoading: boolean,
        image: File,
        imageCaption: string,
        editedImageCaption: string,
    ): boolean => {
        return (
            isLoading ||
            (!image &&
                (!isImageCaptionAvailable ||
                    imageCaption === editedImageCaption))
        );
    };

    return (
        <div className={`${className}`}>
            {children}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute bg-white hover:bg-gray-300 rounded-sm bottom-2 right-2 z-50 opacity-100 transition-opacity p-1 h-6 w-6"
                        aria-label="Edit Image"
                    >
                        ✏️
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{label}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            {isImageCaptionAvailable && (
                                <Input
                                    id="edit-caption"
                                    value={editedImageCaption}
                                    onChange={(e) =>
                                        setEditedImageCaption(e.target.value)
                                    }
                                />
                            )}
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
                            disabled={isUpdateDisabled(
                                isLoading,
                                image,
                                imageCaption,
                                editedImageCaption,
                            )}
                        >
                            {isLoading ? "Uploading..." : "Update"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditableImage;
