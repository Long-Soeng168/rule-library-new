import RefreshButton from '@/components/Button/RefreshButton';
import { TooltipButton } from '@/components/Button/TooltipButton';
import PaginationTabs from '@/components/Pagination/PaginationTabs';
import LibrarySearch from '@/components/Search/LibrarySearch';
import LibrarySidebar from '@/components/Sidebar/LibrarySidebar';
import LibrarySidebarSheet from '@/components/Sidebar/LibrarySidebarSheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import useTranslation from '@/hooks/use-translation';
import LibraryDataFrontPageLayout from '@/layouts/LibraryDataFrontPageLayout';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import TableData from './TableData';

const Index = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(true);
    const { t, currentLocale } = useTranslation();
    return (
        <LibraryDataFrontPageLayout>
            <section className="section-container mb-40">
                <div className="my-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">{t('Home')}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-foreground font-medium' href="/libraries">{t('Libraries')}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex">
                    <div className={`hidden transition-all duration-300 ease-in-out md:block ${isShowSidebar ? 'mr-6 w-58' : 'w-0 overflow-hidden'}`}>
                        <LibrarySidebar />
                    </div>
                    <div className="flex-1">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                            {/* Left Action Header */}
                            <div className="flex flex-1 items-center gap-2">
                                {/* Show Or Hide Sidebar Button Trigger */}
                                <TooltipButton tooltip={isShowSidebar ? 'Hide Filter' : 'Show Filter'}>
                                    <Button
                                        onClick={() => setIsShowSidebar(!isShowSidebar)}
                                        variant="ghost"
                                        size="icon"
                                        className="hidden size-14 rounded-full bg-muted text-primary hover:bg-primary hover:text-white md:flex"
                                    >
                                        <SlidersHorizontalIcon className="h-5 w-5" />
                                    </Button>
                                </TooltipButton>
                                {/* Show Or Hide Sidebar Sheet Button Trigger */}
                                <LibrarySidebarSheet className="md:hidden" />
                                {/* Search Input */}
                                <div className="max-w-xl flex-1">
                                    <LibrarySearch />
                                </div>
                            </div>

                            {/* Right Action Header */}
                            <RefreshButton className="size-[54px] rounded-full" />
                        </div>
                        <TableData />
                        <PaginationTabs containerClassName="px-0" />
                    </div>
                </div>
            </section>
        </LibraryDataFrontPageLayout>
    );
};

export default Index;
