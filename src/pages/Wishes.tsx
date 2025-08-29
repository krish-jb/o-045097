import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import WeddingHeader from "@/components/wedding/WeddingHeader";
import useWedding from "@/hooks/useWedding";
import useSyncUsername from "@/hooks/useSyncUsername";

const Wishes: React.FC = () => {
    const { weddingWishes, loadAllWeddingWishes } = useWedding();
    const { username } = useParams<{ username: string }>();

    // Use the custom hook to sync username
    useSyncUsername(username || "");

    

    useEffect(() => {
        loadAllWeddingWishes();
    }, [loadAllWeddingWishes]);

    return (
        <>
            <WeddingHeader />
            <section id={"wishes"} className="py-20 md:py-32 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-1">
               <FadeIn>
                  <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">Guest Wishes</h2>
                     <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Beautiful messages from our loved ones
                     </p>
                  </div>
               </FadeIn>
               <div className="flex md:flex-row flex-col gap-6 md:gap-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                     {weddingWishes.map((wish, index) => (
                        <FadeIn key={wish.id} delay={100 * (index + 1)}>
                           <Card className="h-full">
                              <CardContent className="p-6">
                                 <blockquote className="text-muted-foreground mb-4 italic">"{wish.message}"</blockquote>
                                 <cite className="text-sm font-medium text-orangery-500">- {wish.name}</cite>
                              </CardContent>
                           </Card>
                        </FadeIn>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default Wishes;
