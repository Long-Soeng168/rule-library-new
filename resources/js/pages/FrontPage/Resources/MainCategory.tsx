import RefreshButton from '@/components/Button/RefreshButton';
import { TooltipButton } from '@/components/Button/TooltipButton';
import ByYearDialog from '@/components/Dialog/ByYearDialog';
import PaginationTabs from '@/components/Pagination/PaginationTabs';
import ResourceSearch from '@/components/Search/ResourceSearch';
import ResourceList from '@/components/Section/ResourceList';
import ResourceSortBySelect from '@/components/Select/ResourceSortBySelect';
import ResourceSidebar from '@/components/Sidebar/ResourceSidebar';
import ResourceSidebarSheet from '@/components/Sidebar/ResourceSidebarSheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import FrontPageLayout from '@/layouts/FrontPageLayout';
import { LayoutGridIcon, LayoutListIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';

const MainCategory = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(true);
    const [cardLayout, setCardLayout] = useState<'grid' | 'list'>('grid');

    return (
        <FrontPageLayout>
            <section className="section-container mb-40">
                <div className="my-4">
                    {/* <ResourceBreadcrumb /> */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/resources">E-Resources</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="text-foreground">
                                    Theses
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex">
                    <div className={`hidden transition-all duration-300 ease-in-out md:block ${isShowSidebar ? 'mr-6 w-64' : 'w-0 overflow-hidden'}`}>
                        <ResourceSidebar />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            {/* Left Action Header */}
                            <div className="flex flex-1 items-center gap-2">
                                {/* Show Or Hide Sidebar Button Trigger */}
                                <TooltipButton tooltip={isShowSidebar ? 'Hide Filter' : 'Show Filter'}>
                                    <Button
                                        onClick={() => setIsShowSidebar(!isShowSidebar)}
                                        variant="ghost"
                                        size="icon"
                                        className="hidden size-11 rounded-md bg-muted text-primary hover:bg-primary hover:text-white md:flex"
                                    >
                                        <SlidersHorizontalIcon className="h-5 w-5" />
                                    </Button>
                                </TooltipButton>
                                {/* Show Or Hide Sidebar Sheet Button Trigger */}
                                <ResourceSidebarSheet className="md:hidden" />

                                {/* Search Input */}
                                <div className="max-w-xl flex-1">
                                    <ResourceSearch />
                                </div>
                            </div>

                            {/* Rigth Action Header */}
                            <div className="flex w-full justify-end gap-2 md:w-auto">
                                <RefreshButton />
                                <TooltipButton tooltip={cardLayout === 'grid' ? 'Switch to List' : 'Switch to Grid'}>
                                    <Button
                                        onClick={() => setCardLayout(cardLayout === 'grid' ? 'list' : 'grid')}
                                        variant="ghost"
                                        size="icon"
                                        className="size-11 rounded-md bg-muted text-foreground hover:bg-primary hover:text-white"
                                    >
                                        {cardLayout === 'grid' ? <LayoutGridIcon className="h-5 w-5" /> : <LayoutListIcon className="h-5 w-5" />}
                                    </Button>
                                </TooltipButton>
                                <ResourceSortBySelect />
                                <ByYearDialog />
                            </div>
                        </div>
                        <ResourceList cardLayout={cardLayout} className="mt-6" />
                        <PaginationTabs />
                    </div>
                </div>
            </section>
        </FrontPageLayout>
    );
};

export default MainCategory;
