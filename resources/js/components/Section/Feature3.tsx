import {
    Book,
    BookOpen,
    Briefcase,
    Building,
    Bus,
    ChevronDownIcon,
    ChevronUpIcon,
    Church,
    GraduationCap,
    HeartHandshake,
    Home,
    Landmark,
    MapPin,
    School,
    Ship,
    Store,
    Tent,
    University,
    User,
    Users,
    Wrench,
} from 'lucide-react';

import { MotionHighlight } from '@/components/animate-ui/effects/motion-highlight';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import TableCellAvatar from '../Avatar/TableCellAvatar';
import SmallOverlayTopRightButton from '../Button/SmallOverlayTopRightButton';

const CARDS = [
    { value: '1', icon: University, title: 'Higher Education Institution Library' },
    { value: '8', icon: Building, title: 'Government and related' },
    { value: '3', icon: GraduationCap, title: 'High School Library' },
    { value: '4', icon: BookOpen, title: 'Middle School Library' },
    { value: '5', icon: Book, title: 'Primary School Library' },
    { value: '6', icon: School, title: 'Kindergarten Library' },
    { value: '7', icon: Landmark, title: 'National Library' },
    { value: '9', icon: MapPin, title: 'Provincial Library' },
    { value: '2', icon: Wrench, title: 'Technical and Vocational Education and Training Library' },
    { value: '10', icon: Briefcase, title: 'Firm Library (serves their staff members)' },
    { value: '11', icon: Store, title: 'Library Corner/stall at shops (serve customers)' },
    { value: '12', icon: User, title: 'Private Library (serves the community)' },
    { value: '13', icon: Home, title: 'Home Library (serves only friends and family)' },
    { value: '14', icon: HeartHandshake, title: 'NGO Library (located in NGO office)' },
    { value: '15', icon: Landmark, title: 'Pagoda Library' },
    { value: '16', icon: Church, title: 'Church Library' },
    { value: '17', icon: Users, title: 'Community Library' },
    { value: '18', icon: Bus, title: 'Mobile Van Library' },
    { value: '19', icon: Ship, title: 'Mobile Boat Library' },
    { value: '20', icon: Tent, title: 'Pop-up Library' },
];

export const Feature3 = () => {
    const [showAll, setShowAll] = useState(false);

    const { libraryTypes } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    // show 7 + "See All" card when collapsed
    const visibleCards = showAll ? libraryTypes : libraryTypes.slice(0, 7);

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <MotionHighlight hover className="rounded-xl">
                {visibleCards.map((item: any) => (
                    <Link href={`/libraries?library_type_code=${item.code}`} key={item.id} prefetch>
                        <div key={item.id} data-id={item.id} className="group relative h-full cursor-pointer">
                            <div className="flex h-full flex-col rounded-xl border p-4 transition-all duration-300 hover:border-primary hover:shadow-md">
                                <TableCellAvatar
                                    className="flex size-10 items-center justify-center rounded-md border-none bg-primary/10"
                                    imageClassName="object-contain p-1"
                                    altTextClassName="text-primary rounded-none bg-primary/5"
                                    image={`/assets/images/types/thumb/${item.image}`}
                                    alt={currentLocale === 'kh' ? item?.name_kh || item?.name : item?.name}
                                />
                                <p className="mt-2 text-base font-medium">{currentLocale === 'kh' ? item?.name_kh || item?.name : item?.name}</p>

                                {/* Hover icon overlay (top-right with animation) */}
                                <SmallOverlayTopRightButton className="bg-primary/20 text-primary" iconSize={5} />
                            </div>
                        </div>
                    </Link>
                ))}
            </MotionHighlight>
            <div className="h-full w-full">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="group flex h-full min-h-24 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border p-4 transition-all duration-300 hover:border-primary hover:bg-muted"
                >
                    <div className="flex size-10 items-center justify-around rounded-full group-hover:bg-primary/10">
                        {showAll ? <ChevronUpIcon className="size-6 text-primary" /> : <ChevronDownIcon className="size-6 text-primary" />}
                    </div>
                    <p className="text-base">{showAll ? 'Show Less' : 'See All'}</p>
                </button>
            </div>
        </div>
    );
};
