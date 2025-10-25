import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import LibrarySearch from '../Search/LibrarySearch';

const Hero = () => {
    const { homepageHero } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    return (
        <section className="relative flex flex-col overflow-x-hidden bg-background py-10 text-foreground">
            <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                <div className="mx-auto max-w-5xl space-y-6">
                    {/* Headline */}
                    <h1 className="px-10 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:px-20 md:text-5xl">
                        {currentLocale === 'kh' ? homepageHero?.name_kh || homepageHero?.name : homepageHero?.name}
                    </h1>

                    <div className="flex justify-center">
                        {/* Subtitle */}
                        <p className="max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
                            {currentLocale === 'kh'
                                ? homepageHero?.short_description_kh || homepageHero?.short_description
                                : homepageHero?.short_description}
                        </p>
                    </div>

                    {/* Search bar */}
                    <LibrarySearch />

                    {/* Suggestion pills */}
                    {/* <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2 gap-y-3">
                        {[
                            'National Library',
                            'University Libraries',
                            'School Libraries',
                            'Community Libraries',
                            'Pagoda Libraries',
                            'NGO Libraries',
                        ].map((suggestion, i) => (
                            <Button
                                key={i}
                                variant="secondary"
                                className="rounded-full border border-accent px-3 py-1 text-xs transition-all duration-300 hover:border-primary sm:px-4 sm:py-2 sm:text-sm"
                            >
                                {suggestion}
                            </Button>
                        ))}
                    </div> */}
                </div>
            </main>
        </section>
    );
};

export default Hero;
