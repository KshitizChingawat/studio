import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary rounded-lg group-hover:bg-primary/90 transition-colors">
        <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="text-xl font-bold text-foreground font-headline tracking-tighter">
        CampusPreorder
      </h1>
    </Link>
  );
}
