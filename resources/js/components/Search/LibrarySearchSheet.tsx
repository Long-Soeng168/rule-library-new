import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SearchIcon } from 'lucide-react';
import { TooltipButton } from '../Button/TooltipButton';
import { Button } from '../ui/button';
import LibrarySearch from './LibrarySearch';
const LibrarySearchSheet = () => {
    return (
        <div>
            <Sheet>
                <TooltipButton tooltip="Search E-Resources">
                    <SheetTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="size-9 rounded-md border bg-primary ring-background transition-all duration-300 hover:scale-115 hover:bg-primary active:scale-100"
                        >
                            <SearchIcon className="h-5 w-5 text-primary-foreground" />
                        </Button>
                    </SheetTrigger>
                </TooltipButton>

                <SheetContent side="top" className="gap-0">
                    <SheetHeader className="text-center">
                        <SheetTitle>Search E-Resources</SheetTitle>
                    </SheetHeader>
                    <div className="relative mx-auto mb-6 w-full max-w-2xl px-4">
                        <LibrarySearch debounceSearch={false} />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default LibrarySearchSheet;
