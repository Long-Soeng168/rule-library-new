import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import HoverButton from '../Button/HoverButton';
import BookCardHoverGradient from '../Card/BookCardHoverGradient';
import { ContentHeader } from '../Header/ContentHeader';
import { PlaceholderPattern } from '../ui/placeholder-pattern';

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
    {
        name: 'Kampot Community Library',
        subtitle: 'Local books and resources',
        image_url: '/assets/sample_images/books/thesis1.jpg',
    },
];

export default function ScrollCardSection({ title, containerClassName }: { title?: string; containerClassName?: string }) {
    return (
        <div className={cn('section-container', containerClassName)}>
            <div>
                <ContentHeader
                    // title={currentLocale === 'kh' ? libraryTypeHeader?.name_kh || libraryTypeHeader?.name : libraryTypeHeader?.name}
                    // description={
                    //     currentLocale === 'kh'
                    //         ? libraryTypeHeader?.short_description_kh || libraryTypeHeader?.short_description
                    //         : libraryTypeHeader?.short_description
                    // }
                    link={`/resources/theses`}
                    title={title || ''}
                />
            </div>
            <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5')}>
                {data.map((item, index) => (
                    <BookCardHoverGradient key={index} title={item.name} subTitle={item.subtitle} image_url={item.image_url} />
                ))}
                <div className="relative z-10 flex h-full min-h-40 w-full items-center justify-center overflow-hidden rounded-md border-2 border-background pl-6 shadow dark:border-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                    <Link href={`/posts`} prefetch>
                        <HoverButton />
                    </Link>
                </div>
            </div>
            {/* <div className="mt-4 flex w-full justify-end">
                <Link href={`/libraries`}>
                    <HoverButton />
                </Link>
            </div> */}
        </div>
    );
}
