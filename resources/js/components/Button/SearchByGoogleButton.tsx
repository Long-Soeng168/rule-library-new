import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { Search, Sparkles } from 'lucide-react';

const SearchByGoogleButton = () => {
    const { t, currentLocale } = useTranslation();

    return (
        <div className="py-4">
            <Link
                href="/search-powered-by-google"
                prefetch
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-indigo-500 bg-white px-5 pl-4 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 dark:bg-slate-950"
            >
                {/* Animated Rainbow Gradient Background (Hidden by default, fades in on hover) */}
                <div className="MoveGradient absolute inset-0 -z-10 bg-gradient-to-r from-indigo-400 via-red-400 to-green-400 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />

                {/* Search Icon with a playful bounce */}
                <div className="relative">
                    <Search className="h-5 w-5 text-indigo-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <Sparkles className="absolute -top-2 -right-2 h-3 w-3 scale-0 text-yellow-500 transition-all delay-100 group-hover:scale-100" />
                </div>

                <span className="relative bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent transition-all group-hover:from-indigo-600 group-hover:to-purple-600 dark:from-white dark:to-slate-300">
                    {currentLocale === 'kh' ? 'ស្វែងរកសកល' : 'Global Search'}
                    <div className="absolute bottom-0 left-1/2 h-[1px] w-3/3 origin-left -translate-x-1/2 scale-x-0 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100" />
                </span>

                {/* Vertical Divider with color pulse */}
                <div className="h-5 w-[1.5px] bg-slate-200 transition-colors group-hover:bg-gradient-to-b group-hover:from-red-400 group-hover:to-yellow-400 dark:bg-slate-700"></div>

                {/* Google Logo with a slight "wobble" on hover */}
                <div className="flex items-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]">
                    <img src="/assets/icons/google_logo.png" alt="Google" className="h-4 w-auto object-contain" />
                </div>
            </Link>
            <style x-style>{`
                @keyframes MoveGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .MoveGradient {
                    background-size: 200% 200%;
                    animation: MoveGradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default SearchByGoogleButton;
