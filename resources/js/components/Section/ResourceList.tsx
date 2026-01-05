import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import BookCardHoverGradient from '../Card/BookCardHoverGradient';
import NoDataDisplay from '../NoDataDisplay';
import PaginationTabs from '../Pagination/PaginationTabs';

const ResourceList = ({ className }: { className?: string }) => {
    const { mainCategory, tableData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    return (
        <>
            {tableData?.total == 0 && (
                <div className="w-full pt-10">
                    <NoDataDisplay />
                </div>
            )}
            <div className={cn(`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4`, className)}>
                {tableData?.data?.map((item: any) => (
                    <Link href={`/resources/${mainCategory?.code}/${item?.id}`}>
                        <BookCardHoverGradient
                            key={item?.id}
                            title={currentLocale == 'kh' ? (item.name_kh ?? item.name) : item.name}
                            subTitle={currentLocale == 'kh' ? (item.short_description_kh ?? item.short_description) : item.short_description}
                            image_url={`/assets/images/items/thumb/${item.thumbnail}`}
                        />
                    </Link>
                ))}
            </div>
            <PaginationTabs containerClassName="mx-0 px-0" />
        </>
    );
};

export default ResourceList;
