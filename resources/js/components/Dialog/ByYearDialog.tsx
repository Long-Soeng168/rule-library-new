import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';

export default function ByYearDialog() {
    const [startYear, setStartYear] = React.useState('');
    const [endYear, setEndYear] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Selected years:', { startYear, endYear });
        // do something with the years here (API call, filter, etc.)
    };

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="h-11 rounded-md bg-muted text-foreground hover:bg-primary hover:text-white">
                        Select Year
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Filter by Year</DialogTitle>
                        <DialogDescription>Specify the start and end year to filter resources.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-1">
                            <Label htmlFor="start-year">From Year</Label>
                            <Input
                                id="start-year"
                                type="number"
                                min={2000}
                                max={new Date().getFullYear()}
                                placeholder="e.g., 2010"
                                value={startYear}
                                onChange={(e) => setStartYear(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="end-year">To Year</Label>
                            <Input
                                id="end-year"
                                type="number"
                                min={2000}
                                max={new Date().getFullYear()}
                                placeholder="e.g., 2023"
                                value={endYear}
                                onChange={(e) => setEndYear(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Apply</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
