import { TeamAccordion } from '@/components/Accordion/TeamAccordion';
import AlertLibraryArticles from '@/components/Alert/AlertLibraryArticles';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/animate-ui/radix/accordion';
import { MobileTableOfContents } from '@/components/TableContent/mobile-table-of-contents';
import { TableOfContents } from '@/components/TableContent/table-of-contents';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import FrontPageLayout from '@/layouts/FrontPageLayout';

const Index = () => {
    return (
        <FrontPageLayout>
            <ScrollProgress className="top-0 h-[4px]" />
            <div className="section-container px-0">
                <div className="relative z-10 mx-auto flex max-w-7xl divide-x divide-border px-4 md:px-0">
                    <div className="pointer-events-none absolute left-1/2 mx-auto h-full w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 border-x border-border p-0 lg:w-full" />
                    <main className="prose w-full max-w-none overflow-hidden p-4 pb-20 dark:prose-invert prose-h2:mb-0.5 prose-h3:mb-0.5 prose-p:m-0 prose-ul:m-0">
                        <h1 className="mt-6 leading-tight text-primary">About RULE Library</h1>
                        <section>
                            <h2>1. Introduction</h2>
                            <p>
                                The Royal University of Law and Economic Sciences, since its inception in 1949, has actively contributed to the
                                training of human resources in the fields of law and economics.
                            </p>
                            <p>
                                Knowledge is a major source of development. Library development is about improving the reading skills of the general
                                public and contributing to the advancement of the education sector in Cambodia.
                            </p>
                            <p> Currently, the Royal University of Law and Economic Sciences has three major libraries:</p>
                            <ul>
                                <li>Law Library</li>
                                <li>Economics Library</li>
                                <li>Electronic library</li>
                            </ul>
                            <p>
                                Located in the new building (I) Second floor, third floor, and fourth floor. Second floor, third floor, and fourth
                                floor.
                            </p>
                        </section>
                        <section>
                            <h2>2. Working Hours</h2>
                            <ul>
                                <li>Monday to Saturday: 8:00 AM to 7:00 PM</li>
                                <li>Closed on Sundays and national holidays.</li>
                            </ul>
                        </section>
                        <section>
                            <h2>3. Library Materials</h2>
                            <p>
                                The Law and Economics Library has a total of 15,232 books in Khmer, English, and French. There are 373 books for the
                                electronic library. The electronic library has 68 computers for students to use. It is equipped with documents
                                obtained online by the university, which has become an annual member or through partners (MOU) of the university, such
                                as the LexisNexis database.
                            </p>
                        </section>

                        <section>
                            <h2>4. Management and Services</h2>
                            <p>The library's activities are divided into three major areas:</p>

                            <div>
                                <Accordion defaultValue={['item-0']} type="multiple" className="my-4 w-full space-y-2">
                                    <AccordionItem className="rounded-md border-none bg-secondary px-4" value="item-0">
                                        <AccordionTrigger className="text-lg font-bold text-foreground data-[state=open]:pb-2">
                                            Borrowing and Repayment Section
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-foreground">
                                            <p>
                                                Welcomes students, faculty, and patrons who come to use the library. This section manages the computer
                                                system to borrow and return books, checks students in and out according to internal regulations,
                                                registers students and faculty who wish to borrow books, and oversees the reading room to maintain a
                                                quiet and orderly atmosphere.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem className="rounded-md border-none bg-secondary px-4" value="item-1">
                                        <AccordionTrigger className="text-lg font-bold text-foreground data-[state=open]:pb-2">
                                            Information Support Section
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-foreground">
                                            <p>
                                                Provides information and answers questions regarding library services. Guides students in searching
                                                for data in the university catalog and electronic databases.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem className="rounded-md border-none bg-secondary px-4" value="item-2">
                                        <AccordionTrigger className="text-lg font-bold text-foreground data-[state=open]:pb-2">
                                            Catalog Section
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-foreground">
                                            <p>
                                                Enters book and document data using the KOHA System, classifies books into groups, and codes them
                                                using the Dewey Decimal Classification (DDC).
                                            </p>

                                            <p>
                                                All students of the Royal University of Law and Economic Sciences have access to the library's
                                                services at all times. Library patrons can contact staff to request a library card to borrow books.
                                                The library card is valid for one academic year.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </section>

                        <section>
                            <h2>5. Instructions on Using Library Services</h2>
                            <p>
                                The library offers instructional services, which can be provided in groups at the library, individually, or in
                                classroom presentations. Students, groups, or faculty who wish to have library staff provide instruction on how to use
                                library services may contact the library administrator.
                            </p>
                        </section>
                        <section>
                            <h2>6. Document Management System</h2>
                            <p>
                                The library has installed a data management system called the <strong>KOHA System</strong>. This system includes many
                                important modules to serve the needs of the library. The most essential parts used daily are:
                            </p>

                            <ul>
                                <li>
                                    <strong>Circulation – Book Loan Section:</strong> Manages book borrowing and returns.
                                </li>
                                <li>
                                    <strong>Patrons:</strong> Registers students or professors who wish to borrow books or use services.
                                </li>
                                <li>
                                    <strong>Advanced Search:</strong> Allows detailed searches for documents in the library.
                                </li>
                                <li>
                                    <strong>Cataloging:</strong> Records book and document data.
                                </li>
                                <li>
                                    <strong>Authorities:</strong> Standardizes author names and institution names.
                                </li>
                                <li>
                                    <strong>Reports:</strong> Creates reports or book lists.
                                </li>
                                <li>
                                    <strong>KOHA Administration:</strong> Allows administrators to edit, add, or delete data.
                                </li>
                                <li>
                                    <strong>OPAC:</strong> The Library Service Information module provides users with easy access to books and other
                                    documents available in the library. This service is available both in the library and online through the{' '}
                                    <a href="http://www.libraryrule.com" target="_blank">
                                        library website
                                    </a>{' '}
                                    or via the{' '}
                                    <a href="http://www.rule.edu.kh" target="_blank">
                                        Royal University of Law and Economic Sciences website
                                    </a>
                                    .
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2>7. Library Services</h2>
                            <ul>
                                <li>
                                    The library of the Royal University of Law and Economic Sciences is a space where students and professors can
                                    freely conduct research and study as needed. However, to borrow books from the library, users must register for a
                                    library card, which is valid until the end of each academic year.
                                </li>

                                <li>
                                    Library members are entitled to borrow up to <strong>two books at a time</strong> for a period of{' '}
                                    <strong>14 days</strong>, free of charge.
                                </li>

                                <li>
                                    In addition, the library provides a <strong>consultation room</strong> for students and professors to use for
                                    group discussions. This room is equipped with an <strong>LCD projector</strong> to support collaborative work and
                                    presentations.
                                </li>
                            </ul>
                        </section>
                        <section>
                            <h2>8. RULE Library Structure</h2>
                            <p>
                                The library of the Royal University of Law and Economic Sciences is divided into three sections to align with the
                                university's training specializations: the <strong>Law Library</strong>, the <strong>Economics Library</strong>, and
                                the <strong>Electronic Library</strong>.
                            </p>
                            <Accordion defaultValue={['item-0']} type="multiple" className="my-4 w-full space-y-2">
                                <AccordionItem className="rounded-md border-none bg-secondary px-4" value="item-0">
                                    <AccordionTrigger className="text-lg font-bold text-foreground data-[state=open]:pb-2">
                                        Law Library
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-foreground">
                                        <p>
                                            The Law Library is a specialized library in the field of law, located on the{' '}
                                            <strong>second floor of Building I</strong>. It contains more than{' '}
                                            <strong>10,000 document resources</strong> in three languages — Khmer, English, and French — including
                                            documents, research reports, theses, national and international legal documents, legal theory books, and
                                            various other publications.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem className="rounded-md border-none bg-secondary px-4" value="item-1">
                                    <AccordionTrigger className="text-lg font-bold text-foreground data-[state=open]:pb-2">
                                        Economics Library
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-foreground">
                                        <p>
                                            Located on the <strong>third floor of Building I</strong>, the Economics Library is a specialized library
                                            in the field of economics. Similar to the Law Library, it serves as a central hub that houses nearly all
                                            economic document resources, with more than <strong>10,000 documents</strong> to support the research
                                            needs of students and professors.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem className="rounded-md border-none bg-secondary px-4" value="item-2">
                                    <AccordionTrigger className="text-lg font-bold text-foreground data-[state=open]:pb-2">
                                        Electronic Library
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-foreground">
                                        <p>
                                            As a member of the <strong>ASEAN University Network (AUN)</strong>, the Royal University of Law and
                                            Economic Sciences established the Electronic Library in response to the continuous development of
                                            technology. Located on the <strong>fourth floor of Building I</strong>, the Electronic Library plays an
                                            important role in providing online research services. It serves as a resource center for
                                            technology-related document research and is equipped with numerous computers for students and professors
                                            to use for their research activities.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </section>
                        <section>
                            <h2>9. Library and Technology Integration</h2>
                            <p>
                                Under the careful leadership of the university's leadership and management, the library of the Royal University of Law
                                and Economics has developed rapidly with the implementation of modern software to manage the library's operations. As
                                a result, the library initially used a world-class library management system called Koha , which made library
                                management easier with book search, book data storage, loan management, and many other important functions. At the
                                same time, the library has also prepared an E-Library project , through which students and professors can easily use
                                the library of the Royal University of Law and Economics via the Internet.
                            </p>
                        </section>
                        <section>
                            <h2>10. Internal Regulations</h2>
                            <p>
                                The library of the Royal University of Law and Economic Sciences is open to provide services to students and
                                researchers during all working hours. To ensure good service, students are requested to follow the regulations below:
                            </p>

                            <AlertLibraryArticles />
                        </section>
                        <section>
                            <h2>11. Library Staff</h2>

                            <div className="not-prose">
                                <TeamAccordion
                                    defaultValue="Dr. Ngan Sundet"
                                    members={[
                                        {
                                            name: 'Dr. Ngan Sundet',
                                            image: '/assets/rule_library/profiles/sundet.jpeg',
                                            role: 'Managing Director',
                                            description: `The library is a storehouse of wisdom. A person who reads a lot will develop a clear vision. This is the path that everyone should travel.
If you have a road map and still can't find your destination, then you are truly lost.
`,
                                        },
                                    ]}
                                />

                                <TeamAccordion
                                    members={[
                                        {
                                            name: 'Mr. Kim Chantraboth',
                                            role: 'Technical Librarian',
                                            description:
                                                'Coordinates all technical work and library operations, including library services and other technical matters.',
                                        },
                                    ]}
                                />
                                <TeamAccordion
                                    members={[
                                        {
                                            name: 'អ៊ុង សុបញ្ញាម៉ូនិក',
                                            role: 'Administrator',
                                            description: 'Prepare administrative documents and manage materials.',
                                        },
                                    ]}
                                />
                            </div>

                            <p>
                                The library currently has <strong>1 civil servant librarian</strong> and <strong>13 contract librarians</strong>.
                            </p>

                            <section>
                                <p className="pt-4 text-lg font-bold">Law Library</p>
                                <div className="not-prose">
                                    <TeamAccordion
                                        members={[
                                            {
                                                name: 'Mrs. Seng Vanna',
                                                role: 'Librarian',
                                                description: 'In charge of library card management; afternoon shift librarian.',
                                            },
                                            {
                                                name: 'Ms. Lee Rany',
                                                role: 'Librarian',
                                                description: 'Responsible for cataloging books; morning shift librarian.',
                                            },
                                            {
                                                name: 'Ms. Rin Sothealina',
                                                role: 'Librarian',
                                                description: 'Handles book lending and provides book information; afternoon shift librarian.',
                                            },
                                            {
                                                name: 'Ms. Chre Monineath',
                                                role: 'Librarian',
                                                description:
                                                    'Manages book borrowing and repayment, and provides student support; morning shift librarian.',
                                            },
                                            {
                                                name: 'Ms. Nit Sreynoch',
                                                role: 'Librarian',
                                                description: 'Responsible for cataloging and assisting students; afternoon shift librarian.',
                                            },
                                        ]}
                                    />
                                </div>
                            </section>

                            <section>
                                <p className="pt-4 text-lg font-bold">Economics Library</p>
                                <div className="not-prose">
                                    <TeamAccordion
                                        members={[
                                            {
                                                name: 'Mrs. Ke Sambath Nita',
                                                role: 'Librarian',
                                                description:
                                                    'Responsible for borrowing and providing information to students; afternoon shift librarian.',
                                            },
                                            {
                                                name: 'Mr. Chhin Darit',
                                                role: 'Librarian',
                                                description:
                                                    'Handles book lending and provides book information to students; morning shift librarian.',
                                            },
                                            {
                                                name: 'Ms. Heang Chantalila',
                                                role: 'Librarian',
                                                description:
                                                    'Manages book borrowing and repayment, and assists students with information; afternoon shift librarian.',
                                            },
                                            {
                                                name: 'Mr. Wang Ravut',
                                                role: 'Librarian',
                                                description:
                                                    'Responsible for cataloging books and providing information to students; morning shift librarian.',
                                            },
                                        ]}
                                    />
                                </div>
                            </section>

                            <section>
                                <p className="pt-4 text-lg font-bold">Electronic Library</p>
                                <div className="not-prose">
                                    <TeamAccordion
                                        members={[
                                            {
                                                name: 'Mr. Mao Bora',
                                                role: 'Librarian',
                                                description:
                                                    'Responsible for organizing and developing library programs and maintaining management systems.',
                                            },
                                            {
                                                name: 'Mr. Heng Narath',
                                                role: 'Librarian',
                                                description: 'Manages the library’s network and internet systems.',
                                            },
                                            {
                                                name: 'Mr. Long Soeng',
                                                image: '/assets/rule_library/profiles/long_soeng.jpg',
                                                role: 'Librarian',
                                                description: 'Responsible for full-stack development of library systems and web applications.',
                                            },
                                            {
                                                image: 'ddfd/d',
                                                name: 'Mrs. Kim Soreya',
                                                role: 'Librarian',
                                                description: 'Responsible for development and maintenance of the library web application.',
                                            },
                                        ]}
                                    />
                                </div>
                            </section>
                        </section>
                    </main>
                    <aside className="hidden w-[350px] flex-shrink-0 bg-muted/60 p-6 lg:block lg:p-10 dark:bg-muted/20">
                        <div className="sticky top-20 space-y-8">
                            <TableOfContents />
                        </div>
                    </aside>
                </div>
            </div>
            <MobileTableOfContents />
        </FrontPageLayout>
    );
};

export default Index;
