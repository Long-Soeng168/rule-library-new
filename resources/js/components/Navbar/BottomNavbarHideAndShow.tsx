import { Link } from '@inertiajs/react';
import { BookOpen, Home, Info, Newspaper, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function BottomNavbarHideAndShow() {
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 0) {
                // at top → show
                setShow(true);
            } else if (currentScrollY > lastScrollY.current) {
                // scrolling down → hide
                setShow(false);
            } else {
                // scrolling up → show
                setShow(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', controlNavbar, { passive: true });
        return () => window.removeEventListener('scroll', controlNavbar);
    }, []);

    const navItems = [
        { label: 'Home', url: '/', icon: <Home size={20} /> },
        { label: 'E-Resources', url: '/resources', icon: <BookOpen size={20} /> },
        { label: 'Posts', url: '/posts', icon: <Newspaper size={20} /> },
        { label: 'About', url: '/about', icon: <Info size={20} /> },
        { label: 'Profile', url: '/profile', icon: <User size={20} /> },
    ];

    return (
        <nav
            className={`fixed bottom-0 left-0 z-40 w-full border-t border-border bg-background transition-transform duration-300 ease-in-out ${
                show ? 'translate-y-0' : 'translate-y-full'
            } lg:hidden`}
        >
            <div className="flex items-center justify-around py-2">
                {navItems.map((item, i) => (
                    <Link href={item.url} prefetch>
                        <button key={i} className="flex flex-col items-center text-xs text-gray-600 transition-colors hover:text-primary">
                            {item.icon}
                            <span className="mt-1">{item.label}</span>
                        </button>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
