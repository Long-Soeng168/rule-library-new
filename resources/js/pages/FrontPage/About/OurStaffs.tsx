import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { staffSampleData } from '@/data/staff-sample-data';
import useTranslation from '@/hooks/use-translation';
import FrontPageLayout from '@/layouts/FrontPageLayout';
import { usePage } from '@inertiajs/react';
import { Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import OurStaffsStructure from './OurStaffsStructure';

export default function StaffPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStaff = staffSampleData.filter((staff) =>
        Object.values(staff).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase())),
    );

    const libraryOrder = ['គ្រប់គ្រងទូទៅ', 'បណ្ណាល័យសេដ្ឋកិច្ច', 'បណ្ណាល័យនីតិសាស្រ្ត', 'បណ្ណាល័យអេឡិចត្រូនិក'];

    // shadcn token colors
    const shiftColorMap = {
        វេនព្រឹក: 'bg-green-500/20 text-green-600',
        វេនរសៀល: 'bg-yellow-500/20 text-yellow-600',
        ពេញម៉ោង: 'bg-primary/20 text-primary',
    };

    const { url } = usePage();
    const { t, currentLocale } = useTranslation();

    return (
        <FrontPageLayout>
            <div className="section-container">
                {/* Header */}
                <header className="my-8 text-center">
                    <h1 className="text-3xl font-bold text-foreground md:text-4xl">បុគ្គលិកបណ្ណាល័យ</h1>
                </header>

                <Tabs defaultValue={url == '/our-staffs' ? 'our-staffs' : 'our-staffs-structure'}>
                    <TabsList className="mb-6 flex justify-center">
                        <TabsTrigger value="our-staffs" className="flex-1 cursor-pointer">
                            {t('Our Staffs')}
                        </TabsTrigger>
                        <TabsTrigger value="our-staffs-structure" className="flex-1 cursor-pointer">
                            {t('Staffs Structure')}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="our-staffs">
                        <>
                            {/* Staffs */}
                            <div className="mb-8 flex flex-col gap-4 bg-background/80 py-4 backdrop-blur-sm sm:flex-row">
                                <input
                                    type="text"
                                    placeholder="ស្វែងរក​ (ឈ្មោះ, ភារកិច្ច, ឬបណ្ណាល័យ...)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="grow rounded-md border border-border p-3 text-foreground transition placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            {filteredStaff.length === 0 ? (
                                <div className="py-10 text-center text-lg text-muted-foreground">មិនមានលទ្ធផលសម្រាប់ការស្វែងរករបស់អ្នកទេ។</div>
                            ) : (
                                libraryOrder.map((libraryName) => {
                                    const libraryStaff = filteredStaff.filter((s) => s.library === libraryName);
                                    if (!libraryStaff.length) return null;

                                    const shifts = { ពេញម៉ោង: [], វេនព្រឹក: [], វេនរសៀល: [] };
                                    libraryStaff.forEach((s) => shifts[s.shift].push(s));

                                    return (
                                        <section key={libraryName} className="mb-8 rounded-lg border border-border bg-muted p-4 sm:p-6">
                                            <h2 className="mb-4 border-b-2 border-primary/40 pb-2 text-2xl font-bold text-primary">{libraryName}</h2>

                                            {Object.entries(shifts).map(
                                                ([shiftName, staffArr]) =>
                                                    staffArr.length > 0 && (
                                                        <div key={shiftName}>
                                                            <h3 className="mt-5 mb-3 text-xl font-semibold text-foreground">{shiftName}</h3>
                                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                                                {staffArr.map((staff, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="flex h-full flex-col rounded-lg border border-border bg-background p-5 shadow transition hover:shadow-md dark:bg-white/8"
                                                                    >
                                                                        <div className="mb-4 flex items-start">
                                                                            <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
                                                                                <ImageIcon className="h-8 w-8" />
                                                                            </div>
                                                                            <div className="flex-grow">
                                                                                <h3 className="text-lg font-bold text-foreground">{staff.name}</h3>
                                                                                <p className="text-sm text-muted-foreground">{staff.library}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow space-y-2">
                                                                            <p className="text-foreground">
                                                                                <strong className="font-medium">ភារកិច្ច:</strong> {staff.task}
                                                                            </p>
                                                                            <p className="text-sm text-muted-foreground">
                                                                                <strong className="font-medium">ម៉ោងធ្វើការ:</strong>{' '}
                                                                                {staff.hours || 'N/A'}
                                                                            </p>
                                                                            <div className="space-y-1 pt-1 text-sm text-muted-foreground">
                                                                                <div className="flex items-center">
                                                                                    <span>📞 {staff.phone || 'N/A'}</span>
                                                                                </div>
                                                                                <div className="flex items-center">
                                                                                    <span>✉️ {staff.email || 'N/A'}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-3 text-right">
                                                                            <span
                                                                                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                                                                    shiftColorMap[staff.shift] || 'bg-muted text-foreground'
                                                                                }`}
                                                                            >
                                                                                {staff.shift}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ),
                                            )}
                                        </section>
                                    );
                                })
                            )}
                        </>
                    </TabsContent>
                    <TabsContent value="our-staffs-structure">
                        <OurStaffsStructure />
                    </TabsContent>
                </Tabs>
            </div>
        </FrontPageLayout>
    );
}
