import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Link } from '@inertiajs/react';
import HoverButton from '../Button/HoverButton';
import HoverButton2 from '../Button/HoverButton2';
import BooksCarousel from '../Carousel/BooksCarousel';

export interface Artwork {
    artist: string;
    art: string;
}

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
];

export function BookScrollAreaHorizontal() {
    return (
        <>
            <div className="lg:hidden">
                <div className="overflow-x-visible">
                    <ScrollArea className="w-full overflow-x-visible rounded-md whitespace-nowrap">
                        <div className="section-container flex h-full w-full justify-start space-x-4 overflow-x-visible pb-4">
                            {data.map((artwork) => (
                                <Link href={`/resources/theses/1`}>
                                    <div key={artwork.artist} className="aspect-7/10 w-[265px] shrink-0">
                                        <div className="overflow-hidden rounded-md border duration-300 hover:border-primary">
                                            <img src={artwork.image_url} alt={`Image of ${artwork.name}`} className="h-full w-full object-cover" />
                                        </div>
                                        <p className="line-clamp-3 w-full pt-2 text-base whitespace-pre-wrap text-foreground">
                                            អភិបាលកិច្ចសាជីវកម្មក្នុងការបោះផ្សាយ លក់មូលបត្រជាសាធារណៈរបស់ក្រុមហ៊ុន PPSEZ
                                        </p>
                                    </div>
                                </Link>
                            ))}
                            <div className="flex aspect-7/10 w-[222px] shrink-0 items-center justify-center">
                                <HoverButton2 />
                            </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <div className="mt-2 flex w-full justify-end pr-4">
                        <Link href={`/resources`}>
                            <HoverButton />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="overflow-x-hidden max-lg:hidden">
                <BooksCarousel />
            </div>
        </>
    );
}
