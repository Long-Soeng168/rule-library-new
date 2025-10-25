import CategoryBreadcrumb from '@/components/Breadcrumb/CategoryBreadcrumb';
import NewItemButton from '@/components/Button/NewItemButton';
import RefreshButton from '@/components/Button/RefreshButton';
import PaginationTabs from '@/components/Pagination/PaginationTabs';
import TableDataSearch from '@/components/Search/TableDataSearch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import FilterData from './FilterData';
import HelpDialog from './HelpDialog';
import TableData from './TableData';

const Index = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        {
            title: 'Items',
            href: '/admin/items',
        },
        {
            title: 'Categories',
            href: '/admin/item-categories',
        },
    ];
    const { filteredCategory } = usePage<any>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <>
                <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-6">
                    <div className="flex w-full gap-2 md:w-auto">
                        <FilterData />
                        <TableDataSearch />
                        <RefreshButton />
                        <HelpDialog />
                    </div>
                    <div className="flex w-full justify-end md:w-auto">
                        {/* Add New Dialog */}
                        <NewItemButton
                            url={`/admin/item-categories/create?${filteredCategory?.id ? 'filtered_category_id=' + filteredCategory?.id : ''}`}
                            permission="item_category create"
                        />
                    </div>
                </div>
                <CategoryBreadcrumb path='/admin/item-categories' />
                <TableData />
                <PaginationTabs />
            </>
        </AppLayout>
    );
};

export default Index;
