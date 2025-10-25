import { cn } from '@/lib/utils';
import BookCardHoverGradient from '../Card/BookCardHoverGradient';
import BookCardHoverGradientListLayout from '../Card/BookCardHoverGradientListLayout';

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
const ResourceList = ({ className, cardLayout = 'grid' }: { className?: string; cardLayout?: 'grid' | 'list' }) => {
    return (
        <>
            <div className={cn(`grid gap-4 ${cardLayout == 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-2'}`, className)}>
                {data.map((item, index) =>
                    cardLayout == 'list' ? (
                        <BookCardHoverGradientListLayout key={index} title={item.name} subTitle={item.subtitle} image_url={item.image_url} />
                    ) : (
                        <BookCardHoverGradient key={index} title={item.name} subTitle={item.subtitle} image_url={item.image_url} />
                    ),
                )}
            </div>
            {/* <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4', className)}>
                {data.map((item, index) => (
                    <BookCardHoverGradient key={index} title={item.name} subTitle={item.subtitle} image_url={item.image_url} />
                ))}
            </div> */}
        </>
    );
};

export default ResourceList;
