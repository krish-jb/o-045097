import React from "react";
import { useWedding } from "@/context/useWedding";
import EditableText from "./EditableText";
import FadeIn from "@/components/animations/FadeIn";
import DeletableItem from "./DeleteableItem";
import { WeddingData } from "@/types/wedding";
import { PlusIcon } from "lucide-react";

const Schedule: React.FC = () => {
    const { weddingData, updateWeddingData, isLoggedIn } = useWedding();

    const updateScheduleItem = (id: string, field: string, value: string) => {
        const updatedSchedule = weddingData.schedule.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
        );
        updateWeddingData({ schedule: updatedSchedule });
    };

    const deleteScheduleItem = (indexToRemove: number) => {
        const updatedSchedule = weddingData.schedule.filter(
            (_, index) => index !== indexToRemove,
        );
        updateWeddingData({ schedule: updatedSchedule });
    };

    type ScheduleItem = WeddingData["schedule"][number];

    const addScheduleItem = () => {
        const getNewId = () => {
            const id = weddingData.schedule
                .map((item) => Number(item.id))
                .filter((item) => !isNaN(item))
                .sort((a, b) => a - b);
            const newId = id.at(-1) + 1 || 0;
            return String(newId);
        };
        const newItem: ScheduleItem = {
            id: getNewId(),
            time: "1:00 PM",
            event: "New event",
            description: "New description",
        };
        const data = [...weddingData.schedule, newItem];
        updateWeddingData({ schedule: data });
    };

    return (
        <section id="schedule" className="py-20 md:py-32 bg-gray-50">
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
                            key={index}
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
                        <div
                            className="max-w-3xl mx-auto py-7 rounded-sm flex justify-center items-center bg-gray-100 hover:bg-gray-200 cursor-pointer duration-300"
                            onClick={addScheduleItem}
                        >
                            <PlusIcon />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Schedule;
