import SpaceAnimateButton from '@/components/Button/SpaceAnimateButton';
import LibrarySearch from '@/components/Search/LibrarySearch';
import ResourceMainCategory from '@/components/Section/ResourceMainCategory';
import ScrollCardSection from '@/components/Section/ScrollCardSection';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import FrontPageLayout from '@/layouts/FrontPageLayout';
import { Link } from '@inertiajs/react';

const Index = () => {
    return (
        <FrontPageLayout>
            <section className="mb-20">
                <div className="section-container my-4">
                    {/* <ResourceBreadcrumb /> */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">E-Resources</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="section-container">
                    <LibrarySearch />
                </div>
                <div>
                    <ResourceMainCategory />
                </div>

                {/* Theses */}
                <ScrollCardSection containerClassName='mt-8' title="Theses" />
                <ScrollCardSection containerClassName='mt-16' title="Publications" />
                <ScrollCardSection containerClassName='mt-16' title="Journals" />
            </section>
        </FrontPageLayout>
    );
};

export default Index;
