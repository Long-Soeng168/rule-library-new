import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import HoverButton from '../Button/HoverButton';
import BookCardHoverGradient from '../Card/BookCardHoverGradient';

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
    {
        name: 'Takeo High School Library',
        subtitle: 'Supporting school education',
        image_url: '/assets/sample_images/books/thesis1.jpg',
    },
];

export default function ScrollCardSection({ title }: { title?: string }) {
    return (
        <div className="section-container mt-20">
            <div>
                <div className="mb-4 text-start">
                    <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
                    <p className="mt-2 text-gray-500">
                        Access a diverse collection of academic theses from the Royal University of Law and Economics.
                    </p>
                </div>
            </div>
            <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5')}>
                {data.map((item, index) => (
                    <BookCardHoverGradient key={index} title={item.name} subTitle={item.subtitle} image_url={item.image_url} />
                ))}
            </div>
            <div className="mt-4 flex w-full justify-end">
                <Link href={`/libraries`}>
                    <HoverButton />
                </Link>
            </div>
        </div>
    );
}
