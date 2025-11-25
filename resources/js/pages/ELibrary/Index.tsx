import SpaceAnimateButton from '@/components/Button/SpaceAnimateButton';
import { ContentHeader } from '@/components/Header/ContentHeader';
import Accordion1 from '@/components/Section/Accordion1';
import Feature1 from '@/components/Section/Feature1';
import Feature2 from '@/components/Section/Feature2';
import { Feature3 } from '@/components/Section/Feature3';
import { Feature3Copy } from '@/components/Section/Feature3Copy';
import Feature6 from '@/components/Section/Feature6';
import Hero from '@/components/Section/Hero';
import useTranslation from '@/hooks/use-translation';
import ELibraryLayout from '@/layouts/ELibraryLayout';
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
        <ELibraryLayout>
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

            {/* E-Resource Hightligh */}
            <Feature2 />

            {/* Types of Libraries */}
            <div className="section-container mt-20">
                <ContentHeader
                    // title={currentLocale === 'kh' ? libraryTypeHeader?.name_kh || libraryTypeHeader?.name : libraryTypeHeader?.name}
                    // description={
                    //     currentLocale === 'kh'
                    //         ? libraryTypeHeader?.short_description_kh || libraryTypeHeader?.short_description
                    //         : libraryTypeHeader?.short_description
                    // }
                    title="Thesis by Major"
                    description="Browse all theses, organized by major."
                />

                <Feature3 />
            </div>

            <div className="section-container mt-20">
                <ContentHeader
                    // title={currentLocale === 'kh' ? libraryTypeHeader?.name_kh || libraryTypeHeader?.name : libraryTypeHeader?.name}
                    // description={
                    //     currentLocale === 'kh'
                    //         ? libraryTypeHeader?.short_description_kh || libraryTypeHeader?.short_description
                    //         : libraryTypeHeader?.short_description
                    // }
                    title="Publications by Categories"
                    description="Browse all publications, organized by category."
                />

                <Feature3Copy />
            </div>

            {/* Libraries Statistics */}
            <div className="section-container mt-40">
                <ContentHeader
                    // title={currentLocale === 'kh' ? claStatisticHeader?.name_kh || claStatisticHeader?.name : claStatisticHeader?.name}
                    // description={
                    //     currentLocale === 'kh'
                    //         ? claStatisticHeader?.short_description_kh || claStatisticHeader?.short_description
                    //         : claStatisticHeader?.short_description
                    // }
                    title="Library Overview"
                    description="A quick look at how our library is being used — from online reads to in-person visits."
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
                    <SpaceAnimateButton title={t('See All E-Resources')} />
                </Link>
            </div>
        </ELibraryLayout>
    );
};

export default Index;
