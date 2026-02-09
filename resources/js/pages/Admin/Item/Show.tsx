import ResourceDetail from '@/components/Section/ResourceDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import ItemPhysicalCopy from './ItemPhysicalCopy';

const Show = () => {
    const { showData, app_url } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Items', href: '/admin/items' },
        { title: showData?.name, href: '#' },
    ];

    const [inputLanguage, setInputLanguage] = useState<'itemDetail' | 'physicalCopies'>('itemDetail');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <section className="p-3">
                <Tabs value={inputLanguage} onValueChange={(val: any) => setInputLanguage(val)}>
                    <TabsList className="mb-1 border bg-border/50 p-1 dark:border-white/20">
                        <TabsTrigger value="itemDetail" className="h-full dark:data-[state=active]:bg-white/20">
                            {t('Item Detail')}
                        </TabsTrigger>
                        <TabsTrigger value="physicalCopies" className="h-full dark:data-[state=active]:bg-white/20">
                            {t('Physical Copies')}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="itemDetail">
                        <ResourceDetail />
                        <section className="mt-8">
                            <ItemPhysicalCopy />
                        </section>
                    </TabsContent>
                    <TabsContent value="physicalCopies">
                        <section>
                            <ItemPhysicalCopy />
                        </section>
                    </TabsContent>
                </Tabs>
            </section>
        </AppLayout>
    );
};

export default Show;
