import { PlusIcon } from "lucide-react";
import type React from "react";
import FadeIn from "@/components/animations/FadeIn";
import  useWedding from "@/hooks/useWedding";
import { useToast } from "@/hooks/use-toast";
import type { WeddingData } from "@/types/wedding";
import DeletableItem from "./DeleteableItem";
import EditableText from "./EditableText";

const Schedule: React.FC = () => {
    const { weddingData, updateWeddingData, isLoggedIn } = useWedding();
    const { toast } = useToast();

    const failerMessage = () => {
        toast({
            title: "Failed to add new schedule",
            description:
                "Please make sure you have a stable internet connection",
            variant: "destructive",
        });
    };

    const updateScheduleItem = async (
        id: string,
        field: string,
        value: string,
    ) => {
        const updatedSchedule = weddingData.schedule.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
        );
        const success = updateWeddingData({ schedule: updatedSchedule });
        if (!success) failerMessage();
    };

    const deleteScheduleItem = async (indexToRemove: number) => {
        const updatedSchedule = weddingData.schedule.filter(
            (_, index) => index !== indexToRemove,
        );
        const success = updateWeddingData({ schedule: updatedSchedule });
        if (!success) failerMessage();
    };

    type ScheduleItem = WeddingData["schedule"][number];

    const addScheduleItem = async () => {
        const newItem: ScheduleItem = {
            id: crypto.randomUUID(),
            time: "1:00 PM",
            event: "New event",
            description: "New description",
        };
        const data = [...weddingData.schedule, newItem];
        const success = await updateWeddingData({ schedule: data });
        if (!success) failerMessage();
    };

    return (
        <section id={"schedule"} className="py-20 md:py-32 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">
                            Schedule of Events
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Here's how our special day will unfold
                        </p>
                    </div>
                </FadeIn>

                <div className="max-w-3xl mx-auto">
                    {weddingData.schedule.map((item, index) => (
                        <DeletableItem
                            key={item.id}
                            onDelete={() => deleteScheduleItem(index)}
                            label={"Are you sure?"}
                        >
                            <FadeIn key={item.id} delay={100 * (index + 1)}>
                                <div className="flex items-start space-x-6 mb-8 p-6 bg-white rounded-lg shadow-sm">
                                    <div className="flex-shrink-0 w-24 text-right">
                                        <EditableText
                                            value={item.time}
                                            onSave={(value) =>
                                                updateScheduleItem(
                                                    item.id,
                                                    "time",
                                                    value,
                                                )
                                            }
                                            label="Edit Time"
                                            className="text-lg font-medium text-orangery-500"
                                        />
                                    </div>
                                    <div className="flex flex-col md:block flex-1 space-x-4">
                                        <EditableText
                                            value={item.event}
                                            onSave={(value) =>
                                                updateScheduleItem(
                                                    item.id,
                                                    "event",
                                                    value,
                                                )
                                            }
                                            label="Edit Event Name"
                                            className="text-xl font-serif font-medium mb-2"
                                        />
                                        <EditableText
                                            value={item.description}
                                            onSave={(value) =>
                                                updateScheduleItem(
                                                    item.id,
                                                    "description",
                                                    value,
                                                )
                                            }
                                            label="Edit Event Description"
                                            className="text-muted-foreground"
                                        />
                                    </div>
                                </div>
                            </FadeIn>
                        </DeletableItem>
                    ))}
                    {isLoggedIn && (
                        <button
                            className="max-w-3xl mx-auto w-full py-7 rounded-sm flex justify-center items-center bg-gray-100 hover:bg-gray-200 cursor-pointer duration-300"
                            onClick={addScheduleItem}
                            type="button"
                        >
                            <PlusIcon />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Schedule;
