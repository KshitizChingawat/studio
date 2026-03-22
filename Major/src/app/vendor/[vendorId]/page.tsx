import { vendors, menuItems, type MenuItem } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/header';
import { MenuAndCart } from './components/menu-and-cart';

export default async function VendorPage({ params }: { params: Promise<{ vendorId: string }> }) {
  const { vendorId } = await params;
  const vendor = vendors.find(v => v.id === vendorId);
  const currentMenuItems = menuItems[vendorId] as MenuItem[] | undefined;
  
  if (!vendor || !currentMenuItems) {
    notFound();
  }

  const vendorImage = PlaceHolderImages.find(img => img.id === vendor.imageId);

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className="flex-1">
        <div className="relative h-64 w-full">
            {vendorImage && (
              <Image 
                src={vendorImage.imageUrl} 
                alt={vendor.name}
                data-ai-hint={vendorImage.imageHint}
                fill 
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/50 flex items-end p-8">
              <h1 className="text-4xl font-bold text-white font-headline">{vendor.name}</h1>
            </div>
        </div>
        <MenuAndCart vendor={vendor} menuItems={currentMenuItems} />
      </main>
    </div>
  );
}
