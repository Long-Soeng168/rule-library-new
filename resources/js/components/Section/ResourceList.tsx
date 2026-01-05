import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import BookCardHoverGradient from '../Card/BookCardHoverGradient';

const ResourceList = ({ className }: { className?: string }) => {
    const { tableData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    return (
        <>
            <div className={cn(`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4`, className)}>
                {tableData?.data?.map((item: any) => (
                    <BookCardHoverGradient
                        key={item?.id}
                        title={item.name}
                        subTitle={item.short_description}
                        image_url="/assets/sample_images/books/thesis1.jpg"
                    />
                ))}
            </div>
        </>
    );
};

export default ResourceList;
