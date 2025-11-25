import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { BookOpenTextIcon, FileTextIcon, HeadphonesIcon, LibraryIcon } from 'lucide-react';
import { AnimatedGradientTextBadge } from '../animate-ui/text/AnimatedGradientTextBadge';
import LibrarySearch from '../Search/LibrarySearch';
import { Button } from '../ui/button';

const data = [
    { name: 'Theses', icon: FileTextIcon },
    { name: 'Publication', icon: LibraryIcon },
    { name: 'Research Paper', icon: BookOpenTextIcon },
    { name: 'Audios', icon: HeadphonesIcon },
];
const Hero = () => {
    const { homepageHero } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    return (
        <section className="relative flex flex-col overflow-x-hidden bg-background py-10 text-foreground">
            <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                <div className="mx-auto max-w-5xl space-y-6">
                    <Link href={`/about`}>
                        <AnimatedGradientTextBadge />
                    </Link>
                    <h1 className="px-10 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:px-20 md:text-5xl">
                        {/* {currentLocale === 'kh' ? homepageHero?.name_kh || homepageHero?.name : homepageHero?.name} */}
                        All Library Resources. In One Place.
                    </h1>

                    <div className="flex justify-center">
                        {/* Subtitle */}
                        <div className="max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
                            {/* {currentLocale === 'kh'
                                ? homepageHero?.short_description_kh || homepageHero?.short_description
                                : homepageHero?.short_description} */}
                            <p>Your centralized source for RULE library — e-resources, posts, and key info all in one spot.</p>
                        </div>
                    </div>

                    {/* Search bar */}
                    <LibrarySearch />

                    {/* Suggestion pills */}
                    <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3 gap-y-3">
                        {data.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={i}
                                    variant="secondary"
                                    className="flex items-center gap-1 rounded-full border border-accent px-3 py-1 text-xs transition-all duration-300 hover:border-primary sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                                >
                                    <Icon className="h-4 w-4 text-primary" />
                                    {item.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Hero;
