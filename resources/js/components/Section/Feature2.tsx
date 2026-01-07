import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { ContentHeader } from '../Header/ContentHeader';
import { BookScrollAreaHorizontal } from '../ScrollArea/BookScrollAreaHorizontal';

export default function Feature2() {
    const { mainCategories } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    return (
        <div className="mt-20">
            <div className="section-container px-0 space-y-12">
                {mainCategories?.map((mainCate: any) => (
                    <div key={mainCate.code}>
                        <ContentHeader
                            containerClassName="px-3 mb-0"
                            link={`/resources/${mainCate.code}`}
                            title={currentLocale === 'kh' ? mainCate?.name_kh || mainCate?.name : mainCate?.name}
                        />

                        <BookScrollAreaHorizontal items={mainCate.items} mainCategoryCode={mainCate.code} />
                    </div>
                ))}
            </div>
        </div>
    );
}
