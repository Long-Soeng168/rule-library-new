import { PostCard } from '@/components/Card/PostCard';
import { TagFilter } from '@/components/tag-filter';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { samplePosts } from '@/data/post-sample-data';
import FrontPageLayout from '@/layouts/FrontPageLayout';
import { useState } from 'react';

const formatDate = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// --- SAMPLE DATA ---

const postCategories = ['All Posts', 'Library News', 'Events & Workshops', 'Library Knowledge', 'User Manual'];

const tagCounts = { UI: 2, React: 1, Design: 3 };

const Index = () => {
    const [selectedTag, setSelectedTag] = useState<string | null>('All Posts');
    const filteredBlogs = samplePosts; // for now, no filtering
    const allTags = postCategories;

    return (
        <FrontPageLayout>
            <div className="relative min-h-screen bg-background">
                {/* Background Grid */}
                <div className="absolute top-[5px] left-0 z-0 h-[100px] w-full mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
                    <FlickeringGrid className="absolute top-0 left-0 size-full" />
                </div>

                {/* Header Section */}
                <div className="relative z-10 flex min-h-[100px] flex-col justify-center gap-6 pt-10">
                    <div className="section-container mx-auto w-full">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-medium tracking-tighter md:text-5xl">Posts</h1>
                            <p className="text-sm text-muted-foreground md:text-base lg:text-lg">Latest posts and updates from RULE Library.</p>
                        </div>
                    </div>
                </div>
                {allTags.length > 0 && (
                    <div className="section-container z-20 mx-auto w-full py-6">
                        <TagFilter tags={allTags} selectedTag={selectedTag || ''} tagCounts={tagCounts} />
                    </div>
                )}

                {/* Blog List */}
                <div className="section-container">
                    <div
                        className={`relative grid grid-cols-1 overflow-hidden border-x border-border md:grid-cols-2 lg:grid-cols-3 ${
                            filteredBlogs.length < 4 ? 'border-b' : 'border-b-0'
                        }`}
                    >
                        {filteredBlogs.map((blog) => {
                            const date = new Date(blog.data.date);
                            const formattedDate = formatDate(date);

                            return (
                                <PostCard
                                    key={blog.url}
                                    url={`/posts/1`}
                                    title={blog.data.title}
                                    description={blog.data.description}
                                    date={formattedDate}
                                    thumbnail={blog.data.thumbnail}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
};

export default Index;
