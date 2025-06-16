import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeddingData, User } from '@/types/wedding';
import axios from 'axios';

interface WeddingContextType {
  weddingData: WeddingData;
  user: User | null;
  isLoggedIn: boolean;
  updateWeddingData: (data: Partial<WeddingData>) => void;
  saveData: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const defaultWeddingData: WeddingData = {
  couple: {
    groomName: "Alexander",
    brideName: "Isabella",
    weddingQuote: "Road to Forever - Where two hearts become one"
  },
  story: {
    title: "Our Story",
    content: "We met on a beautiful autumn day in the local coffee shop. What started as a chance encounter over spilled coffee became the beginning of our forever love story. After three wonderful years together, Alexander proposed during a romantic sunset at our favorite beach, and Isabella said yes with tears of joy."
  },
  weddingDetails: {
    ceremony: {
      date: "June 15, 2024",
      time: "4:00 PM",
      venue: "St. Mary's Cathedral",
      address: "123 Cathedral Street, City, State 12345"
    },
    reception: {
      date: "June 15, 2024",
      time: "6:30 PM",
      venue: "Grand Ballroom",
      address: "456 Reception Avenue, City, State 12345"
    },
    gettingThere: "The venue is easily accessible by car or public transport. Free shuttle service will be provided from the ceremony to reception venue.",
    whatToWear: "Semi-formal attire requested. Ladies: cocktail dresses or elegant separates. Gentlemen: suit and tie or dress shirt with slacks.",
    parking: "Complimentary valet parking available at both venues. Street parking is also available on surrounding streets."
  },
  schedule: [
    {
      id: "1",
      time: "3:30 PM",
      event: "Guest Arrival",
      description: "Welcome drinks and mingling"
    },
    {
      id: "2",
      time: "4:00 PM",
      event: "Ceremony",
      description: "Wedding ceremony begins"
    },
    {
      id: "3",
      time: "5:00 PM",
      event: "Cocktail Hour",
      description: "Photos and cocktails"
    },
    {
      id: "4",
      time: "6:30 PM",
      event: "Reception",
      description: "Dinner and dancing"
    }
  ],
  gallery: [
    {
      id: "1",
      url: "/lovable-uploads/47f9a1d0-4458-400a-8fc0-79adf093cf18.png",
      caption: "Our engagement photo"
    }
  ],
  guestWishes: [
    {
      id: "1",
      name: "Sarah & Mike",
      message: "Wishing you both a lifetime of love and happiness!",
      date: "2024-01-15"
    }
  ],
  moreInfo: {
    title: "Additional Information",
    content: "For dietary restrictions, please contact us at least one week before the wedding. We will have vegetarian and gluten-free options available. Children are welcome at both the ceremony and reception."
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "wedding@alexanderandisabella.com",
    address: "123 Main Street, City, State 12345"
  },
  jewelry: {
    title: "Our Wedding Jewelry",
    description: "Discover exquisite wedding rings and jewelry collections from our trusted partner.",
    shopName: "Elegant Diamonds",
    website: "https://elegantdiamonds.com"
  }
};

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user_id = 'wedding_couple_2024';

  useEffect(() => {
    loadWeddingData();
  }, []);

  const loadWeddingData = async () => {
    try {
      const response = await axios.post(
        'https://kzhbmjygrzjardgruunp.supabase.co/functions/v1/getwebdata',
        { user_id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data) {
        setWeddingData(response.data);
      }
    } catch (error) {
      console.log('Using default data, API not available:', error);
      // Keep using default data
    }
  };

  const updateWeddingData = (data: Partial<WeddingData>) => {
    setWeddingData(prev => ({ ...prev, ...data }));
  };

  const saveData = async () => {
    try {
      await axios.post(
        'https://kzhbmjygrzjardgruunp.supabase.co/functions/v1/webdata',
        weddingData,
        {
          headers: {
            'Authorization': `Bearer ${user?.id}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Placeholder login - will be replaced with Supabase auth
    if (email === 'admin@wedding.com' && password === 'password') {
      setUser({ id: 'admin', email, isAuthenticated: true });
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <WeddingContext.Provider value={{
      weddingData,
      user,
      isLoggedIn,
      updateWeddingData,
      saveData,
      login,
      logout
    }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
