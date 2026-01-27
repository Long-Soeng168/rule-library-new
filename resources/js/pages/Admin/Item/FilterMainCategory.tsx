import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { CircleCheckBigIcon, LayoutGridIcon } from 'lucide-react';

interface MainCategory {
    id: number;
    code: string;
    name: string;
    name_kh: string;
    image?: string;
}

const FilterMainCategory = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const { mainCategories } = usePage<{ mainCategories: MainCategory[] }>().props;

    // Updated key to 'main_category_code'
    const queryParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const activeCategory = queryParams.get('main_category_code') || '';

    const handleCategoryChange = (categoryCode: string) => {
        const newCategory = categoryCode === activeCategory ? '' : categoryCode;
        // const newParams = new URLSearchParams(window.location.search);
        const newParams = new URLSearchParams();

        if (newCategory) {
            newParams.set('main_category_code', newCategory);
        } else {
            newParams.delete('main_category_code');
        }

        newParams.set('page', '1');

        router.get(
            `${currentPath}?${newParams.toString()}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const getButtonClass = (isActive: boolean) => {
        // Added rounded-[10px] and whitespace-nowrap for the scrollable row
        const base = 'flex items-center gap-2 p-2 transition-all border text-sm font-medium rounded whitespace-nowrap';

        // Shadcn UI Dark Mode variables
        const activeStyles = 'border-primary bg-primary/10 text-primary ring-1 ring-primary';
        const inactiveStyles = 'border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground';

        return `${base} ${isActive ? activeStyles : inactiveStyles}`;
    };

    const { t, currentLocale } = useTranslation();

    return (
        /* Added scrollbar-hide or custom scroll styling classes if you have them */
        <div className="no-scrollbar flex flex-row items-center gap-3 overflow-x-auto p-2 pt-1">
            {/* "All" Option */}
            <button onClick={() => handleCategoryChange('')} className={cn(getButtonClass(activeCategory === ''), 'h-12')}>
                <CircleCheckBigIcon size={18} />
                <span>{t('All Main Categories')}</span>
            </button>

            {/* Dynamic Categories */}
            {mainCategories?.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.code)}
                    className={getButtonClass(activeCategory === category.code)}
                >
                    {category.image ? (
                        <img
                            src={`/assets/images/item_categories/thumb/${category.image}`}
                            alt={currentLocale == 'kh' ? (category?.name_kh ?? category?.name) : category?.name}
                            className="size-7 rounded object-cover"
                        />
                    ) : (
                        <LayoutGridIcon size={18} />
                    )}
                    <span> {currentLocale == 'kh' ? (category?.name_kh ?? category?.name) : category?.name}</span>
                </button>
            ))}
        </div>
    );
};

export default FilterMainCategory;
