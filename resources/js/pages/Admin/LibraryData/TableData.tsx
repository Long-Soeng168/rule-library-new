import TableCellAvatar from '@/components/Avatar/TableCellAvatar';
import StatusBadge from '@/components/Badge/StatusBadge';
import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import RecoverItem from '@/components/Button/RecoverItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { User } from 'lucide-react';

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
                            <TableHeadWithSort label="Logo" />
                            <TableHeadWithSort field="name_of_library" label="Name of library" />
                            <TableHeadWithSort field="affiliated_institution" label="Affiliated institution" />
                            <TableHeadWithSort field="status" label="Status" />
                            <TableHeadWithSort label="Library Manager" />
                            <TableHeadWithSort field="created_at" label="Created at" />
                            <TableHeadWithSort field="created_by" label="Created by" />
                            <TableHeadWithSort field="updated_at" label="Updated at" />
                            <TableHeadWithSort field="updated_by" label="Updated by" />
                        </TableRow>
                    </TableHeader>
                    <TableBody className="table-body rounded-md">
                        {tableData?.data?.map((item: any, index: number) => (
                            <TableRow className="table-row" key={item.id}>
                                <TableCellText value={item.id} />
                                <TableCellActions>
                                    {item.deleted_at ? (
                                        <RecoverItem
                                            deleted_at={item.deleted_at}
                                            recoverPath={`/admin/library-data/${item.id}/recover`}
                                            permission="user update"
                                        />
                                    ) : (
                                        <>
                                            {/* Edit Dialog */}
                                            <EditItemButton url={`/admin/library-data/${item.id}/edit`} permission="library_data update" />

                                            {/* View Dialog */}
                                            <ViewItemButton url={`/admin/library-data/${item.id}`} permission="library_data view" />

                                            {/* Delete Item */}
                                            <DeleteItemButton deletePath="/admin/library-data/" id={item.id} permission="library_data delete" />
                                        </>
                                    )}
                                </TableCellActions>
                                <TableCell>
                                    <TableCellAvatar
                                        className="rounded-none border-none object-contain"
                                        alt={item.name_of_library}
                                        image={`/assets/images/library_data/thumb/${item.logo}`}
                                    />
                                </TableCell>
                                <TableCellText value={item.name_of_library} />
                                <TableCellText value={item.affiliated_institution} />
                                <TableCell>
                                    <StatusBadge label={item.status} type={item.status} />
                                </TableCell>
                                <TableCell>
                                    <Link href={`/admin/users/${item.user_id}`}>
                                        <Badge variant="outline" className="cursor-pointer rounded duration-300 hover:underline">
                                            <User />
                                            {item.user_owner?.name}
                                        </Badge>
                                    </Link>
                                </TableCell>
                                <TableCellDate value={item.created_at} />
                                <TableCellText value={item.created_user?.name} />
                                <TableCellDate value={item.updated_at} />
                                <TableCellText value={item.updated_user?.name} />
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
