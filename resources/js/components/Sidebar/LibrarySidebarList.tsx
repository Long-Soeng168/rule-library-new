import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import CheckboxOption from '../Checkbox/CheckboxOption';

export default function LibrarySidebarList({
    heading = 'All Lists',
    options,
    limit = 5,
    value,
    onChange,
}: {
    heading?: string;
    options: { value: string; label: string }[];
    limit?: number;
    value?: string; // current selected value
    onChange?: (val: string) => void; // callback for selection
}) {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [search, setSearch] = useState('');

    // get visible slice
    let visibleOptions = options.slice(0, limit);
    // if selected is not in visible slice, push it to front
    if (value) {
        const selectedOption = options.find((o) => o.value === value);
        if (selectedOption && !visibleOptions.some((o) => o.value === value)) {
            visibleOptions = [...visibleOptions, selectedOption];
        }
    }

    const filteredOptions = options.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));

    const handleSelect = (val: string) => {
        if (onChange) {
            // toggle logic: if already selected -> clear it, else set new
            onChange(value === val ? '' : val);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {visibleOptions.map((item) => (
                <CheckboxOption key={item.value} value={item.value} label={item.label} checkedValue={value} onChange={handleSelect} />
            ))}

            {options.length > limit && (
                <button
                    type="button"
                    onClick={() => setIsOpenDialog(true)}
                    className="group mb-2 flex items-center gap-1 text-left text-sm font-semibold text-primary underline underline-offset-4 transition-all duration-300 hover:translate-x-1"
                >
                    See More{' '}
                    <ArrowRight
                        className="translate-x-[-20px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        size={18}
                    />
                </button>
            )}

            <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                <DialogContent className="sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>{heading}</DialogTitle>
                    </DialogHeader>

                    {/* Search */}
                    <div className="relative mb-3">
                        <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full rounded-md border px-8 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>

                    {/* List */}
                    <div className="show-scrollbar max-h-[300px] overflow-y-auto pr-2">
                        {filteredOptions.map((item) => (
                            <CheckboxOption
                                key={item.value}
                                value={item.value}
                                label={item.label}
                                checked={value === item.value}
                                onChange={handleSelect}
                            />
                        ))}
                        {filteredOptions.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No results found</p>}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
