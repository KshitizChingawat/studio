import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/logo';

export default function VendorLoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-sm">
        <Card className="shadow-2xl">
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
