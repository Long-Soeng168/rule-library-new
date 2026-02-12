import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, formatToKhmerDateTime } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { ArrowDownCircle, ChevronRight, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const resolveStatus = (item: any) => {
    if (item.returned_at) return { label: 'Returned', variant: 'outline' as const, className: 'bg-gray-500/10 text-gray-500' };

    if (item.due_at) {
        const isOverdue = new Date(item.due_at) < new Date();
        return isOverdue
            ? { label: 'Overdue', variant: 'destructive' as const }
            : { label: 'On Loan', variant: 'default' as const, className: 'bg-blue-600' };
    }
    return { label: 'Available', variant: 'outline' as const, className: 'text-green-600 border-green-200 bg-green-50' };
};

const RecentCheckins = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Adjust the URL to match your route definition
            const response = await axios.get('/get-recent-checkins');
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch checkins:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="lg:col-span-8">
            <Card className="gap-0 py-0 shadow-none">
                <CardHeader className="border-b bg-muted/30 p-4">
                    <CardTitle className="flex items-center justify-between gap-2 text-lg font-semibold text-muted-foreground">
                        <span className="flex items-center gap-2 text-primary">
                            <ArrowDownCircle />
                            Recent Checkins
                        </span>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={fetchData} disabled={loading} className="h-8 w-8">
                                <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/circulations">
                                    See More <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/10">
                                <TableHead className="w-[150px]">Barcode</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Borrower</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && items.length === 0 ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i} className="animate-pulse">
                                        <TableCell>
                                            <div className="h-4 w-20 rounded bg-muted" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-48 rounded bg-muted" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-24 rounded bg-muted" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="ml-auto h-6 w-16 rounded bg-muted" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : items.length > 0 ? (
                                items.map((item) => {
                                    const status = resolveStatus(item);
                                    return (
                                        <TableRow key={item.id} className="group transition-colors hover:bg-muted/50">
                                            <TableCell className="font-mono font-bold text-primary">{item.barcode}</TableCell>
                                            <TableCell className="max-w-[200px] font-mono">
                                                <p className="line-clamp-2">{item.title}</p>
                                            </TableCell>
                                            <TableCell className="py-3">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="line-clamp-1 max-w-[200px] font-medium">{item.borrower_name}</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-muted-foreground">Card:</span>
                                                        <span>{item.borrower_card_number ?? '---'}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex flex-col items-end gap-1">
                                                    <Badge variant={status.variant} className={cn(status.className, 'rounded')}>
                                                        {status.label}
                                                    </Badge>
                                                    {item.returned_at && (
                                                        <span className="text-muted-foreground">
                                                            {formatToKhmerDateTime(item.returned_at, false)}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No recent activity found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default RecentCheckins;
