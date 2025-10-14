"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, QrCode, ClipboardList, CircleUser } from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function VendorAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/vendor-admin/login') {
    return <>{children}</>;
  }
  
  const isActive = (path: string) => pathname.startsWith(path);

  const navItems = [
    { href: '/vendor-admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/vendor-admin/kds', label: 'Kitchen Display', icon: ClipboardList },
    { href: '/vendor-admin/menu', label: 'Menu Items', icon: Package },
    { href: '/vendor-admin/scanner', label: 'Order Scanner', icon: QrCode },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="dark bg-sidebar text-sidebar-foreground">
        <SidebarHeader>
           <div className="flex items-center justify-center h-12 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10">
              <UtensilsCrossedIcon className="h-6 w-6 text-primary transition-all group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5" />
              <div className="text-xl font-bold ml-2 transition-opacity opacity-100 group-data-[collapsible=icon]:opacity-0">CampusPreorder</div>
           </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map(item => (
              <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={{children: item.label, side:'right'}}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="justify-start w-full gap-2 p-2 h-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
                 <CircleUser className="h-5 w-5 shrink-0" />
                 <span className="transition-opacity opacity-100 group-data-[collapsible=icon]:opacity-0">Vendor Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuLabel>Vendor Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/vendor-admin/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-muted/40 dark:bg-background">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 dark:bg-background/90 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger className="sm:hidden" />
        </header>
        <main className="p-4 sm:px-6 sm:py-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function UtensilsCrossedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
      <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
      <path d="m2.1 21.8 6.4-6.3" />
      <path d="m19 5-7 7" />
    </svg>
  )
}
