import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWedding } from "@/context/useWedding";

interface EditableTextProps {
    value: string;
    onSave: (newValue: string) => void;
    label?: string;
    multiline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const EditableText: React.FC<EditableTextProps> = ({
    value,
    onSave,
    label = "Edit Text",
    multiline = false,
    className = "",
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const { isLoggedIn } = useWedding();

    const handleSave = () => {
        onSave(editValue);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsOpen(false);
    };

    if (!isLoggedIn) {
        return <span className={className}>{children || value}</span>;
    }

    return (
        <div className={`relative group ${className}`}>
            <span>{children || value}</span>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-1 -right-8 opacity-100 transition-opacity p-1 h-6 w-6"
                        onClick={() => setEditValue(value)}
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
                            <Label htmlFor="edit-text">Content</Label>
                            {multiline ? (
                                <Textarea
                                    id="edit-text"
                                    value={editValue}
                                    onChange={(e) =>
                                        setEditValue(e.target.value)
                                    }
                                    rows={4}
                                />
                            ) : (
                                <Input
                                    id="edit-text"
                                    value={editValue}
                                    onChange={(e) =>
                                        setEditValue(e.target.value)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditableText;
