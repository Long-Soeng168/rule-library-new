import TableCellAvatar from '@/components/Avatar/TableCellAvatar';
import DeleteItemButton from '@/components/Button/DeleteItemButton';
import RecoverItem from '@/components/Button/RecoverItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';

const TableData = () => {
    const { tableData } = usePage<any>().props;

    return (
        <>
            <div className="table-data-container">
                <Table>
                    <TableHeader className="table-header">
                        <TableRow>
                            <TableHeadWithSort field="id" label="ID" />
                            <TableHeadWithSort label="Action" />
                            <TableHeadWithSort label="User" />
                            <TableHeadWithSort label="Item / Barcode" />
                            <TableHeadWithSort field="borrowed_at" label="Timeline (Out/Due/In)" />
                            <TableHeadWithSort field="fine_amount" label="Fine" />
                            <TableHeadWithSort field="created_at" label="Issued by" />
                        </TableRow>
                    </TableHeader>
                    <TableBody className="table-body rounded-md">
                        {tableData?.data?.map((item: any) => (
                            <TableRow className="table-row" key={item.id}>
                                {/* 1. ID */}
                                <TableCellText value={item.id} />

                                {/* 2. Action */}
                                <TableCellActions>
                                    {item.deleted_at ? (
                                        <RecoverItem
                                            deleted_at={item.deleted_at}
                                            recoverPath={`/admin/circulations/${item.id}/recover`}
                                            permission="circulation update"
                                        />
                                    ) : (
                                        <>
                                            {/* <ViewItemButton url={`/admin/circulations/${item.id}`} permission="circulation view" /> */}
                                            <DeleteItemButton deletePath="/admin/circulations/" id={item.id} permission="circulation delete" />
                                        </>
                                    )}
                                </TableCellActions>

                                {/* 3. User */}
                                <TableCell className="min-w-[180px]">
                                    <Link href={`/admin/users/${item.borrower?.id}`} className="group flex items-center gap-3">
                                        <TableCellAvatar alt={item.borrower?.name} image={`/assets/images/users/thumb/${item.borrower?.image}`} />
                                        <div className="flex flex-col">
                                            <span className="line-clamp-1 text-xs leading-tight font-medium text-foreground group-hover:underline">
                                                {item.borrower?.name || 'Unknown User'}
                                            </span>
                                            <span className="mt-0.5 shrink-0 text-xs font-semibold whitespace-nowrap text-muted-foreground">
                                                Card: {item.borrower?.card_number ?? '---'}
                                            </span>
                                        </div>
                                    </Link>
                                </TableCell>

                                {/* 4. Item / Barcode */}
                                <TableCell className="min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="line-clamp-1 text-sm font-medium text-foreground">
                                            {item.item_physical_copy?.item?.name || 'No Title Associated'}
                                        </span>
                                        <div className="mt-0.5 flex items-center gap-2">
                                            <span className="rounded bg-primary/10 px-1 font-mono text-[10px] font-medium text-primary">
                                                Bardcode: {item.item_physical_copy?.barcode}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* 5. Timeline (Out, Due, In) */}
                                <TableCell className="whitespace-nowrap">
                                    {(() => {
                                        const isPastDue = item.due_at && new Date(item.due_at) < new Date();
                                        const isOverdueAndOut = !item.returned_at && isPastDue;
                                        const isLateAndUnpaid =
                                            item.returned_at && new Date(item.returned_at) > new Date(item.due_at) && !item.fine_paid;

                                        const showWarning = isOverdueAndOut || isLateAndUnpaid;

                                        return (
                                            <div className="flex w-fit flex-col font-mono text-[10px] leading-tight tracking-tighter uppercase">
                                                {/* Borrowed At */}
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 text-muted-foreground/60">OUT</span>
                                                    <span className="text-foreground">{item.borrowed_at}</span>
                                                    <ArrowUpRight className="size-3 text-blue-500/40" />
                                                </div>

                                                <div className="my-0.5 mr-[5px] h-1.5 w-px self-end bg-border" />

                                                {/* Due At */}
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={cn(
                                                            'w-6 text-muted-foreground/40',
                                                            showWarning ? 'font-medium text-destructive' : 'text-muted-foreground/40',
                                                        )}
                                                    >
                                                        DUE
                                                    </span>
                                                    <span
                                                        className={cn('font-medium', showWarning ? 'text-destructive' : 'text-muted-foreground/80')}
                                                    >
                                                        {item.due_at}
                                                    </span>
                                                    <div className="flex size-3 items-center justify-center">
                                                        <Clock
                                                            className={cn('size-2.5', showWarning ? 'text-destructive' : 'text-muted-foreground/40')}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="my-0.5 mr-[5px] h-1.5 w-px self-end bg-border" />

                                                {/* Returned At */}
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 text-muted-foreground/60">IN</span>
                                                    <span
                                                        className={cn(
                                                            'font-medium',
                                                            item.returned_at
                                                                ? 'text-green-600'
                                                                : showWarning
                                                                  ? 'text-destructive'
                                                                  : 'animate-pulse text-orange-500',
                                                        )}
                                                    >
                                                        {item.returned_at ?? (showWarning ? 'On Loan (Overdue)' : 'On Loan')}
                                                    </span>
                                                    <ArrowDownLeft
                                                        className={cn(
                                                            'size-3',
                                                            item.returned_at
                                                                ? 'text-green-500/40'
                                                                : showWarning
                                                                  ? 'text-destructive'
                                                                  : 'text-orange-500',
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </TableCell>

                                {/* 6. Fine (Amount & Status) */}
                                <TableCell>
                                    <div className="flex flex-col items-start leading-none">
                                        <span
                                            className={cn(
                                                'font-mono text-sm font-medium',
                                                parseFloat(item.fine_amount) > 0
                                                    ? item.fine_paid
                                                        ? 'text-green-600'
                                                        : 'text-destructive'
                                                    : 'text-muted-foreground/30',
                                            )}
                                        >
                                            {parseFloat(item.fine_amount) > 0 ? `$${item.fine_amount}` : '—'}
                                        </span>
                                        {parseFloat(item.fine_amount) > 0 && (
                                            <span
                                                className={cn(
                                                    'mt-1 rounded-sm px-1 py-0.5 text-[9px] font-medium tracking-tighter uppercase',
                                                    item.fine_paid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
                                                )}
                                            >
                                                {item.fine_paid ? 'Paid' : 'Unpaid'}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>

                                {/* 7. Issued by */}
                                <TableCell>
                                    <span className="flex flex-col gap-0.5 text-[11px] leading-tight whitespace-nowrap text-muted-foreground">
                                        <p className="font-semibold text-foreground/80">{item.created_user?.name || 'System'}</p>
                                        <TableCellDate className="p-0" value={item.created_at} />
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {tableData?.data?.length < 1 && <NoDataDisplay />}
        </>
    );
};

export default TableData;
