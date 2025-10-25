import TableCellAvatar from '@/components/Avatar/TableCellAvatar';
import RoleBadge from '@/components/Badge/RoleBadge';
import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import RecoverItem from '@/components/Button/RecoverItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { usePage } from '@inertiajs/react';

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
                            <TableHeadWithSort label="Image" />
                            <TableHeadWithSort field="name" label="Name" />
                            <TableHeadWithSort label="Roles" />
                            <TableHeadWithSort field="email" label="Email" />
                            <TableHeadWithSort field="phone" label="Phone" />
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
                                            recoverPath={`/admin/users/${item.id}/recover`}
                                            permission="user update"
                                        />
                                    ) : (
                                        <>
                                            {/* Edit Dialog */}
                                            <EditItemButton url={`/admin/users/${item.id}/edit`} permission="user update" />

                                            {/* View Dialog */}
                                            <ViewItemButton url={`/admin/users/${item.id}`} permission="user view" />

                                            {/* Delete Item */}
                                            {!item.roles.some((role: { name: string }) => role.name === 'Super Admin') && (
                                                <DeleteItemButton deletePath="/admin/users/" id={item.id} permission="user delete" />
                                            )}
                                        </>
                                    )}
                                </TableCellActions>
                                <TableCell>
                                    <TableCellAvatar alt={item.name} image={`/assets/images/users/thumb/${item.image}`} />
                                </TableCell>
                                <TableCellText value={item.name} />
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {item.roles?.length > 0 && item.roles?.map((item: any) => <RoleBadge key={item.id} title={item.name} />)}
                                    </div>
                                </TableCell>
                                <TableCellText value={item.email} />
                                <TableCellText value={item.phone} />
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
