import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { ContentHeader } from '../Header/ContentHeader';
import { ScrollAreaHorizontalItem } from '../ScrollArea/ScrollAreaHorizontalItem';

export default function Feature2() {
    const { librariesHeader, libraryData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    return (
        <div className="mt-10">
            <div className="section-container">
                <ContentHeader
                    // title={currentLocale === 'kh' ? librariesHeader?.name_kh || librariesHeader?.name : librariesHeader?.name}
                    // description={
                    //     currentLocale === 'kh'
                    //         ? librariesHeader?.short_description_kh || librariesHeader?.short_description
                    //         : librariesHeader?.short_description
                    // }
                    title="Theses"
                />
            </div>
            <ScrollAreaHorizontalItem />
            <div className="section-container mt-20">
                <ContentHeader
                    // title={currentLocale === 'kh' ? librariesHeader?.name_kh || librariesHeader?.name : librariesHeader?.name}
                    // description={
                    //     currentLocale === 'kh'
                    //         ? librariesHeader?.short_description_kh || librariesHeader?.short_description
                    //         : librariesHeader?.short_description
                    // }
                    title="Publications"
                />
            </div>
            <ScrollAreaHorizontalItem />
        </div>
    );
}
