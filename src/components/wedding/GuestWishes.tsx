import { ChevronRight, PlusIcon } from "lucide-react";
import type React from "react";
import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import  useWedding from "@/hooks/useWedding";
import { useToast } from "@/hooks/use-toast";
import type { WeddingWish } from "@/types/wedding";
import { Input } from "../ui/input";
import Button from "../ui-custom/Button";

const GuestWishes: React.FC = () => {
    const { weddingWishes, setWeddingWishes, addWish } = useWedding();
    const [isOpen, setIsOpen] = useState(false);
    const [guestName, setGuestName] = useState<string>("");
    const [guestMessage, setGuestMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const guestNameInputId = useId();
    const guestMessageInputId = useId();

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleAdd = async () => {
        setIsLoading(true);
        setIsOpen(false);
        const newWish: WeddingWish = {
            id: String(Date.now()),
            name: guestName,
            message: guestMessage,
        };

        console.log(newWish);

        const originalWishes = structuredClone(weddingWishes);

        const tempWeddingWishes = structuredClone(weddingWishes);
        tempWeddingWishes.splice(0, 0, newWish);

        setWeddingWishes(tempWeddingWishes);
        try {
            await addWish(newWish);
        } catch (error) {
            console.log("Error adding new wisht to backend: ", error);
            setWeddingWishes(originalWishes);
        }

        toast({
            title: "Successfully added your message",
        });

        setGuestMessage("");
        setIsLoading(false);
    };

    return (
        <section id={"wishes"} className="py-20 md:py-32 bg-gray-50">
            <div className="container mx-auto px-1">
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
                <div className="flex lg:flex-row flex-col gap-6 lg:gap-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {weddingWishes.slice(0, 3).map((wish, index) => (
                            <FadeIn key={wish.id} delay={100 * (index + 1)}>
                                <Card className="min-w-[22rem] h-full">
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
                    <div className="flex lg:flex-col gap-1 md:px-56 px-10 lg:px-0">
                        <FadeIn
                            key={"add_button"}
                            delay={100 * 4}
                            className="w-full"
                        >
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Card
                                        className="flex items-center justify-center h-full hover:bg-gray-300 active:bg-gray-300 cursor-pointer duration-200"
                                        tabIndex={0}
                                    >
                                        <CardContent className="flex flex-col justify-center items-center py-3 px-6">
                                            <p>
                                                <PlusIcon size={25} />
                                            </p>
                                            <p className="text-[10px]">
                                                New wish
                                            </p>
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Leave a message for the couple
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="guest-name">
                                                Name
                                            </Label>
                                            <Input
                                                id={guestNameInputId}
                                                placeholder="Enter your name here"
                                                value={guestName}
                                                onChange={(e) =>
                                                    setGuestName(e.target.value)
                                                }
                                            />
                                            <Label htmlFor="guest-message">
                                                Message
                                            </Label>
                                            <Input
                                                id={guestMessageInputId}
                                                placeholder="Enter message here"
                                                value={guestMessage}
                                                onChange={(e) =>
                                                    setGuestMessage(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleCancel}
                                            className="rounded-sm"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleAdd}
                                            className="rounded-sm"
                                            disabled={isLoading}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </FadeIn>
                        <FadeIn
                            key={"view_button"}
                            delay={100 * 5}
                            className="w-full"
                        >
                            <Card
                                className="flex items-center justify-center h-full hover:bg-gray-300 active:bg-gray-300 cursor-pointer duration-200"
                                onClick={() => navigate("/wishes")}
                            >
                                <CardContent className="flex justify-center items-center flex-col py-3 px-6">
                                    <p>
                                        <ChevronRight size={25} />
                                    </p>
                                    <p className="text-xs">View All</p>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuestWishes;
