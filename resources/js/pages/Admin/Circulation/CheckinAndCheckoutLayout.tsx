import { SwitchDarkModeSmoothAnimated } from '@/components/Switch/SwitchDarkModeSmoothAnimated';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRightLeft } from 'lucide-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

export default function CheckinAndCheckoutLayout({ children }: Props) {
    const { url } = usePage();

    // Determine active state based on the current URL path
    const isCheckout = url.startsWith('/admin/circulations-checkout');
    const isCheckin = url.startsWith('/admin/circulations-checkin');

    return (
        <>
            <Head title="Circulation Desk" />

            <div className="section-container my-10">
                {/* HEADER SECTION */}
                <div className="mb-8 flex flex-col justify-between gap-6 border-b border-border/60 pb-8 md:flex-row md:items-center">
                    {/* Page Title & Icon Section */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex size-12 items-center justify-center rounded-sm bg-primary/10">
                            <ArrowRightLeft className="size-6 text-primary" />
                            {/* Status Pulse Dot */}
                            <div
                                className={cn(
                                    'absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-background',
                                    isCheckout ? 'bg-blue-500 dark:bg-blue-400' : 'bg-green-500',
                                )}
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-foreground">Circulation</h1>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/80 uppercase">Mode</p>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'h-5 rounded border-none px-2 text-[10px] font-bold tracking-wider uppercase',
                                        isCheckout
                                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                            : 'bg-green-500/10 text-green-600 dark:text-green-500',
                                    )}
                                >
                                    {isCheckout ? 'Check-Out' : 'Check-In'}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Navigation Toggle (Segmented Control) */}
                        <div className="flex items-center gap-1 rounded-sm border bg-muted/40 p-1.5 shadow-inner">
                            <Link href="/admin/circulations-checkout" className="contents">
                                <button
                                    className={cn(
                                        'flex min-w-[100px] cursor-pointer items-center justify-center rounded px-5 py-2 text-sm font-semibold transition-all duration-200',
                                        isCheckout
                                            ? 'bg-background text-primary shadow-md ring-1 ring-black/5 dark:bg-white/15'
                                            : 'text-muted-foreground hover:bg-background/40 hover:text-foreground',
                                    )}
                                >
                                    Check Out
                                </button>
                            </Link>
                            <Link href="/admin/circulations-checkin" className="contents">
                                <button
                                    className={cn(
                                        'flex min-w-[100px] cursor-pointer items-center justify-center rounded px-5 py-2 text-sm font-semibold transition-all duration-200',
                                        isCheckin
                                            ? 'bg-background text-primary shadow-md ring-1 ring-black/5 dark:bg-white/15'
                                            : 'text-muted-foreground hover:bg-background/40 hover:text-foreground',
                                    )}
                                >
                                    Check In
                                </button>
                            </Link>
                        </div>

                        {/* Action Buttons */}
                        <div className="ml-2 flex items-center gap-2 border-l border-border/60 pl-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="h-9 px-4 font-bold tracking-tight uppercase hover:bg-muted">
                                    Dashboard
                                </Button>
                            </Link>
                            <div className="mx-1 h-8 w-[1px] bg-border/60" />
                            <SwitchDarkModeSmoothAnimated />
                        </div>
                    </div>
                </div>

                {/* PAGE CONTENT */}
                <main className="duration-500 animate-in fade-in">{children}</main>
            </div>
        </>
    );
}
