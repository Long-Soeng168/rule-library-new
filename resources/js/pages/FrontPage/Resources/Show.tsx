import ResourceDetail from '@/components/Section/ResourceDetail';
import ScrollCardSection from '@/components/Section/ScrollCardSection';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import useTranslation from '@/hooks/use-translation';
import FrontPageLayout from '@/layouts/FrontPageLayout';
import { usePage } from '@inertiajs/react';

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
