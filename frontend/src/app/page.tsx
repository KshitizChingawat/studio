'use client';

import React, { useActionState, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { studentLoginAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Campus } from '@/lib/types';
import { campuses as fallbackCampuses } from '@/lib/data';
import { normalizeBaseUrl } from '@/lib/env';

const initialState: { error?: string } = {};

function SubmitButton({ disabled }: { disabled: boolean }) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="w-full rounded-2xl bg-accent px-6 py-6 text-base font-semibold shadow-lg shadow-accent/30 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Loader2 className="mr-2 hidden h-4 w-4 animate-spin aria-[busy=true]:inline" />
      Continue to Dashboard
    </Button>
  );
}

export default function LoginPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'login-hero');
  const [state, formAction, pending] = useActionState<{ error?: string }, FormData>(studentLoginAction, initialState);
  const [selectedCampusId, setSelectedCampusId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [availableCampuses, setAvailableCampuses] = useState<Campus[]>(fallbackCampuses);

  useEffect(() => {
    const loadCampuses = async () => {
      try {
        const response = await fetch(`${normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL)}/api/campuses`);
        if (!response.ok) {
          throw new Error('Failed to load campuses');
        }
        const data = (await response.json()) as Campus[];
        if (data.length > 0) {
          setAvailableCampuses(data);
        }
      } catch (error) {
        console.error('Error loading campuses:', error);
      }
    };

    void loadCampuses();
  }, []);

  const selectedCampus = useMemo(
    () => availableCampuses.find((campus) => campus.id === selectedCampusId),
    [availableCampuses, selectedCampusId]
  );

  const canSubmit = Boolean(selectedCampusId && email.trim() && password.trim());

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(19,95,156,0.18),_transparent_36%),linear-gradient(135deg,_#fff8ef_0%,_#f4fbff_45%,_#eef8f4_100%)]">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="relative overflow-hidden rounded-[2rem] border-white/60 bg-white/80 shadow-[0_35px_120px_-40px_rgba(16,76,125,0.45)] backdrop-blur">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#1f9eea,#ff8a00,#43b581)]" />
            <CardContent className="grid h-full gap-8 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <Logo />
                <div className="hidden items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary sm:flex">
                  <ShieldCheck className="h-4 w-4" />
                  Campus Verified Access
                </div>
              </div>

              <div className="grid gap-4">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                  <Sparkles className="h-4 w-4" />
                  Faster pickup, cleaner queues
                </div>
                <div className="space-y-3">
                  <h1 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] text-foreground sm:text-5xl">
                    Order on campus in seconds and pick up right on time.
                  </h1>
                  <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                    Sign in with your university email to unlock campus vendors, 15-minute pickup slots, and a scan-ready order code.
                  </p>
                </div>
              </div>

              <form action={formAction} className="grid gap-5">
                <input type="hidden" name="campusId" value={selectedCampusId} />

                <div className="grid gap-2">
                  <Label htmlFor="campus" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    University
                  </Label>
                  <Select onValueChange={setSelectedCampusId} value={selectedCampusId}>
                    <SelectTrigger id="campus" className="h-14 rounded-2xl border-primary/15 bg-white/90 text-base shadow-sm">
                      <SelectValue placeholder="Select your campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCampuses.map((campus) => (
                        <SelectItem key={campus.id} value={campus.id}>
                          {campus.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    University Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={selectedCampus?.emailPlaceholder || 'your.id@university.edu'}
                    className="h-14 rounded-2xl border-primary/15 bg-white/90 text-base shadow-sm"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimum 8 characters"
                    className="h-14 rounded-2xl border-primary/15 bg-white/90 text-base shadow-sm"
                    required
                  />
                </div>

                <div className="rounded-2xl border border-primary/10 bg-slate-50/80 p-4 text-sm text-muted-foreground">
                  Access is granted only when the selected university matches your email domain, for example <span className="font-semibold text-foreground">student@medicaps.ac.in</span>.
                </div>

                {state.error && (
                  <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {state.error}
                  </p>
                )}

                <SubmitButton disabled={!canSubmit || pending} />

                <div className="flex flex-col gap-2 pt-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <p>Need the vendor console instead?</p>
                  <Link href="/vendor-admin/login" className="font-semibold text-primary transition-colors hover:text-primary/70">
                    Switch to Vendor Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="relative hidden min-h-[720px] overflow-hidden rounded-[2rem] border border-white/50 bg-slate-950 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.9)] lg:block">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                priority
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.8)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.26),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.24),transparent_32%)]" />

            <div className="absolute inset-x-8 top-8 rounded-[1.5rem] border border-white/20 bg-white/10 p-5 text-white backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Live Campus Pulse</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-3xl font-black font-headline">15m</p>
                  <p className="text-sm text-white/75">Pickup interval rhythm</p>
                </div>
                <div>
                  <p className="text-3xl font-black font-headline">3x</p>
                  <p className="text-sm text-white/75">Faster queue movement</p>
                </div>
                <div>
                  <p className="text-3xl font-black font-headline">Scan</p>
                  <p className="text-sm text-white/75">Ready QR confirmation</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-8 bottom-8 rounded-[1.75rem] border border-white/15 bg-slate-950/50 p-6 text-white backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Student Experience</p>
              <h2 className="mt-3 text-3xl font-black font-headline leading-tight tracking-[-0.04em]">
                Designed for crowded lunch windows, built for every screen.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
                Responsive layouts, cleaner typography, animated surfaces, and protected routing keep the experience smooth from mobile phones to laptop dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
