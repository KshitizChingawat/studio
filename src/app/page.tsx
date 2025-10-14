import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { campuses } from '@/lib/data';

export default function LoginPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'login-hero');

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center min-h-screen p-6 sm:p-8">
        <div className="w-full max-w-sm">
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto pb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
              <CardDescription>
                Select your campus and log in to order ahead.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="campus">Campus</Label>
                  <Select>
                    <SelectTrigger id="campus" className="w-full">
                      <SelectValue placeholder="Select your campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {campuses.map((campus) => (
                        <SelectItem key={campus.id} value={campus.id}>{campus.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">College ID or Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.id@university.edu"
                    required
                  />
                </div>
                <Button type="submit" asChild className="w-full bg-accent hover:bg-accent/90 mt-2">
                  <Link href="/dashboard">Login</Link>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-center flex-col gap-2 pt-4">
              <p className="text-muted-foreground">Are you a vendor?</p>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/vendor-admin/dashboard">
                  Go to Vendor Dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="hidden lg:block relative">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-primary/20" />
      </div>
    </div>
  );
}
