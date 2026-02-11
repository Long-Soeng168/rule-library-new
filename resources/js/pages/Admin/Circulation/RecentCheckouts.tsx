import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const resolveStatus = (item: any) => {
    if (item.withdrawn) return { label: 'Withdrawn', variant: 'secondary' as const };
    if (item.item_lost) return { label: 'Lost', variant: 'destructive' as const };
    if (item.damaged) return { label: 'Damaged', variant: 'outline' as const, className: 'text-amber-500 border-amber-200 bg-amber-50' };
    if (item.due_at) {
        const isOverdue = new Date(item.due_at) < new Date();
        return isOverdue
            ? { label: 'Overdue', variant: 'destructive' as const }
            : { label: 'On Loan', variant: 'default' as const, className: 'bg-blue-600' };
    }
    return { label: 'Available', variant: 'outline' as const, className: 'text-green-600 border-green-200 bg-green-50' };
};
const RecentCheckouts = () => {
    const [items, setItems] = useState([
        { id: 1, barcode: '1001', title: 'The Great Gatsby', due_at: null, borrower_id: null, damaged: 0, item_lost: 0, withdrawn: 0 },
        { id: 2, barcode: '1002', title: 'Clean Code', due_at: '2026-02-01', borrower_id: 101, damaged: 0, item_lost: 0, withdrawn: 0 },
        { id: 3, barcode: '1003', title: 'Laravel Design Patterns', due_at: null, borrower_id: null, damaged: 0, item_lost: 0, withdrawn: 0 },
    ]);

    return (
        <div className="lg:col-span-8">
            <Card className="shadow-none">
                <CardHeader className="border-b bg-muted/30 pb-4">
                    <CardTitle className="flex items-center justify-between gap-2 text-sm font-bold tracking-widest text-muted-foreground uppercase">
                        Recent Checkouts
                        <Button variant="outline">
                            See More <ChevronRight />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/10">
                            <TableHead className="w-[120px]">Barcode</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Borrower</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => {
                            const status = resolveStatus(item);
                            return (
                                <TableRow key={item.id} className="group">
                                    <TableCell className="font-mono font-bold text-primary">{item.barcode}</TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>
                                        <span className="text-muted-foreground">—</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={status.variant} className={status.className}>
                                            {status.label}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default RecentCheckouts;
