'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import { ArrowLeftRight, Loader2, ShieldCheck } from 'lucide-react';
import { vendorLoginAction } from '@/app/actions/auth';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const initialState: { error?: string } = {};

export default function VendorLoginPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'vendor-login-hero-2');
  const [state, formAction, pending] = useActionState<{ error?: string }, FormData>(vendorLoginAction, initialState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = Boolean(email.trim() && password.trim());

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#081623_0%,#13293d_38%,#173e56_100%)]">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          data-ai-hint={bgImage.imageHint}
          fill
          priority
          className="object-cover opacity-25"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.24),transparent_24%)]" />

      <section className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <Card className="w-full max-w-xl overflow-hidden rounded-[2rem] border-white/10 bg-slate-950/65 text-white shadow-[0_35px_120px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <CardContent className="grid gap-8 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 sm:flex">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Protected Vendor Console
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/80">Vendor Portal</p>
              <CardTitle className="text-4xl font-black font-headline tracking-[-0.04em] text-white">
                Run orders, menu updates, and pickup scanning from one screen.
              </CardTitle>
              <CardDescription className="max-w-lg text-base leading-7 text-white/70">
                Sign in with your vendor account to reach the kitchen display, live menu tools, and scanner workflow.
              </CardDescription>
            </div>

            <form action={formAction} className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Vendor Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="foodcourt@campuspreorder.com"
                  className="h-14 rounded-2xl border-white/10 bg-white/10 text-base text-white placeholder:text-white/45"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-14 rounded-2xl border-white/10 bg-white/10 text-base text-white placeholder:text-white/45"
                  required
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                Demo vendor credentials: <span className="font-semibold text-white">foodcourt@campuspreorder.com</span> with password <span className="font-semibold text-white">Vendor@123</span>.
              </div>

              {state.error && (
                <p className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                  {state.error}
                </p>
              )}

              <Button
                type="submit"
                disabled={!canSubmit || pending}
                className="h-14 rounded-2xl bg-accent text-base font-semibold shadow-lg shadow-accent/25 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enter Vendor Dashboard
              </Button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-cyan-200 transition-colors hover:text-white"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Move to Student Login
              </Link>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
