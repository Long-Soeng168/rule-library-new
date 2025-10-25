import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';

export const NavMenu2 = ({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) => {
    const { t, currentLocale } = useTranslation();
    const links = [
        { label: t('Home'), href: '/' },
        { label: 'E-Resources', href: '/resources' },
        { label: 'Posts', href: '/posts' },
        { label: 'About', href: '/about' },
        { label: 'Our Journey', href: '/our-journey' },
        { label: 'Profile', href: '/profile' },
    ];

    return (
        <ul className={`flex flex-1 justify-start gap-1 ${orientation === 'vertical' ? 'w-full flex-col items-start gap-3' : ''} `}>
            {links.map((item) => (
                <li key={item.label} className={`group ${orientation === 'vertical' ? 'w-full' : 'w-auto'}`}>
                    <Link
                        href={item.href}
                        className="relative block w-full rounded-none px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted dark:hover:bg-none"
                    >
                        {item.label}
                    </Link>
                    <div className="h-[2px] w-full origin-left scale-x-0 bg-true-primary transition-transform duration-300 group-hover:scale-x-100"></div>
                </li>
            ))}
        </ul>
    );
};
