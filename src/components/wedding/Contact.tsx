import type React from "react";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  useWedding from "@/hooks/useWedding";
import MapsIconButton from "../ui-custom/MapsIconButton";
import EditableLink from "./EditableLink";
import EditableText from "./EditableText";

const Contact: React.FC = () => {
   const { weddingData, updateWeddingData } = useWedding();
   if(weddingData.contact.disabled){
      return;
   }

   const updateContact = (field: string, value: string) => {
      updateWeddingData({
         contact: { ...weddingData.contact, [field]: value },
      });
   };

   const updateContactAddress = (text: string, link: string) => {
      updateWeddingData({
         contact: {
            ...weddingData.contact,
            address: text,
            addressMapLink: link,
         },
      });
   };

   return (
      <section id={"contact"} className="py-20 md:py-32 bg-gray-50">
         <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">Contact Us</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     Have questions? We'd love to hear from you
                  </p>
               </div>
            </FadeIn>

            <div className="max-w-2xl mx-auto">
               <FadeIn delay={150}>
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-center text-2xl font-serif">Get in Touch</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="text-center space-y-2">
                           <p className="font-medium text-orangery-500">Phone</p>
                           <EditableText
                              value={weddingData.contact.phone}
                              onSave={(value) => updateContact("phone", value)}
                              label="Edit Phone Number"
                              className="text-lg"
                           />
                        </div>

                        <div className="text-center space-y-2">
                           <p className="font-medium text-orangery-500">Email</p>
                           <EditableText
                              value={weddingData.contact.email}
                              onSave={(value) => updateContact("email", value)}
                              label="Edit Email Address"
                              className="text-lg"
                           />
                        </div>

                        <div className="text-center space-y-2">
                           <p className="font-medium text-orangery-500">Address</p>
                           <div className="w-full p-0 flex items-center justify-between md:justify-center">
                              <div className="flex-grow">
                                 <EditableLink
                                    text={weddingData.contact.address}
                                    link={weddingData.contact.addressMapLink}
                                    onSave={(text, link) => updateContactAddress(text, link)}
                                    label="Edit Address"
                                    className="text-lg"
                                 />
                              </div>
                              <MapsIconButton
                                 onClick={() => {
                                    window.open(weddingData.contact.addressMapLink, "_blank");
                                 }}
                              />
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </FadeIn>
            </div>
         </div>
      </section>
   );
};

export default Contact;
