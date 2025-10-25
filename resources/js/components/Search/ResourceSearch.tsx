import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';

const ResourceSearch = () => {
    return (
        <div>
            <div className="relative mx-auto w-full max-w-full">
                <div className="group flex h-11 items-center overflow-hidden rounded-md border border-primary ring-primary/20 transition-colors focus-within:border-primary focus-within:ring-4 dark:ring-primary/50">
                    <span className="flex h-full items-center justify-center pl-1.5 text-primary group-focus-within:text-primary">
                        <SearchIcon className="mt-[2px] size-7 pl-1" />
                    </span>
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="text-2lg flex-1 border-0 bg-background shadow-none focus-visible:ring-0 sm:text-lg"
                    />
                    <button className="h-full cursor-pointer border-l border-l-primary bg-muted px-4 font-medium text-primary duration-100 hover:bg-true-primary/90 hover:text-white">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResourceSearch;
