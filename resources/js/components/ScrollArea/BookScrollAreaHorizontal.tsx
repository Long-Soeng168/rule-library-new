import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ImageIcon } from 'lucide-react';
import HoverButton from '../Button/HoverButton';
import HoverButton2 from '../Button/HoverButton2';
import BooksCarousel from '../Carousel/BooksCarousel';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function BookScrollAreaHorizontal({ items, mainCategoryCode }: { items: any[]; mainCategoryCode: string }) {
    const { currentLocale } = useTranslation();
    return (
        <>
            {/* Mobile */}
            <div className="mt-2 lg:hidden">
                <div className="overflow-x-visible">
                    <ScrollArea className="w-full overflow-x-visible rounded-md whitespace-nowrap">
                        <div className="section-container flex h-full w-full justify-start space-x-4 overflow-x-visible pb-4">
                            {items?.map((item) => (
                                <Link key={item.id} href={`/resources/${item.main_category_code}/${item.id}`}>
                                    <div className="w-[265px] shrink-0">
                                        <div className="overflow-hidden rounded-md border duration-300 hover:border-primary">
                                            <Avatar className="h-full w-full rounded-none border-none">
                                                <AvatarImage
                                                    src={`/assets/images/items/thumb/${item.thumbnail}`}
                                                    className="h-[378.57px] w-[265px] object-cover"
                                                    alt={item.name}
                                                />
                                                <AvatarFallback className="relative flex h-[378.57px] w-[265px] flex-col items-start justify-between overflow-hidden rounded-none bg-zinc-50 p-4 text-muted-foreground dark:bg-zinc-950">
                                                    <div
                                                        className={cn(
                                                            'transition-color flex h-full w-full flex-col items-center justify-center rounded-xl p-8',
                                                        )}
                                                    >
                                                        <ImageIcon className="size-12" strokeWidth={1.25} />

                                                        <div className="mt-4 flex flex-col items-center gap-1 text-center">
                                                            <span className="text-base text-foreground">
                                                                {currentLocale == 'kh' ? 'មិនមានរូបភាព' : 'No Image Available'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <p className="line-clamp-3 w-full pt-2 text-base whitespace-pre-wrap text-foreground">
                                            {item.name_kh ?? item.name}
                                        </p>
                                    </div>
                                </Link>
                            ))}

                            {/* View more */}
                            <div className="flex aspect-7/10 w-[222px] shrink-0 items-center justify-center">
                                <Link href={`/resources/${mainCategoryCode}`}>
                                    <HoverButton2 />
                                </Link>
                            </div>
                        </div>

                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                    <div className="mt-2 flex w-full justify-end pr-4">
                        <Link href={`/resources/${mainCategoryCode}`}>
                            <HoverButton />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className="overflow-x-hidden max-lg:hidden">
                <BooksCarousel items={items} mainCategoryCode={mainCategoryCode} />
            </div>
        </>
    );
}
