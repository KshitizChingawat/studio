import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function VendorLoginPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'vendor-login-hero');

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          data-ai-hint={bgImage.imageHint}
          fill
          className="object-cover filter blur-sm"
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="w-full max-w-sm z-10">
        <Card className="shadow-2xl bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto pb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-headline">Vendor Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the vendor dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vendor@example.com"
                  required
                />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                />
              </div>
              <Button type="submit" asChild className="w-full bg-accent hover:bg-accent/90 mt-2">
                <Link href="/vendor-admin/dashboard">Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
