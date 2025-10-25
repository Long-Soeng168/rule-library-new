import LibraryCardHoverGradient from '@/components/Card/LibraryCardHoverGradient';
import NoDataDisplay from '@/components/NoDataDisplay';
import { usePage } from '@inertiajs/react';

const TableData = () => {
    const { tableData } = usePage<any>().props;

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tableData?.data?.map((item: any) => (
                    <LibraryCardHoverGradient key={item.id} item={item} />
                ))}
            </div>
            <div>{tableData?.data?.length < 1 && <NoDataDisplay />}</div>
        </>
    );
};

export default TableData;
