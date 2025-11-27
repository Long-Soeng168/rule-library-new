import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from 'lucide-react';

interface ContentHeaderProps {
    title: string;
    description?: string;
    link?: string;
    containerClassName?: string;
}

export function ContentHeader({ title, description, link, containerClassName }: ContentHeaderProps) {
    return (
        <div className={cn(`mb-4`, containerClassName)}>
            {link ? (
                <Link href={link} prefetch className="group inline-flex items-center gap-2">
                    {/* Title + animated underline wrapper */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>

                        {/* Animate underline left → right */}
                        <div className="h-[3px] w-full origin-left scale-x-0 bg-true-primary transition-transform duration-300 group-hover:scale-x-100"></div>
                    </div>

                    {/* Chevron */}
                    <div
                        className={cn(
                            'top-3 right-3 flex -translate-x-4 scale-75 items-center justify-center rounded-full bg-primary p-1 text-primary-foreground opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 hover:translate-x-1 hover:scale-105',
                        )}
                    >
                        <ChevronRightIcon className="size-4" />
                    </div>
                </Link>
            ) : (
                <h2 className="text-3xl font-bold tracking-tight md:text-3xl">{title}</h2>
            )}
            {description && <p className="mt-2 text-gray-500">{description}</p>}
        </div>
    );
}
