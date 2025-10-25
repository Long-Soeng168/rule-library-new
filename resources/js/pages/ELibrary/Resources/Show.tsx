import HoverButton from '@/components/Button/HoverButton';
import ResourceDetail from '@/components/Section/ResourceDetail';
import ResourceList from '@/components/Section/ResourceList';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ELibraryLayout from '@/layouts/ELibraryLayout';

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

const thesisData = {
    title: 'Your Thesis Title Here',
    student: 'John Doe',
    supervisor: 'Jane Smith',
    details: {
        by: 'ថៅ គឹមរ៉ុង - ចន សុធា',
        advisor: 'ស សុភាព',
        category: 'ធនាគារ និងហិរញ្ញវត្ថុ',
        language: 'English',
        year: 2023,
        pages: 120,
    },
    description: 'A detailed study on the use of AI in web development.',
};

const Show = () => {
    return (
        <ELibraryLayout>
            <section className="section-container mb-40">
                <div className="my-4">
                    {/* <ResourceBreadcrumb /> */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/resources" className="">
                                    Resources
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/resources/theses" className="">
                                    Theses
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/resources/theses" className="">
                                    ធនាគារ និងហិរញ្ញវត្ថុ
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="text-foreground">
                                    អភិបាលកិច្ចសាជីវកម្មក្នុងការបោះផ្សាយលក់មូលបត្រជាសាធារណៈរបស់ក្រុមហ៊ុន PPSEZ
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div>
                    <ResourceDetail item={thesisData} />
                </div>
                <div className="mt-20">
                    <h2 className="mb-4 text-xl font-bold tracking-tight md:text-2xl">Related</h2>
                    <ResourceList />
                    <div className="mt-4 flex w-full justify-end">
                        <HoverButton />
                    </div>
                </div>
            </section>
        </ELibraryLayout>
    );
};

export default Show;
