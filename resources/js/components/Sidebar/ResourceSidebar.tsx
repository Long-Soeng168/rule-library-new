import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/animate-ui/radix/accordion';
import LibrarySidebarList from '@/components/Sidebar/LibrarySidebarList';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { RotateCwIcon } from 'lucide-react';
import { useState } from 'react';

export default function ResourceSidebar() {
    const { categories, authors, publishers, advisors, languages } = usePage<any>().props;

    const { t, currentLocale } = useTranslation();

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const initialQueryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

    const [filters, setFilters] = useState({
        category_code: initialQueryParams.get('category_code') || '',
        grade_code: initialQueryParams.get('grade_code') || '',
        author_id: initialQueryParams.get('author_id') || '',
        publisher_id: initialQueryParams.get('publisher_id') || '',
        advisor_id: initialQueryParams.get('advisor_id') || '',
        language_code: initialQueryParams.get('language_code') || '',
    });

    const updateFilters = (updates: Partial<typeof filters>) => {
        const newFilters = { ...filters, ...updates };
        setFilters(newFilters);
        applyFilter(newFilters);
    };

    const applyFilter = (appliedFilters?: typeof filters) => {
        if (!currentPath) return;
        const f = appliedFilters ?? filters;
        const queryParams = new URLSearchParams(window.location.search);

        Object.entries(f).forEach(([key, value]) => {
            if (value) {
                queryParams.set(key, value);
            } else {
                queryParams.delete(key);
            }
        });

        queryParams.set('page', '1');

        router.visit(`${currentPath}?${queryParams.toString()}`, { preserveState: true, preserveScroll: true });
    };

    const resetFilter = () =>
        updateFilters({
            category_code: '',
            grade_code: '',
            author_id: '',
            publisher_id: '',
            advisor_id: '',
            language_code: '',
        });

    return (
        <>
            <Accordion
                type="multiple"
                defaultValue={['categories', 'authors', 'publishers', 'advisors', 'languages']}
                className={cn(
                    'w-full rounded-lg border px-4',
                    Object.values(filters).some((val) => !!val) && 'border-primary ring-4 ring-primary/20',
                )}
            >
                {categories?.length > 0 && (
                    <AccordionItem value="categories" key="categories">
                        <AccordionTrigger className="font-semibold">{t('Categories')}</AccordionTrigger>
                        <AccordionContent>
                            <LibrarySidebarList
                                limit={20}
                                heading={t('All Categories')}
                                value={filters.category_code}
                                // key={filters.category_code}
                                onChange={(val) => updateFilters({ category_code: val })}
                                options={categories.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? (item.name_kh ?? item.name) : item.name,
                                    children: item.children,
                                }))}
                            />
                        </AccordionContent>
                    </AccordionItem>
                )}

                {authors?.length > 0 && (
                    <AccordionItem value="authors" key="authors">
                        <AccordionTrigger className="font-semibold">{t('Authors')}</AccordionTrigger>
                        <AccordionContent>
                            <LibrarySidebarList
                                heading={t('All Authors')}
                                value={filters.author_id}
                                key={filters.author_id}
                                onChange={(val) => updateFilters({ author_id: val })}
                                options={authors.map((item: any) => ({
                                    value: item.id,
                                    label: currentLocale === 'kh' ? (item.name_kh ?? item.name) : item.name,
                                    items_count: item.author_items_count,
                                }))}
                            />
                        </AccordionContent>
                    </AccordionItem>
                )}

                {publishers?.length > 0 && (
                    <AccordionItem value="publishers" key="publishers">
                        <AccordionTrigger className="font-semibold">{t('Publishers')}</AccordionTrigger>
                        <AccordionContent>
                            <LibrarySidebarList
                                heading={t('All Publishers')}
                                value={filters.publisher_id}
                                key={filters.publisher_id}
                                onChange={(val) => updateFilters({ publisher_id: val })}
                                options={publishers.map((item: any) => ({
                                    value: item.id,
                                    label: currentLocale === 'kh' ? (item.name_kh ?? item.name) : item.name,
                                    items_count: item.publisher_items_count,
                                }))}
                            />
                        </AccordionContent>
                    </AccordionItem>
                )}
                {advisors?.length > 0 && (
                    <AccordionItem value="advisors" key="advisors">
                        <AccordionTrigger className="font-semibold">{t('Advisors')}</AccordionTrigger>
                        <AccordionContent>
                            <LibrarySidebarList
                                heading={t('All Advisors')}
                                value={filters.advisor_id}
                                key={filters.advisor_id}
                                onChange={(val) => updateFilters({ advisor_id: val })}
                                options={advisors.map((item: any) => ({
                                    value: item.id,
                                    label: currentLocale === 'kh' ? (item.name_kh ?? item.name) : item.name,
                                    items_count: item.advisor_items_count,
                                }))}
                            />
                        </AccordionContent>
                    </AccordionItem>
                )}
                {languages?.length > 0 && (
                    <AccordionItem value="languages" key="languages" className="border-b-0">
                        <AccordionTrigger className="font-semibold">{t('Languages')}</AccordionTrigger>
                        <AccordionContent>
                            <LibrarySidebarList
                                heading={t('All Languages')}
                                value={filters.language_code}
                                key={filters.language_code}
                                onChange={(val) => updateFilters({ language_code: val })}
                                options={languages.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? (item.name_kh ?? item.name) : item.name,
                                    items_count: item.items_count,
                                }))}
                            />
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
            <div className="flex justify-end">
                <button onClick={resetFilter} className="mt-2 flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-muted hover:underline">
                    <RotateCwIcon size={18} /> {t('Clear Filter')}
                </button>
            </div>
        </>
    );
}
