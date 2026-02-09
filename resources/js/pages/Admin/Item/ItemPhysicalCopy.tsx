import NewItemButton from '@/components/Button/NewItemButton';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';

const ItemCopiesTable = ({ copies }: { copies: any[] }) => {
    // Helper to map DB status to UI colors
    const getStatusStyles = (status: any) => {
        const lowerStatus = status?.toLowerCase();
        switch (lowerStatus) {
            case 'available':
                return 'bg-green-50 text-green-700 border-green-200 ring-green-600';
            case 'checked_out':
                return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600';
            case 'damaged':
            case 'lost':
            case 'removed':
                return 'bg-red-50 text-red-700 border-red-200 ring-red-600';
            case 'not_for_loan':
                return 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-600';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200 ring-gray-600';
        }
    };

    return (
        <div className="w-full overflow-x-scroll rounded-md border border-border bg-background">
            <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
                <thead className="bg-muted/50 font-medium text-muted-foreground">
                    <tr className="border-b border-border">
                        <th className="px-4 py-3 font-semibold">Barcode</th>
                        <th className="px-4 py-3 font-semibold">Item Type</th>
                        <th className="px-4 py-3 font-semibold">Library (Home/Current)</th>
                        <th className="px-4 py-3 font-semibold">Shelving Location</th>
                        <th className="px-4 py-3 font-semibold">Call Number</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 text-right font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border text-foreground">
                    {copies.map((copy: any) => (
                        <tr key={copy.id || copy.barcode} className="transition-colors hover:bg-muted/30">
                            {/* Barcode */}
                            <td className="px-4 py-3">
                                <div className="font-bold tracking-tight text-foreground">{copy.barcode}</div>
                            </td>

                            {/* Item Type */}
                            <td className="px-4 py-3">
                                <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                                    {copy.item_type_code}
                                </span>
                            </td>

                            {/* Library (Home/Current) */}
                            <td className="px-4 py-3">
                                <div className="font-medium">{copy.current_library_code}</div>
                                {copy.home_library_code !== copy.current_library_code && (
                                    <div className="text-[10px] font-semibold text-orange-500 uppercase dark:text-orange-400">
                                        Home: {copy.home_library_code}
                                    </div>
                                )}
                            </td>

                            {/* Shelving Location */}
                            <td className="px-4 py-3 text-muted-foreground">{copy.shelf_location_code}</td>

                            {/* Call Number */}
                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{copy.full_call_number}</td>

                            {/* Dynamic Status */}
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase ${getStatusStyles(copy.status)}`}
                                >
                                    {copy.status?.replace('_', ' ')}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3 text-right">
                                <Link href={`/admin/items/{item_id}/physical-copies/1/edit`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-sm font-medium text-primary underline-offset-4 hover:underline"
                                    >
                                        <EditIcon className="size-5!" /> Edit
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Updated Example Usage matching your DB Schema
const ItemPhysicalCopy = () => {
    const sampleDataFromDb = [
        {
            id: 1,
            barcode: '000632',
            item_type_code: 'សៀវភៅ​អង់គ្លេស',
            home_library_code: 'CSHL Library',
            current_library_code: 'CSHL Library',
            shelf_location_code: 'MAIN-SHELF',
            full_call_number: '327 CAM-2017 CO.3/3',
            status: 'available',
        },
        {
            id: 2,
            barcode: '000631',
            item_type_code: 'សៀវភៅ​អង់គ្លេស',
            home_library_code: 'CSHL Library',
            current_library_code: 'BRANCH-A', // Borrowed at a different branch
            shelf_location_code: 'DISPLAY-01',
            full_call_number: '327 CAM-2017 CO.2/3',
            status: 'checked_out',
        },
        {
            id: 3,
            barcode: '000630',
            item_type_code: 'Reference',
            home_library_code: 'CSHL Library',
            current_library_code: 'CSHL Library',
            shelf_location_code: 'REF-ROOM',
            full_call_number: 'REF 001.42',
            status: 'not_for_loan', // Restricted status
        },
        {
            id: 4,
            barcode: '000629',
            item_type_code: 'សៀវភៅ​អង់គ្លេស',
            home_library_code: 'CSHL Library',
            current_library_code: 'CSHL Library',
            shelf_location_code: 'REPAIR-BIN',
            full_call_number: '327 CAM-2017 CO.4/4',
            status: 'damaged', // Requires maintenance
        },
        {
            id: 5,
            barcode: '000628',
            item_type_code: 'សៀវភៅ​អង់គ្លេស',
            home_library_code: 'CSHL Library',
            current_library_code: 'Unknown',
            shelf_location_code: 'N/A',
            full_call_number: '327 CAM-2017 CO.5/5',
            status: 'lost', // Item cannot be found
        },
        {
            id: 6,
            barcode: '000627',
            item_type_code: 'Legacy Collection',
            home_library_code: 'CSHL Library',
            current_library_code: 'Archive',
            shelf_location_code: 'STORAGE-B1',
            full_call_number: 'HIST-99',
            status: 'removed', // Withdrawn from collection
        },
    ];

    return (
        <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex w-full gap-2 md:w-auto">
                    <h2 className="text-xl font-bold text-gray-800">Physical Copies</h2>
                </div>
                <div className="flex w-full justify-end md:w-auto">
                    {/* Add New Dialog */}
                    <NewItemButton url="/admin/items/{item_id}/physical-copies/create" permission="item create" />
                </div>
            </div>

            <ItemCopiesTable copies={sampleDataFromDb} />
        </div>
    );
};

export default ItemPhysicalCopy;
