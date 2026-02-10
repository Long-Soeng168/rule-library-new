import NewItemButton from '@/components/Button/NewItemButton';
import { Button } from '@/components/ui/button';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';

const ItemCopiesTable = ({ copies, showData }: { copies: any[]; showData: any }) => {
    const { currentLocale } = useTranslation();

    /**
     * Resolves the current status based on Koha flags and circulation dates
     */
    const resolveStatus = (copy: any) => {
        if (copy.withdrawn != 0) return { label: 'Withdrawn', label_kh: 'បានដកចេញ', color: 'gray' };
        if (copy.item_lost != 0) return { label: 'Lost', label_kh: 'បាត់បង់', color: 'red' };
        if (copy.damaged != 0) return { label: 'Damaged', label_kh: 'ខូចខាត', color: 'yellow' };
        if (copy.due_at) {
            const isOverdue = new Date(copy.due_at) < new Date();
            return isOverdue
                ? { label: 'Overdue', label_kh: 'ហួសកំណត់', color: 'pink' }
                : { label: 'On Loan', label_kh: 'បានខ្ចីចេញ', color: 'blue' };
        }
        if (copy.not_for_loan != 0) return { label: 'Not for Loan', label_kh: 'មិនសម្រាប់ខ្ចី', color: 'purple' };

        return { label: 'Available', label_kh: 'អាចប្រើប្រាស់បាន', color: 'green' };
    };

    const getStatusStyles = (color: string) => {
        switch (color) {
            case 'green':
                return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20';
            case 'blue':
                return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
            case 'pink':
                return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20';
            case 'red':
                return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
            case 'yellow':
                return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
            case 'purple':
                return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20';
        }
    };

    return (
        <div className="w-full overflow-x-auto bg-background">
            <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
                <thead className="bg-muted/50 font-medium text-muted-foreground">
                    <tr>
                        <th className="border px-4 py-3 font-bold">Actions</th>
                        <th className="border px-4 py-3 font-bold">Barcode</th>
                        <th className="border px-4 py-3 font-bold">Item Type</th>
                        <th className="border px-4 py-3 font-bold">Library</th>
                        <th className="border px-4 py-3 font-bold">Location</th>
                        <th className="border px-4 py-3 font-bold">Call Number</th>
                        <th className="border px-4 py-3 font-bold">Status</th>
                        <th className="border px-4 py-3 font-bold">Unpublic Note</th>
                        <th className="border px-4 py-3 font-bold">Public Note</th>
                    </tr>
                </thead>
                <tbody className="text-foreground">
                    {copies?.map((copy: any) => {
                        const status = resolveStatus(copy);
                        return (
                            <tr key={copy.id} className="transition-colors hover:bg-muted/30">
                                {/* Actions */}
                                <td className="border px-4 py-3">
                                    <Link href={`/admin/items/${showData?.id}/physical-copies/${copy.id}/edit`}>
                                        <Button variant="outline" size="sm" className="rounded">
                                            <EditIcon className="mr-1 size-3.5" /> Edit
                                        </Button>
                                    </Link>
                                </td>

                                {/* Barcode */}
                                <td className="border px-4 py-3">
                                    <div className="font-bold tracking-tight text-primary">{copy.barcode}</div>
                                    {/* <div className="text-[10px] text-muted-foreground">Inv: {copy.inventory_number || 'N/A'}</div> */}
                                </td>

                                {/* Item Type */}
                                <td className="border px-4 py-3">
                                    <span className="rounded border border-border bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground uppercase">
                                        {copy.item_type?.name ?? '---'}
                                    </span>
                                </td>

                                {/* Library Logic */}
                                <td className="border px-4 py-3">
                                    <div>{copy.current_library?.name ?? '---'}</div>
                                    {copy.home_library_code !== copy.current_library_code && (
                                        <div className="text-[9px] text-orange-600 uppercase">Home: {copy.home_library?.name ?? '---'}</div>
                                    )}
                                </td>

                                {/* Shelving Location */}
                                <td className="border px-4 py-3 text-muted-foreground">{copy.shelf_location_code ?? '---'}</td>

                                {/* Call Number */}
                                <td className="border px-4 py-3 font-mono">{copy.full_call_number ?? '---'}</td>

                                {/* Computed Status Badge */}
                                <td className="border px-4 py-3">
                                    <div className="flex flex-col gap-1">
                                        <span
                                            className={`inline-flex items-center self-start rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-tight uppercase ${getStatusStyles(status.color)}`}
                                        >
                                            {currentLocale === 'kh' ? status.label_kh : status.label}
                                        </span>
                                        {copy.due_at && (
                                            <span className="text-[9px] text-muted-foreground">
                                                Due: {new Date(copy.due_at).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="border px-4 py-3">
                                    <span className="line-clamp-3">{copy.unpublic_note ?? '---'}</span>
                                </td>
                                <td className="border px-4 py-3">
                                    <span className="line-clamp-3">{copy.public_note ?? '---'}</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const ItemPhysicalCopy = () => {
    const { showData } = usePage<any>().props;

    return (
        <div className="mt-4">
            <div className="mb-4 flex items-center justify-between pb-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Physical Copies ({showData?.physical_copies?.length || 0})</h2>
                <NewItemButton url={`/admin/items/${showData?.id}/physical-copies/create`} permission="item create" />
            </div>

            <ItemCopiesTable copies={showData?.physical_copies} showData={showData} />
        </div>
    );
};

export default ItemPhysicalCopy;
