import NavLanguage from '@/components/Navbar/NavLanguage';
import { SwitchDarkModeSmoothAnimated } from '@/components/Switch/SwitchDarkModeSmoothAnimated';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRightLeft, LayoutIcon } from 'lucide-react';
import React from 'react';
import { Toaster } from 'sonner';

interface Props {
    children: React.ReactNode;
}

export default function CheckinAndCheckoutLayout({ children }: Props) {
    const { url } = usePage();

    const isCheckout = url.startsWith('/admin/circulations-checkout');
    const isCheckin = url.startsWith('/admin/circulations-checkin');

    return (
        <>
            <Toaster />
            <Head title="Circulation Desk" />

            {/* Reduced margins for mobile (my-6 vs my-10) */}
            <div className="section-container my-6 px-4 md:my-6 md:px-6">
                {/* HEADER SECTION */}
                <div className="mb-4 flex flex-col gap-6 border-b border-border/60 pb-6 md:mb-4 md:flex-row md:items-center md:justify-between md:pb-6">
                    {/* Top Row: Title & Action Icons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="relative flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-transform active:scale-95 md:size-12">
                                <ArrowRightLeft className="size-5 text-primary md:size-6" />
                                <div
                                    className={cn(
                                        'absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-background',
                                        isCheckout ? 'bg-blue-500' : 'bg-green-500',
                                    )}
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-black tracking-tight text-foreground md:text-2xl">Circulation</h1>
                                <div className="flex items-center gap-2">
                                    <p className="text-[9px] font-black tracking-widest text-muted-foreground/60 uppercase">Mode</p>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            'h-4 overflow-hidden rounded border-none px-1.5 text-[9px] font-bold md:h-5 md:text-[10px]',
                                            isCheckout ? 'bg-blue-500/10 text-blue-600' : 'bg-green-500/10 text-green-600',
                                        )}
                                    >
                                        {isCheckout ? 'Check-Out' : 'Check-In'}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Mobile-only Quick Actions */}
                        <div className="flex items-center gap-1 md:hidden">
                            <NavLanguage />
                            <SwitchDarkModeSmoothAnimated />
                        </div>
                    </div>

                    {/* Navigation & Desktop Controls */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        {/* Segmented Control - Full width on mobile */}
                        <div className="flex w-full items-center gap-1 rounded-xl border bg-muted/30 p-1 md:w-auto md:rounded-lg">
                            <Link href="/admin/circulations-checkout" className="flex-1">
                                <button
                                    className={cn(
                                        'w-full shrink-0 cursor-pointer rounded-md px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200 md:rounded-sm md:py-1.5',
                                        isCheckout
                                            ? 'bg-background text-primary ring-1 ring-black/5 dark:bg-zinc-800'
                                            : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    Check Out
                                </button>
                            </Link>
                            <Link href="/admin/circulations-checkin" className="flex-1">
                                <button
                                    className={cn(
                                        'w-full shrink-0 cursor-pointer rounded-md px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200 md:rounded-sm md:py-1.5',
                                        isCheckin
                                            ? 'bg-background text-primary ring-1 ring-black/5 dark:bg-zinc-800'
                                            : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    Check In
                                </button>
                            </Link>
                        </div>

                        {/* Desktop-only secondary controls */}
                        <div className="hidden items-center gap-2 border-l border-border/60 pl-4 md:flex">
                            <SwitchDarkModeSmoothAnimated />
                            <NavLanguage />
                            <div className="mx-2 h-6 w-px bg-border/60" />
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="text-[11px] font-bold tracking-wider uppercase">
                                    <LayoutIcon className="mr-2 size-4" /> Dashboard
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Dashboard Link - Compact */}
                        <Link href="/dashboard" className="md:hidden">
                            <Button
                                variant="outline"
                                className="w-full justify-center border-dashed py-5 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                            >
                                <LayoutIcon className="mr-2 size-4" /> Return to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* PAGE CONTENT */}
                <main className="duration-500 animate-in fade-in slide-in-from-bottom-2">{children}</main>
            </div>
        </>
    );
}
