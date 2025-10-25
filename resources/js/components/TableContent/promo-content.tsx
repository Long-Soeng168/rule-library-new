/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';

interface PromoContentProps {
    variant?: 'desktop' | 'mobile';
    className?: string;
}

export function PromoContent({ variant = 'desktop', className }: PromoContentProps) {
    if (variant === 'mobile') {
        return (
            <div className={cn('border-t border-border bg-muted/20 p-3', className)}>
                <div className="flex items-center gap-3">
                    <img src="/icon512_maskable.png" alt="Magic UI" className="h-8 w-8 flex-shrink-0 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-foreground/90">Royal University of Law and Economic</p>
                        <p className="truncate text-xs text-muted-foreground">Library</p>
                    </div>
                    <a href="#" className="text-xs font-medium text-primary hover:text-primary/80" onClick={(e) => e.stopPropagation()}>
                        Home Page
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={cn('rounded-lg border border-border bg-card p-4', className)}>
            <div className="flex flex-col gap-4">
                <img src="/magicui-pro.png" alt="Magic UI" className="h-40 w-full rounded-md object-cover" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold tracking-tighter">Try Magic UI Pro</h3>
                    <p className="text-sm text-muted-foreground">
                        Magic UI Pro is a design system for building beautiful and responsive web applications.
                    </p>
                </div>
            </div>
        </div>
    );
}
