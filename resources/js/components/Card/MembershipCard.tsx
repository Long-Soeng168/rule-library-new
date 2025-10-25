import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { CalendarDaysIcon } from 'lucide-react';
import BarcodeLib from 'react-barcode';
import { Badge } from '../ui/badge';
import { BorderBeam } from '../ui/border-beam';

export default function MembershipCard() {
    // Example member object:
    let member = {
        name: 'Long Soeng',
        email: 'longsoeng@gmail.com',
        phone: '012 230 715 24',
        gender: 'Male',
        address: 'Phnom Penh, Sensok ',
        memberId: 'LB-000123',
        joinDate: '2023-07-15',
        expireDate: '2026-07-15',
        avatar: 'https://github.com/shadcn.png',
        barcodeValue: 'LB000123',
    };

    const { website_info } = usePage<any>().props;
    const { currentLocale } = useTranslation();

    const logo = website_info?.logo ? `/assets/images/website_infos/thumb/${website_info.logo}` : '/assets/images/default-logo.png';

    const logoDark = website_info?.logo_darkmode ? `/assets/images/website_infos/thumb/${website_info.logo_darkmode}` : logo;

    const name = currentLocale === 'kh' ? website_info?.name_kh || website_info?.name : website_info?.name;

    return (
        <Card className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-background py-0 shadow-none">
            <img src={logo} alt="" className="absolute top-4 left-1/2 z-0 size-44 -translate-x-1/2 object-contain opacity-15" />

            <BorderBeam duration={8} size={200} borderWidth={1.5} />
            {/* Content */}
            <CardContent className="z-10 space-y-4 p-5">
                {/* Avatar + Name */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-1 flex-col justify-start gap-1">
                        <span className="text-xl leading-none font-semibold text-foreground">{member.name}</span>
                        <span className='flex flex-wrap gap-1'>
                            <Badge className="mt-1 rounded" variant="secondary">
                                Information Technology (A01P12)
                            </Badge>
                        </span>
                        <span className="text-base text-foreground">{member.email}</span>
                        <span className="text-base text-foreground">{member.phone}</span>
                        <span className="text-base text-foreground">{member.gender}</span>
                        <span className="text-base text-foreground">{member.address}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Avatar className="aspect-3/4 w-22 rounded-sm border object-cover dark:border-white/20">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="rounded-none">{member.name?.[0]?.toUpperCase() || '?'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-end">
                            <span className="text-xs">Joined</span>
                            <span className="flex items-center text-sm gap-1 font-medium">
                                <CalendarDaysIcon className="h-4 w-4" />
                                {member.expireDate}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Barcode */}
                <div className="000justify-center flex flex-col items-center py-3">
                    <div className="bg-white">
                        <BarcodeLib
                            value={member.barcodeValue}
                            width={1.6}
                            height={55}
                            displayValue={false}
                            lineColor="#334155"
                            background="transparent"
                        />
                    </div>

                    <p>{member.barcodeValue}</p>
                </div>

                <p className="mt-2 text-center text-xs text-muted-foreground">Please present this card when visiting the library.</p>
            </CardContent>
        </Card>
    );
}
