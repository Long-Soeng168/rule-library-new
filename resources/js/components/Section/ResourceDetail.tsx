import { Link } from '@inertiajs/react';
import DownloadButton from '../Button/DownloadButton';
import ReadButton from '../Button/ReadButton';
import BookImagesGallery from '../GalleryViewer/BookImagesGallery';

const ResourceDetail = ({ item }: { item: any }) => {
    return (
        <div className="flex flex-wrap gap-8">
            {/* Left Column: Title and Actions */}
            <div className="sm:max-w-xs md:max-w-sm">
                <div className="mb-2 flex items-center">
                    <BookImagesGallery images={['/assets/sample_images/books/thesis1.jpg']} />
                    {/* <img src="/assets/sample_images/books/thesis1.jpg" alt="University Logo" className="h-auto w-full border border-primary" /> */}
                </div>

                <div className="flex gap-2">
                    <Link href={`/view-pdf?file_name=file-sample_150kB.pdf&id=1&resource=items`} className="flex-1">
                        <DownloadButton />
                    </Link>
                    <Link href={`/view-pdf?file_name=file-sample_150kB.pdf&id=1&resource=items`} className="flex-1">
                        <ReadButton />
                    </Link>
                </div>
            </div>

            {/* Right Column: Details */}
            <div className="w-full flex-1 sm:w-auto">
                <div>
                    <h2 className="text-2xl font-medium">អភិបាលកិច្ចសាជីវកម្មក្នុងការបោះផ្សាយលក់មូលបត្រជាសាធារណៈរបស់ក្រុមហ៊ុន PPSEZ</h2>
                </div>
                <div className="mt-4 max-w-sm space-y-2">
                    {Object.entries(item.details).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-start gap-4 pb-1">
                            <span className="w-[100px] border-r">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <Link href={`/resources/theses`} className="hover:underline underline-offset-4 cursor-pointer hover:text-primary">{value}</Link>
                        </div>
                    ))}
                </div>
                <div className="mt-10">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="mt-2">{item.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail;
