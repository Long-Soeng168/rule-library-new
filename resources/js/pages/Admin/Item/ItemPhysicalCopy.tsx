import DeleteItemButton from '@/components/Button/DeleteItemButton';
import NewItemButton from '@/components/Button/NewItemButton';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellBadge from '@/components/Table/TableCellBadge';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';

const ItemCopiesTable = ({ copies, showData }: { copies: any[]; showData: any }) => {
    const { t, currentLocale } = useTranslation();

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
                : { label: 'On Loan', label_kh: 'បានខ្ចីចេញ', color: 'primary' };
        }
        if (copy.not_for_loan != 0) return { label: 'Not for Loan', label_kh: 'មិនសម្រាប់ខ្ចី', color: 'purple' };

        return { label: 'Available', label_kh: 'មាននៅបណ្ណាល័យ', color: 'green' };
    };

    const getStatusStyles = (color: string) => {
        switch (color) {
            case 'primary':
                return 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30';
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
            <Table>
                <TableHeader className="table-header">
                    <TableRow>
                        <TableHeadWithSort label="Actions" />
                        <TableHeadWithSort label="Barcode" />
                        <TableHeadWithSort label="Item Type" />
                        <TableHeadWithSort label="Library" />
                        <TableHeadWithSort label="Location" />
                        <TableHeadWithSort label="Call Number" />
                        <TableHeadWithSort label="Status" />
                        <TableHeadWithSort label="Unpublic Note" />
                        <TableHeadWithSort label="Public Note" />
                    </TableRow>
                </TableHeader>
                <TableBody className="table-body rounded-md">
                    {copies?.map((item: any) => {
                        const status = resolveStatus(item);

                        return (
                            <TableRow className="table-row" key={item.id}>
                                {/* 1. Actions (Front) */}
                                <TableCellActions>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/items/${showData?.id}/physical-copies/${item.id}/edit`}>
                                            <Button variant="outline" size="sm" className="h-8 rounded">
                                                <EditIcon className="mr-1 size-3.5" /> {t('Edit')}
                                            </Button>
                                        </Link>
                                        <DeleteItemButton
                                            deletePath={`/admin/items/${showData?.id}/physical-copies/`}
                                            id={item.barcode}
                                            permission="item delete"
                                        />
                                    </div>
                                </TableCellActions>

                                {/* 2. Barcode */}
                                <TableCellText value={item.barcode} className="font-bold text-primary" />

                                {/* 3. Item Type */}
                                <TableCellText value={item.item_type?.name ?? '---'} />

                                {/* 4. Library (Custom Layout) */}
                                <TableCellActions>
                                    <div className="text-sm font-medium">{item.current_library?.name ?? '---'}</div>
                                    {item.home_library_code !== item.current_library_code && (
                                        <div className="text-[9px] font-bold text-orange-600 uppercase dark:text-orange-400">
                                            Home: {item.home_library?.name ?? '---'}
                                        </div>
                                    )}
                                </TableCellActions>

                                {/* 5. Location */}
                                <TableCellText value={item.shelf_location_code ?? '---'} />

                                {/* 6. Call Number */}
                                <TableCellText value={item.full_call_number ?? '---'} className="font-mono text-xs" />

                                {/* 7. Computed Status Badge */}
                                <TableCellActions tableCellClassName="px-0">
                                    <div className="flex flex-col gap-1">
                                        <TableCellBadge
                                            value={currentLocale === 'kh' ? status.label_kh : status.label}
                                            className={`uppercase ${getStatusStyles(status.color)}`}
                                        />
                                        {item.due_at && (
                                            <span className="text-[9px] font-semibold text-muted-foreground">
                                                {t('Due')}: {new Date(item.due_at).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </TableCellActions>

                                {/* 8. Notes (Staff) */}
                                <TableCellText value={item.unpublic_note || '---'} className="line-clamp-2 max-w-[150px] text-xs" />

                                {/* 9. Notes (Public) */}
                                <TableCellText value={item.public_note || '---'} className="line-clamp-2 max-w-[150px] text-xs" />
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

const ItemPhysicalCopy = () => {
    const { showData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    return (
        <div className="mt-4">
            <div className="mb-4 flex items-center justify-between pb-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {t('Physical Copies')} ({showData?.physical_copies?.length || 0})
                </h2>
                <NewItemButton url={`/admin/items/${showData?.id}/physical-copies/create`} permission="item create" />
            </div>

            <ItemCopiesTable copies={showData?.physical_copies} showData={showData} />
        </div>
    );
};

export default ItemPhysicalCopy;
