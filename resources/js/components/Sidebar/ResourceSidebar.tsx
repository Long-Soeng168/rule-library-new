import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/animate-ui/radix/accordion';
import { RotateCwIcon } from 'lucide-react';
import { Button } from '../ui/button';
import LibrarySidebarList from './LibrarySidebarList';
import ResourceSidebarList from './ResourceSidebarList';

export const categories = [
    { value: 'civil-engineering-and-architecture', label: 'សំណង់វិស្វកម្មសំណង់ស៊ីវិល' },
    { value: 'law-and-economics', label: 'សេដ្ឋកិច្ចនិងច្បាប់' },
    { value: 'mathematics', label: 'គណិតវិទ្យា' },
    { value: 'computer-science', label: 'វិទ្យាសាស្ត្រកុំព្យូទ័រ' },
    { value: 'tourism-and-hospitality', label: 'ទេសចរណ៍និងបដិសណ្ឋារកិច្ច' },
    { value: 'accounting-and-finance', label: 'គណនេយ្យនិងហិរញ្ញវត្ថុ' },
    { value: 'public-administration', label: 'រដ្ឋបាលសាធារណៈ' },
    { value: 'statistics', label: 'ស្ថិតិ' },
    { value: 'economics', label: 'សេដ្ឋកិច្ច' },
    { value: 'law', label: 'ច្បាប់' },
];

export const advisors = [
    { value: 'advisor-1', label: 'Dr. Sokha Phan' },
    { value: 'advisor-2', label: 'Prof. Dara Chhun' },
    { value: 'advisor-3', label: 'Mr. Vannak Kim' },
    { value: 'advisor-4', label: 'Mrs. Sreymom Chea' },
    { value: 'advisor-5', label: 'Dr. Bopha Seng' },
    { value: 'advisor-6', label: 'Mr. Ratana Ouk' },
    { value: 'advisor-7', label: 'Prof. Chanthy Lim' },
    { value: 'advisor-8', label: 'Mrs. Socheata Khiev' },
    { value: 'advisor-9', label: 'Dr. Piseth Khou' },
    { value: 'advisor-10', label: 'Mr. Virak Noun' },
    { value: 'advisor-11', label: 'Prof. Sovann Roeun' },
    { value: 'advisor-12', label: 'Mrs. Malis Men' },
];
export const languages = [
    { value: 'kh', label: 'Khmer' },
    { value: 'en', label: 'English' },
];

export default function ResourceSidebar() {
    return (
        <>
            <Accordion type="multiple" defaultValue={['categories', 'advisors', 'languages']} className="w-full rounded-lg border px-0">
                <AccordionItem value="categories">
                    <AccordionTrigger chevron={false} className="px-4 pb-2 font-semibold">
                        Categories
                    </AccordionTrigger>
                    <AccordionContent className="px-2">
                        <ResourceSidebarList limit={20} heading="All Categories" options={categories} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="languages">
                    <AccordionTrigger chevron={false} className="px-4 font-semibold">
                        Languages
                    </AccordionTrigger>
                    <AccordionContent className="px-2">
                        <LibrarySidebarList heading="All Languages" options={languages} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="advisors">
                    <AccordionTrigger chevron={false} className="px-4 font-semibold">
                        Advisors
                    </AccordionTrigger>
                    <AccordionContent className="px-2">
                        <LibrarySidebarList heading="All Advisors" options={advisors} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="my-4 flex justify-end">
                <Button variant={'link'} className="hover:bg-muted">
                    <span>Clear All Filter</span>
                    <RotateCwIcon />
                </Button>
            </div>
        </>
    );
}
