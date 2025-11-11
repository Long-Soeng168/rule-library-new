import { MobileTableOfContents } from '@/components/TableContent/mobile-table-of-contents';
import { TableOfContents } from '@/components/TableContent/table-of-contents';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import ELibraryLayout from '@/layouts/ELibraryLayout';

const About = () => {
    return (
        <ELibraryLayout>
            <ScrollProgress className="top-0 h-[4px]" />
            <div className="section-container">
                <div className="relative z-10 mx-auto flex max-w-7xl divide-x divide-border px-4 md:px-0">
                    <div className="pointer-events-none absolute left-1/2 mx-auto h-full w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 border-x border-border p-0 lg:w-full" />
                    <main className="prose w-full max-w-none overflow-hidden p-4 pb-20 dark:prose-invert prose-h2:mb-0.5 prose-h3:mb-0.5 prose-p:m-0 prose-ul:m-0">
                        <h1 className="mt-6 text-primary">ការប្រជុំបច្ចេកទេសបណ្ណាល័យនៅថ្ងៃទី២៤ ខែតុលា ឆ្នាំ២០២៥</h1>
                        <section>
                            <h2>1. Introduction</h2>
                            <p>
                                On October 24, 2025, the Royal University of Law and Economic Sciences (RULE) Library held a technical meeting to
                                discuss ongoing and upcoming projects, review library operations, and coordinate strategies to improve services for
                                students, faculty, and researchers.
                            </p>
                            <p>
                                The meeting gathered librarians, IT staff, and administrative personnel to address key topics including library
                                management systems, digital resources, and service quality enhancements. This session reflects the university’s
                                commitment to modernizing library operations and ensuring that library services remain effective and user-friendly.
                            </p>
                        </section>

                        <section>
                            <h2>2. Participants</h2>
                            <p>The technical meeting included the following participants:</p>
                            <ul>
                                <li>Library Director and senior librarians</li>
                                <li>IT and digital services staff</li>
                                <li>Administrative and support personnel from the library</li>
                                <li>Representatives from partner institutions for collaborative projects</li>
                            </ul>
                            <p>
                                All participants contributed their expertise to review current systems and propose solutions for better workflow and
                                service delivery.
                            </p>
                        </section>

                        <section>
                            <h2>3. Meeting Agenda</h2>
                            <p>The main agenda of the meeting included:</p>
                            <ul>
                                <li>Review of the library management system and its current functionalities</li>
                                <li>Updates on digital resources and e-library access for students and staff</li>
                                <li>Plans for cataloging new arrivals and improving the search system</li>
                                <li>Discussion on staff training and professional development programs</li>
                                <li>Coordination of upcoming events such as Reading Week and academic workshops</li>
                            </ul>
                        </section>

                        <section>
                            <h2>4. Key Outcomes</h2>
                            <p>The meeting concluded with several important decisions and action plans, including:</p>
                            <ul>
                                <li>Implementation of a more efficient cataloging workflow to process new materials faster</li>
                                <li>Enhancement of digital library platforms to allow remote access for students and faculty</li>
                                <li>Scheduling periodic training sessions for library staff on new systems and tools</li>
                                <li>Strengthening collaboration with partner institutions for access to additional resources and databases</li>
                            </ul>
                            <p>
                                These initiatives are expected to improve library operations, increase accessibility of resources, and provide a
                                better experience for all library users.
                            </p>
                        </section>

                        <section>
                            <h2>5. Conclusion</h2>
                            <p>
                                The technical meeting held on October 24, 2025, was a productive session that highlighted the library’s commitment to
                                continuous improvement. By addressing both operational and technological aspects, RULE Library aims to support the
                                academic and research needs of the university community effectively.
                            </p>
                            <p>
                                Regular technical meetings like this ensure that the library remains up-to-date with modern practices and continues to
                                provide high-quality services for students, faculty, and researchers.
                            </p>
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
        </ELibraryLayout>
    );
};

export default About;
