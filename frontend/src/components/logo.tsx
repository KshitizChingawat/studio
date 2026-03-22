import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/dashboard" className="group flex items-center gap-3">
      <div className="rounded-2xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] p-2.5 shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:-translate-y-0.5">
        <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="text-xl font-black text-foreground font-headline tracking-[-0.06em] sm:text-2xl">
        CampusPreorder
      </h1>
    </Link>
  );
}
