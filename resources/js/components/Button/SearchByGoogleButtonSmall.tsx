import { Link } from '@inertiajs/react';
import { Search, SparklesIcon } from 'lucide-react';

const SearchByGoogleButtonSmall = () => {
    return (
        <div className="inline-block p-1"> {/* Tiny padding to prevent glow clipping */}
            <Link
                href="/search-powered-by-google"
                prefetch
                className="group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-lg border border-[#4086f4]/30 bg-white px-2.5 transition-all duration-300 hover:border-[#4086f4]/60 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] dark:bg-slate-950"
            >
                {/* Animated Rainbow Flare - Improved contrast */}
                <div className="MoveGradient absolute inset-0  bg-gradient-to-r from-[#4086f4] via-red-400 to-green-400 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />

                {/* Search Icon - Subtle color shift on hover */}
                <div className="relative flex items-center">
                    <Search className="h-4.5 w-4.5 text-[#4086f4] transition-all duration-300 group-hover:scale-110 group-hover:text-[#4086f4] dark:group-hover:text-[#4086f4]" />
                    <SparklesIcon className="absolute -top-[7px] -right-[7px] size-3 scale-0 text-yellow-500 transition-all delay-100 group-hover:scale-100" />
                </div>

                {/* Divider - Keeps the layout from looking cluttered */}
                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

                {/* Google Logo */}
                <div className="flex items-center transition-transform duration-300 group-hover:scale-110">
                    <img 
                        src="/assets/icons/google_logo.png" 
                        alt="Google" 
                        className="h-3.5 w-auto object-contain select-none" 
                    />
                </div>

                {/* Bottom Shine Streak */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-[#4086f4] to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            </Link>

            <style>{`
                @keyframes MoveGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .MoveGradient {
                    background-size: 200% 200%;
                    animation: MoveGradient 4s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default SearchByGoogleButtonSmall;