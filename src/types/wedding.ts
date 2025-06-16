
export interface WeddingData {
  couple: {
    groomName: string;
    brideName: string;
    weddingQuote: string;
  };
  story: {
    title: string;
    content: string;
  };
  weddingDetails: {
    ceremony: {
      date: string;
      time: string;
      venue: string;
      address: string;
    };
    reception: {
      date: string;
      time: string;
      venue: string;
      address: string;
    };
    gettingThere: string;
    whatToWear: string;
    parking: string;
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
  jewelry: {
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
