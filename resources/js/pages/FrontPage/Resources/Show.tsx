import ResourceDetail from '@/components/Section/ResourceDetail';
import ScrollCardSection from '@/components/Section/ScrollCardSection';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import useTranslation from '@/hooks/use-translation';
import FrontPageLayout from '@/layouts/FrontPageLayout';
import { usePage } from '@inertiajs/react';

export const data: any[] = [
    {
        name: 'Royal University of Law and Economics Library',
        subtitle: 'Preserves Cambodia’s literary heritage',
        sourceOfFunding: 'NGO',
        type: 'High School Library',
        image_url: '/assets/sample_images/books/thesis1.jpg',
    },
    {
        name: 'Phnom Penh University Library',
        subtitle: 'Academic resources for higher education',
        image_url: '/assets/sample_images/books/thesis1.jpg',
    },
    {
        name: 'Siem Reap Public Library',
        subtitle: 'Community learning hub',
        image_url: '/assets/sample_images/books/thesis1.jpg',
    },
    {
        name: 'Battambang Provincial Library',
        subtitle: 'Educational resources for students',
        image_url: '/assets/sample_images/books/thesis1.jpg',
    },
    {
        name: 'Kampot Community Library',
        subtitle: 'Local books and resources',
        image_url: '/assets/sample_images/books/thesis1.jpg',
    },
    {
        name: 'Takeo High School Library',
        subtitle: 'Supporting school education',
        image_url: '/assets/sample_images/books/thesis1.jpg',
    },
];
 

const Show = () => {
    const { mainCategory, showData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    return (
        <FrontPageLayout>
            <section className="section-container">
                <div className="my-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">{t('Home')}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/resources">{t('E-Resources')}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/resources/${mainCategory?.code}`}>
                                    {currentLocale == 'kh' ? (mainCategory.name_kh ?? mainCategory.name) : mainCategory.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            {showData?.category?.parent && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/resources/${mainCategory?.code}?category_code=${showData?.category?.parent?.code}`}>
                                            {currentLocale == 'kh'
                                                ? (showData?.category?.parent.name_kh ?? showData?.category?.parent.name)
                                                : showData?.category?.parent.name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </>
                            )}
                            {showData?.category && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/resources/${mainCategory?.code}?category_code=${showData?.category?.code}`}>
                                            {currentLocale == 'kh'
                                                ? (showData?.category?.name_kh ?? showData?.category?.name)
                                                : showData?.category?.name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </>
                            )}

                            {showData?.id && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            href={`/resources/${mainCategory?.code}/${showData?.id}`}
                                            className="line-clamp-1 max-w-[30ch] text-foreground lg:max-w-[60ch]"
                                        >
                                            {currentLocale == 'kh' ? (showData?.name_kh ?? showData?.name) : showData?.name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div>
                    <ResourceDetail />
                </div>
            </section>
            <section className="mt-20 mb-20">
                <ScrollCardSection containerClassName="mt-8" />
            </section>
        </FrontPageLayout>
    );
};

export default Show;
