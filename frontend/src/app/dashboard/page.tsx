import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/header';
import { getVendors } from '@/lib/api';

export default async function Dashboard() {
  const vendors = await getVendors();
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 font-headline text-foreground">Vendors on Campus</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vendors.map(vendor => {
              const vendorImage = getImage(vendor.imageId);
              return (
                <Link href={`/vendor/${vendor.id}`} key={vendor.id} className="group">
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                         {vendorImage ? (
                          <Image
                            src={vendorImage.imageUrl}
                            alt={vendorImage.description}
                            data-ai-hint={vendorImage.imageHint}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : <div className="bg-muted h-full w-full"></div>}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <Badge variant="secondary" className="mt-2 mb-2 text-xs">{vendor.cuisine}</Badge>
                        <CardTitle className="text-xl font-semibold font-headline">{vendor.name}</CardTitle>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
