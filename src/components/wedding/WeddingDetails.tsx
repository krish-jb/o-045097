import type React from "react";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/context/useWedding";
import { useToast } from "@/hooks/use-toast";
import MapsIconButton from "../ui-custom/MapsIconButton";
import EditableLink from "./EditableLink";
import EditableText from "./EditableText";

const WeddingDetails: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();
    const { toast } = useToast();

    const confirmationMessage = (event: string) => {
        toast({
            title: `Successfully updated ${event}`,
        });
    };

    const updateEventDetails = async (
        event: string,
        field: string,
        value: string,
    ) => {
        const success: boolean = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                [event]: {
                    ...(weddingData.weddingDetails[event] || {}),
                    [field]: value,
                },
            },
        });
        if (success) confirmationMessage(field);
    };

    const updateEventAddress = async (
        event: string,
        text: string,
        link: string,
    ) => {
        const success: boolean = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                [event]: {
                    ...(weddingData.weddingDetails[event] || {}),
                    address: text,
                    addressMapLink: link,
                },
            },
        });
        if (success) confirmationMessage("address");
    };

    const openLinkInNewTab = (link: string) => {
        window.open(link, "_blank");
    };

    return (
        <section id={"wedding-details"} className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">
                            Wedding Details
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to know about our special day
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <FadeIn delay={100}>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event1
                                                .title
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "title",
                                                value,
                                            )
                                        }
                                        label="Edit Event 1 heading"
                                        className="block"
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-medium text-sm text-orangery-500 mb-1">
                                        Date & Time
                                    </p>
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event1
                                                .date
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "date",
                                                value,
                                            )
                                        }
                                        label={`Edit ${
                                            weddingData.weddingDetails.event1
                                                .title
                                        } Date`}
                                        className="block font-medium"
                                    />
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event1
                                                .time
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "time",
                                                value,
                                            )
                                        }
                                        label="Edit Ceremony Time"
                                        className="block text-muted-foreground"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-orangery-500 mb-1">
                                        Venue
                                    </p>
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event1
                                                .venue
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "venue",
                                                value,
                                            )
                                        }
                                        label="Edit Ceremony Venue"
                                        className="block font-medium"
                                    />
                                    <div className="flex flex-row justify-between gap-2">
                                        <EditableLink
                                            text={
                                                weddingData.weddingDetails
                                                    .event1.address
                                            }
                                            link={
                                                weddingData.weddingDetails
                                                    .event1.addressMapLink
                                            }
                                            onSave={(text, link) =>
                                                updateEventAddress(
                                                    "event1",
                                                    text,
                                                    link,
                                                )
                                            }
                                            label="Edit Ceremony Address"
                                            className="block text-muted-foreground underline text-left"
                                        />
                                        <MapsIconButton
                                            onClick={() =>
                                                openLinkInNewTab(
                                                    weddingData.weddingDetails
                                                        .event1.addressMapLink,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event2
                                                .title
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "",
                                                value,
                                            )
                                        }
                                        label="Edit Event 2 heading"
                                        className="block"
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-medium text-sm text-orangery-500 mb-1">
                                        Date & Time
                                    </p>
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event2
                                                .date
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "date",
                                                value,
                                            )
                                        }
                                        label="Edit Reception Date"
                                        className="block font-medium"
                                    />
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event2
                                                .time
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "time",
                                                value,
                                            )
                                        }
                                        label="Edit Reception Time"
                                        className="block text-muted-foreground"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-orangery-500 mb-1">
                                        Venue
                                    </p>
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event2
                                                .venue
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "venue",
                                                value,
                                            )
                                        }
                                        label="Edit Reception Venue"
                                        className="block font-medium"
                                    />
                                    <div className="flex flex-row justify-between gap-2">
                                        <EditableLink
                                            text={
                                                weddingData.weddingDetails
                                                    .event2.address
                                            }
                                            link={
                                                weddingData.weddingDetails
                                                    .event2.addressMapLink
                                            }
                                            onSave={(text, link) =>
                                                updateEventAddress(
                                                    "event2",
                                                    text,
                                                    link,
                                                )
                                            }
                                            label="Edit Reception Address"
                                            className="block text-muted-foreground underline"
                                        />
                                        <MapsIconButton
                                            onClick={() =>
                                                openLinkInNewTab(
                                                    weddingData.weddingDetails
                                                        .event1.addressMapLink,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FadeIn delay={300}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-serif">
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.toKnow1
                                                .title
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "toKnow1",
                                                "title",
                                                value,
                                            )
                                        }
                                        label="Edit Info Heading 1"
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow1
                                            .description
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow1",
                                            "description",
                                            value,
                                        )
                                    }
                                    label={`Edit ${
                                        weddingData.weddingDetails.toKnow1.title
                                    } description`}
                                    multiline
                                    className="text-muted-foreground text-left"
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>

                    <FadeIn delay={400}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-serif">
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.toKnow2
                                                .title
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "toKnow2",
                                                "title",
                                                value,
                                            )
                                        }
                                        label="Edit Info Heading 2"
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow2
                                            .description
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow2",
                                            "description",
                                            value,
                                        )
                                    }
                                    label={`Edit ${
                                        weddingData.weddingDetails.toKnow2.title
                                    } description`}
                                    multiline
                                    className="text-muted-foreground text-left"
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>

                    <FadeIn delay={500}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-serif">
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.toKnow3
                                                .title
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "toKnow3",
                                                "title",
                                                value,
                                            )
                                        }
                                        label="Edit Info Heading 3"
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow3
                                            .description
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow3",
                                            "description",
                                            value,
                                        )
                                    }
                                    label={`Edit ${weddingData.weddingDetails.toKnow3.title} description`}
                                    multiline
                                    className="text-muted-foreground text-left"
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default WeddingDetails;
