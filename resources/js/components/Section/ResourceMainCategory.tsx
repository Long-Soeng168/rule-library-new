import { Link } from '@inertiajs/react';
import { BookOpen, FileText, Headphones, Library, Video } from 'lucide-react';
import { MotionHighlight } from '../animate-ui/effects/motion-highlight';
import SmallOverlayTopRightButton from '../Button/SmallOverlayTopRightButton';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const CARDS = [
    { value: '1', icon: FileText, title: 'Theses' },
    { value: '2', icon: Library, title: 'Publications' },
    { value: '4', icon: BookOpen, title: 'Research Paper' },
    { value: '3', icon: Headphones, title: 'Audios' },
    { value: '5', icon: Video, title: 'Videos' },
    // { value: '6', icon: Newspaper, title: 'News Articles' },
    // { value: '7', icon: Presentation, title: 'Presentations' },
    // { value: '8', icon: ScrollText, title: 'Reports' },
];

export default function ResourceMainCategory({ className = '' }) {
    return (
        <ScrollArea className="h-full w-full overflow-x-auto pb-5">
            {/* Actual Max width padding-x and 5 cols items = 1280 - (16*2) -  (16*4) = 1184px (236.8px each)*/}
            <div className="mx-auto flex max-w-[1280px] gap-[16px] px-[16px]">
                <MotionHighlight hover className="rounded-md">
                    {CARDS.map((card) => (
                        <Link key={card.value} href={`/resources/theses`}>
                            <div
                                data-value={card.value}
                                className="group relative h-full w-[140px] flex-shrink-0 cursor-pointer overflow-hidden sm:w-[160px] md:w-[200px] lg:w-[236.8px]"
                            >
                                <div className="flex h-full flex-col items-center justify-center rounded-md border p-4 transition-all duration-300 hover:border-primary hover:shadow-md">
                                    <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-muted">
                                        <card.icon className="size-10 text-true-primary" />
                                    </div>
                                    <p className="mb-1 text-lg font-medium">{card.title}</p>
                                    <p className="text-base text-muted-foreground">1200+ {card.title}</p>

                                    {/* Hover icon overlay */}
                                    <SmallOverlayTopRightButton className="bg-primary/20 text-primary" iconSize={5} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </MotionHighlight>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
