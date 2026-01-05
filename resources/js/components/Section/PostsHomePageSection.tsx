import { PostCard } from '@/components/Card/PostCard';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { samplePosts } from '@/data/post-sample-data';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import HoverButton from '../Button/HoverButton';
import { ContentHeader } from '../Header/ContentHeader';
import { PlaceholderPattern } from '../ui/placeholder-pattern';

const formatDate = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// --- SAMPLE DATA ---

const postCategories = ['All Posts', 'Library News', 'Events & Workshops', 'Library Knowledge', 'User Manual'];

const tagCounts = { UI: 2, React: 1, Design: 3 };

const PostsHomePageSection = () => {
    const [selectedTag, setSelectedTag] = useState<string | null>('All Posts');
    const filteredBlogs = samplePosts; // for now, no filtering
    const allTags = postCategories;

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="mt-4">
            <div className="section-container">
                <ContentHeader
                    // title={currentLocale === 'kh' ? librariesHeader?.name_kh || librariesHeader?.name : librariesHeader?.name}
                    // description={
                    //     currentLocale === 'kh'
                    //         ? librariesHeader?.short_description_kh || librariesHeader?.short_description
                    //         : librariesHeader?.short_description
                    // }
                    link="/posts"
                    title="Latest Posts"
                />
            </div>
            {/* Post List */}
            <div className="section-container">
                <Carousel setApi={setApi} opts={{ align: 'start' }} className="w-full">
                    <div>
                        <CarouselContent className="ml-0">
                            {filteredBlogs.map((blog) => {
                                const date = new Date(blog.data.date);
                                const formattedDate = formatDate(date);

                                return (
                                    <CarouselItem key={blog.url} className="gap-0 overflow-hidden px-0 md:basis-1/2 lg:basis-1/3">
                                        <PostCard
                                            url={`/posts/1`}
                                            title={blog.data.title}
                                            description={blog.data.description}
                                            date={formattedDate}
                                            thumbnail={blog.data.thumbnail}
                                        />
                                    </CarouselItem>
                                );
                            })}
                            <CarouselItem key="SeeMore" className="gap-0 overflow-hidden border-b px-0 md:basis-1/2 lg:basis-1/4">
                                <div className="relative flex h-full items-center justify-center border-t border-r">
                                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                                    <Link href={`/posts`} prefetch>
                                        <HoverButton />
                                    </Link>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </div>

                    {/* Navigation arrows */}

                    <div className="mt-2 flex items-center justify-between">
                        {/* Dots navigation */}
                        <div className="mr-4 flex items-center justify-center gap-2">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={cn(
                                        'size-4 cursor-pointer rounded-full border-2 transition-colors',
                                        current === index ? 'border-primary bg-primary' : 'border-neutral-300',
                                    )}
                                />
                            ))}
                        </div>
                        <div className="space-x-2">
                            <CarouselPrevious className="static top-0 left-4 z-10 h-10 w-10 translate-y-0 transform rounded-none border border-neutral-300 bg-background/50 shadow-none backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-background hover:shadow-lg" />
                            <CarouselNext className="static top-0 right-4 z-10 h-10 w-10 translate-y-0 transform rounded-none border border-neutral-300 bg-background/50 shadow-none backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-background hover:shadow-lg" />
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default PostsHomePageSection;
