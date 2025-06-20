export interface WeddingData {
    couple: {
        groomName: string;
        brideName: string;
        weddingQuote: string;
        image: string;
    };
    story: {
        title: string;
        content: string;
        image: string;
    };
    weddingDetails: {
        event1: {
            title: string;
            date: string;
            time: string;
            venue: string;
            address: string;
        };
        event2: {
            title: string;
            date: string;
            time: string;
            venue: string;
            address: string;
        };
        toKnow1: {
            title: string;
            description: string;
        };
        toKnow2: {
            title: string;
            description: string;
        };
        toKnow3: {
            title: string;
            description: string;
        };
    };
    schedule: Array<{
        id: string;
        time: string;
        event: string;
        description: string;
    }>;
    gallery: Array<{
        id: string;
        url: string;
        caption: string;
    }>;
    guestWishes: Array<{
        id: string;
        name: string;
        message: string;
        date: string;
    }>;
    moreInfo: {
        title: string;
        content: string;
    };
    contact: {
        phone: string;
        email: string;
        address: string;
    };
    jeweller: {
        title: string;
        description: string;
        shopName: string;
        website: string;
    };
}

export interface User {
    id: string;
    email: string;
    isAuthenticated: boolean;
}
