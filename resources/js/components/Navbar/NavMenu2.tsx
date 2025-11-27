import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { BookOpenTextIcon, ChevronDown, HomeIcon, InfoIcon, NewspaperIcon, UserIcon } from 'lucide-react';

export const NavMenu2 = ({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) => {
    const { t } = useTranslation();

    return (
        <ul className={`flex flex-1 justify-start gap-2 ${orientation === 'vertical' ? 'w-full flex-col items-start gap-3' : ''}`}>
            <li className={`group ${orientation === 'vertical' ? 'w-full' : 'w-auto'}`}>
                <Link
                    prefetch
                    href="/"
                    className="relative flex w-full items-center gap-1 rounded-none px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted dark:hover:bg-none"
                >
                    <HomeIcon className="text-muted-foreground" size={16} />
                    {t('Home')}
                </Link>

                <div className="h-[2px] w-full origin-left scale-x-0 bg-true-primary transition-transform duration-300 group-hover:scale-x-100"></div>
            </li>

            <li className={`group ${orientation === 'vertical' ? 'w-full' : 'w-auto'}`}>
                <Link
                    prefetch
                    href="/resources"
                    className="relative flex w-full items-center gap-1 rounded-none px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted dark:hover:bg-none"
                >
                    <BookOpenTextIcon className="text-muted-foreground" size={16} />
                    E-Resources
                </Link>
                <div className="h-[2px] w-full origin-left scale-x-0 bg-true-primary transition-transform duration-300 group-hover:scale-x-100"></div>
            </li>

            <li className={`group ${orientation === 'vertical' ? 'w-full' : 'w-auto'}`}>
                <Link
                    prefetch
                    href="/posts"
                    className="relative flex w-full items-center gap-1 rounded-none px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted dark:hover:bg-none"
                >
                    <NewspaperIcon className="text-muted-foreground" size={16} />
                    Posts
                </Link>
                <div className="h-[2px] w-full origin-left scale-x-0 bg-true-primary transition-transform duration-300 group-hover:scale-x-100"></div>
            </li>

            <li className={`group relative ${orientation === 'vertical' ? 'w-full' : 'w-auto'}`}>
                <Link
                    prefetch
                    href="/about"
                    className="relative flex w-full items-center gap-1 rounded-none px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted dark:hover:bg-none"
                >
                    <InfoIcon className="text-muted-foreground" size={16} />
                    About
                    <ChevronDown className="ml-2 text-muted-foreground" size={16} />
                </Link>
                <div className="h-[2px] w-full origin-left scale-x-0 bg-true-primary transition-transform duration-300 group-hover:scale-x-100"></div>

                {/* Dropdown */}
                <ul className="absolute top-full left-0 z-20 mt-0 hidden w-full flex-col border bg-background shadow-lg group-hover:flex dark:border-white/30">
                    <li>
                        <Link prefetch href="/about" className="block px-3 py-2 text-sm text-foreground hover:bg-muted dark:hover:bg-none">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link prefetch href="/our-journey" className="block px-3 py-2 text-sm text-foreground hover:bg-muted dark:hover:bg-none">
                            Our Journey
                        </Link>
                    </li>
                    <li>
                        <Link prefetch href="/our-staffs" className="block px-3 py-2 text-sm text-foreground hover:bg-muted dark:hover:bg-none">
                            Our Staffs
                        </Link>
                    </li>
                    <li>
                        <Link
                            prefetch
                            href="/our-staffs-structure"
                            className="block px-3 py-2 text-sm text-foreground hover:bg-muted dark:hover:bg-none"
                        >
                            Staffs Structure
                        </Link>
                    </li>
                </ul>
            </li>

            <li className={`group ${orientation === 'vertical' ? 'w-full' : 'w-auto'}`}>
                <Link
                    prefetch
                    href="/profile"
                    className="relative flex w-full items-center gap-1 rounded-none px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted dark:hover:bg-none"
                >
                    <UserIcon className="text-muted-foreground" size={16} />
                    Profile
                </Link>
                <div className="h-[2px] w-full origin-left scale-x-0 bg-true-primary transition-transform duration-300 group-hover:scale-x-100"></div>
            </li>
        </ul>
    );
};
