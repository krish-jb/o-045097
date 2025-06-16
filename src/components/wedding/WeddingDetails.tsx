
import React from 'react';
import { useWedding } from '@/context/WeddingContext';
import EditableText from './EditableText';
import FadeIn from '@/components/animations/FadeIn';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WeddingDetails: React.FC = () => {
  const { weddingData, updateWeddingData } = useWedding();

  const updateCeremonyDetails = (field: string, value: string) => {
    updateWeddingData({
      weddingDetails: {
        ...weddingData.weddingDetails,
        ceremony: { ...weddingData.weddingDetails.ceremony, [field]: value }
      }
    });
  };

  const updateReceptionDetails = (field: string, value: string) => {
    updateWeddingData({
      weddingDetails: {
        ...weddingData.weddingDetails,
        reception: { ...weddingData.weddingDetails.reception, [field]: value }
      }
    });
  };

  const updateGeneralDetails = (field: string, value: string) => {
    updateWeddingData({
      weddingDetails: { ...weddingData.weddingDetails, [field]: value }
    });
  };

  return (
    <section id="wedding-details" className="py-20 md:py-32 bg-white">
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
                <CardTitle className="text-2xl font-serif">Ceremony</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-sm text-orangery-500 mb-1">Date & Time</p>
                  <EditableText
                    value={weddingData.weddingDetails.ceremony.date}
                    onSave={(value) => updateCeremonyDetails('date', value)}
                    label="Edit Ceremony Date"
                    className="block font-medium"
                  />
                  <EditableText
                    value={weddingData.weddingDetails.ceremony.time}
                    onSave={(value) => updateCeremonyDetails('time', value)}
                    label="Edit Ceremony Time"
                    className="block text-muted-foreground"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm text-orangery-500 mb-1">Venue</p>
                  <EditableText
                    value={weddingData.weddingDetails.ceremony.venue}
                    onSave={(value) => updateCeremonyDetails('venue', value)}
                    label="Edit Ceremony Venue"
                    className="block font-medium"
                  />
                  <EditableText
                    value={weddingData.weddingDetails.ceremony.address}
                    onSave={(value) => updateCeremonyDetails('address', value)}
                    label="Edit Ceremony Address"
                    className="block text-muted-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={200}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Reception</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-sm text-orangery-500 mb-1">Date & Time</p>
                  <EditableText
                    value={weddingData.weddingDetails.reception.date}
                    onSave={(value) => updateReceptionDetails('date', value)}
                    label="Edit Reception Date"
                    className="block font-medium"
                  />
                  <EditableText
                    value={weddingData.weddingDetails.reception.time}
                    onSave={(value) => updateReceptionDetails('time', value)}
                    label="Edit Reception Time"
                    className="block text-muted-foreground"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm text-orangery-500 mb-1">Venue</p>
                  <EditableText
                    value={weddingData.weddingDetails.reception.venue}
                    onSave={(value) => updateReceptionDetails('venue', value)}
                    label="Edit Reception Venue"
                    className="block font-medium"
                  />
                  <EditableText
                    value={weddingData.weddingDetails.reception.address}
                    onSave={(value) => updateReceptionDetails('address', value)}
                    label="Edit Reception Address"
                    className="block text-muted-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={300}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif">Getting There</CardTitle>
              </CardHeader>
              <CardContent>
                <EditableText
                  value={weddingData.weddingDetails.gettingThere}
                  onSave={(value) => updateGeneralDetails('gettingThere', value)}
                  label="Edit Getting There Info"
                  multiline
                  className="text-muted-foreground"
                />
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={400}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif">What to Wear</CardTitle>
              </CardHeader>
              <CardContent>
                <EditableText
                  value={weddingData.weddingDetails.whatToWear}
                  onSave={(value) => updateGeneralDetails('whatToWear', value)}
                  label="Edit Dress Code"
                  multiline
                  className="text-muted-foreground"
                />
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={500}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif">Parking</CardTitle>
              </CardHeader>
              <CardContent>
                <EditableText
                  value={weddingData.weddingDetails.parking}
                  onSave={(value) => updateGeneralDetails('parking', value)}
                  label="Edit Parking Info"
                  multiline
                  className="text-muted-foreground"
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
