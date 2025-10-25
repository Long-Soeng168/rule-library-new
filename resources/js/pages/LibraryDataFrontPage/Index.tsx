import SpaceAnimateButton from '@/components/Button/SpaceAnimateButton';
import { ContentHeader } from '@/components/Header/ContentHeader';
import Accordion1 from '@/components/Section/Accordion1';
import Feature1 from '@/components/Section/Feature1';
import Feature2 from '@/components/Section/Feature2';
import { Feature3 } from '@/components/Section/Feature3';
import Feature4 from '@/components/Section/Feature4';
import Feature5 from '@/components/Section/Feature5';
import Feature6 from '@/components/Section/Feature6';
import Hero from '@/components/Section/Hero';
import useTranslation from '@/hooks/use-translation';
import LibraryDataFrontPageLayout from '@/layouts/LibraryDataFrontPageLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const Index = () => {
    const { website_info, app_url, sourceOfFundingHeader, libraryTypeHeader, provinceHeader, claStatisticHeader } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    const description =
        currentLocale === 'kh' ? website_info?.short_description_kh || website_info?.short_description : website_info?.short_description;
    const keywords = currentLocale === 'kh' ? website_info?.keywords_kh || website_info?.keywords : website_info?.keywords;
    const title = currentLocale === 'kh' ? website_info?.name_kh || website_info?.name : website_info?.name;
    const image = `${app_url}/assets/images/website_infos/${website_info.logo}`;
    return (
        <LibraryDataFrontPageLayout>
            <Head>
                {/* Basic Meta */}
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />

                {/* Open Graph */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={app_url} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
            </Head>

            {/* Search bar */}
            <Hero />

            {/* Libraries */}
            <Feature2 />

            {/* Types of Libraries */}
            <div className="section-container mt-10">
                <ContentHeader
                    title={currentLocale === 'kh' ? libraryTypeHeader?.name_kh || libraryTypeHeader?.name : libraryTypeHeader?.name}
                    description={
                        currentLocale === 'kh'
                            ? libraryTypeHeader?.short_description_kh || libraryTypeHeader?.short_description
                            : libraryTypeHeader?.short_description
                    }
                />

                <Feature3 />
            </div>

            {/* Sources of Funding */}
            <div className="section-container mt-20">
                <ContentHeader
                    title={currentLocale === 'kh' ? sourceOfFundingHeader?.name_kh || sourceOfFundingHeader?.name : sourceOfFundingHeader?.name}
                    description={
                        currentLocale === 'kh'
                            ? sourceOfFundingHeader?.short_description_kh || sourceOfFundingHeader?.short_description
                            : sourceOfFundingHeader?.short_description
                    }
                />

                <Feature4 />
            </div>

            {/* Provinces */}
            <div className="section-container mt-20">
                <ContentHeader
                    title={currentLocale === 'kh' ? provinceHeader?.name_kh || provinceHeader?.name : provinceHeader?.name}
                    description={
                        currentLocale === 'kh'
                            ? provinceHeader?.short_description_kh || provinceHeader?.short_description
                            : provinceHeader?.short_description
                    }
                />

                <Feature5 />
            </div>

            {/* Libraries Statistics */}
            <div className="section-container mt-10">
                <ContentHeader
                    title={currentLocale === 'kh' ? claStatisticHeader?.name_kh || claStatisticHeader?.name : claStatisticHeader?.name}
                    description={
                        currentLocale === 'kh'
                            ? claStatisticHeader?.short_description_kh || claStatisticHeader?.short_description
                            : claStatisticHeader?.short_description
                    }
                />

                <Feature6 />
            </div>

            {/* What We Offer */}
            <Feature1 />

            {/* Accordion */}
            <div className="section-container mt-20">
                <Accordion1 />
            </div>

            <div className="section-container my-20 flex justify-center">
                <Link href={`/libraries`}>
                    <SpaceAnimateButton title={t('See All Libraries')} />
                </Link>
            </div>
        </LibraryDataFrontPageLayout>
    );
};

export default Index;
