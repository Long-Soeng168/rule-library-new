import { MotionHighlight } from '@/components/animate-ui/effects/motion-highlight';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SmallOverlayTopRightButton from '../Button/SmallOverlayTopRightButton';

import {
    Banknote,
    Briefcase,
    Calculator,
    ChevronDownIcon,
    ChevronUpIcon,
    Globe,
    Plane,
    Scale,
    Scroll,
    Sigma,
    TrendingUp,
    Wallet,
} from 'lucide-react';

const data = [
    { code: '1', icon: Globe, name: 'International Relations' },
    { code: '2', icon: Sigma, name: 'Mathematical Economics' },
    { code: '3', icon: Wallet, name: 'Accounting' },
    { code: '4', icon: Plane, name: 'Tourism' },
    { code: '5', icon: Briefcase, name: 'Business Management' },
    { code: '6', icon: Banknote, name: 'Banking and Finance' },
    { code: '7', icon: Scroll, name: 'Public Administration' },
    { code: '8', icon: Scale, name: 'Law' },
    { code: '9', icon: TrendingUp, name: 'Development Economics' },
    { code: '10', icon: Calculator, name: 'Mathematics' },
];

export const Feature3 = () => {
    const [showAll, setShowAll] = useState(false);

    const { libraryTypes } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    // show 7 + "See All" card when collapsed
    // const visibleCards = showAll ? libraryTypes : libraryTypes.slice(0, 7);
    const visibleCards = showAll ? data : data.slice(0, 10);

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            <MotionHighlight hover className="rounded-xl">
                {visibleCards.map((item: any) => (
                    <Link href={`/resources/theses?major_code=${item.code}`} key={item.id} prefetch>
                        <div key={item.id} data-id={item.id} className="group relative h-full cursor-pointer">
                            <div className="flex h-full flex-col rounded-xl border p-4 transition-all duration-300 hover:border-primary hover:shadow-md">
                                {/* <TableCellAvatar
                                    className="flex size-10 items-center justify-center rounded-md border-none bg-primary/10"
                                    imageClassName="object-contain p-1"
                                    altTextClassName="text-primary rounded-none bg-primary/5"
                                    image={`/assets/images/types/thumb/${item.image}`}
                                    alt={currentLocale === 'kh' ? item?.name_kh || item?.name : item?.name}
                                /> */}
                                <span className="flex size-10 items-center justify-center rounded-md border-none bg-primary/10 text-primary">
                                    <item.icon />
                                </span>

                                <p className="mt-2 text-base font-medium">{currentLocale === 'kh' ? item?.name_kh || item?.name : item?.name}</p>

                                {/* Hover icon overlay (top-right with animation) */}
                                <SmallOverlayTopRightButton className="bg-primary/20 text-primary" iconSize={5} />
                            </div>
                        </div>
                    </Link>
                ))}
            </MotionHighlight>
            {data?.length > 10 && (
                <div className="h-full w-full">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group flex h-full min-h-24 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border p-4 transition-all duration-300 hover:border-primary hover:bg-muted"
                    >
                        <div className="flex size-10 items-center justify-around rounded-full bg-primary/5 group-hover:bg-primary/10">
                            {showAll ? <ChevronUpIcon className="size-6 text-primary" /> : <ChevronDownIcon className="size-6 text-primary" />}
                        </div>
                        <p className="text-base">{showAll ? 'Show Less' : 'See All'}</p>
                    </button>
                </div>
            )}
        </div>
    );
};
