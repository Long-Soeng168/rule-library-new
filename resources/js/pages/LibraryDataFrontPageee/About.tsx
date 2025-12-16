import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';
import AvatarLogoFallback from '@/components/Avatar/AvatarLogoFallback';
import HtmlContentDisplay from '@/components/Typography/HtmlContentDisplay';
import useTranslation from '@/hooks/use-translation';
import LibraryDataFrontPageLayout from '@/layouts/LibraryDataFrontPageLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

const About: React.FC = () => {
    const { aboutData, app_url } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    const name = currentLocale === 'kh' ? aboutData?.name_kh || aboutData?.name : aboutData?.name;
    const short_description = currentLocale === 'kh' ? aboutData?.short_description_kh || aboutData?.short_description : aboutData?.short_description;
    const long_description = currentLocale === 'kh' ? aboutData?.long_description_kh || aboutData?.long_description : aboutData?.long_description;
    const image = `${app_url}/assets/images/pages/${aboutData?.images[0]?.image}`;
    return (
        <LibraryDataFrontPageLayout>
            <Head>
                {/* Basic Meta */}
                <title>{name}</title>
                <meta name="description" content={short_description} />

                {/* Open Graph */}
                <meta property="og:title" content={name} />
                <meta property="og:description" content={short_description} />
                <meta property="og:image" content={image} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${app_url}/about`} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={name} />
                <meta name="twitter:description" content={short_description} />
                <meta name="twitter:image" content={image} />
            </Head>

            <div className="mb-40">
                <section className="sticky top-0 overflow-hidden text-white">
                    {/* Background image */}
                    <AvatarLogoFallback
                        className="h-auto max-h-[400px] w-full rounded-none object-cover"
                        alt="About Cambodia Library Association"
                        image={`/assets/images/pages/${aboutData?.images[0]?.image}`}
                        fallbackClassName="h-auto max-h-[400px] rounded-none w-full object-cover"
                    />

                    {/* Gradient overlay with lower opacity */}
                    <StarsBackground className="absolute inset-0 opacity-50 dark:block" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                        <h1 className="mb-4 text-2xl font-bold md:text-5xl">{name}</h1>
                        <p className="text-base opacity-90 md:text-xl">{short_description}</p>
                    </div>
                </section>

                {/* Intro */}
                <div className="sticky bg-background">
                    <section className="section-container px-4 py-16">
                        <HtmlContentDisplay content={long_description} />
                    </section>
                </div>
            </div>
        </LibraryDataFrontPageLayout>
    );
};

export default About;
