import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import HoverButton from '../Button/HoverButton';
import HoverButton2 from '../Button/HoverButton2';
import SmallOverlayTopRightButton from '../Button/SmallOverlayTopRightButton';
import { ContentHeader } from '../Header/ContentHeader';

export default function Feature2() {
    const { librariesHeader, libraryData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    return (
        <div className="mt-10">
            <div className="section-container">
                <ContentHeader
                    title={currentLocale === 'kh' ? librariesHeader?.name_kh || librariesHeader?.name : librariesHeader?.name}
                    description={
                        currentLocale === 'kh'
                            ? librariesHeader?.short_description_kh || librariesHeader?.short_description
                            : librariesHeader?.short_description
                    }
                />
            </div>
            <div className="overflow-x-visible">
                <ScrollArea className="w-full overflow-x-visible rounded-md whitespace-nowrap">
                    <div className="section-container flex h-full w-max justify-start space-x-4 overflow-x-visible pb-4">
                        {libraryData.map((item: any) => (
                            <Link href={`/libraries/${item.id}`} key={item.id} prefetch>
                                <div className="group relative aspect-video w-72 shrink-0 cursor-pointer overflow-hidden rounded-lg lg:w-96">
                                    <img
                                        src={`/assets/images/library_data/thumb/${item.banner}`}
                                        alt={item.name}
                                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Text overlay at bottom */}
                                    <div className="absolute inset-x-0 bottom-0 w-full bg-gradient-to-t from-gray-950/80 p-3 sm:p-4">
                                        <p className="text-base font-medium line-clamp-2 break-words whitespace-normal text-white drop-shadow-sm sm:text-xl">
                                            {item.name_of_library}
                                        </p>
                                        <p className="text-sm break-words whitespace-normal text-gray-200/90 sm:text-base">
                                            {currentLocale === 'kh' ? item?.province?.name_kh || item?.province?.name : item?.province?.name}
                                        </p>
                                    </div>

                                    {/* Hover icon overlay (top-right with animation) */}
                                    <SmallOverlayTopRightButton className="" iconSize={6} />
                                </div>
                            </Link>
                        ))}
                        <button className="shrink-0">
                            <div className="flex h-full w-60 items-center justify-center">
                                <Link href={`/libraries`}>
                                    <HoverButton2 />
                                </Link>
                            </div>
                        </button>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="mt-1 flex w-full justify-end pr-4">
                <Link href={`/libraries`}>
                    <HoverButton />
                </Link>
            </div>
        </div>
    );
}
