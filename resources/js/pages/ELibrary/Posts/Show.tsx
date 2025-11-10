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
                    <main className="prose w-full max-w-none pb-20 overflow-hidden p-4 dark:prose-invert prose-h2:mb-0.5 prose-h3:mb-0.5 prose-p:m-0 prose-ul:m-0">
                        <h1 className="mt-6 text-primary">Reading Week Activities and Events 2025</h1>
                        <section>
                            <h2>1. Introduction</h2>
                            <p>
                                The Royal University of Law and Economic Sciences (RULE) Library proudly organizes the annual{' '}
                                <strong>Reading Week 2025</strong>, a week-long event dedicated to promoting the joy of reading, research, and
                                lifelong learning among students and staff. This year’s theme, <em>“Read, Reflect, and Grow,”</em> encourages the
                                university community to explore new perspectives through books and knowledge sharing.
                            </p>
                            <p>
                                Reading Week aims to build a stronger reading culture within the university, inspiring curiosity, creativity, and
                                critical thinking. The event features various activities designed to engage readers, highlight the value of books, and
                                connect learning with real-world experiences.
                            </p>
                        </section>

                        <section>
                            <h2>2. Event Highlights</h2>
                            <p>
                                Throughout Reading Week, the library will host a series of interactive programs and exhibitions to encourage
                                participation from all faculties. The main highlights include:
                            </p>
                            <ul>
                                <li>
                                    <strong>Book Exhibition:</strong> Display of newly arrived books, rare collections, and recommended reading
                                    materials from different disciplines.
                                </li>
                                <li>
                                    <strong>Reading Challenge:</strong> Students are invited to read as many books as possible during the week and
                                    share short reflections or reviews.
                                </li>
                                <li>
                                    <strong>Guest Talks:</strong> Inspiring sessions with authors, researchers, and alumni discussing the importance
                                    of reading and academic success.
                                </li>
                                <li>
                                    <strong>Story Corner:</strong> A casual reading zone where participants can read aloud, share book
                                    recommendations, and discuss favorite authors.
                                </li>
                                <li>
                                    <strong>Library Tour:</strong> Guided tours to help new students understand how to make the best use of physical
                                    and digital library resources.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2>3. Participation Details</h2>
                            <p>
                                All students, faculty members, and university staff are encouraged to participate in Reading Week activities.
                                Registration for specific events, such as the Reading Challenge or Guest Talks, can be completed at the library’s
                                information desk or through the university’s online portal.
                            </p>
                            <p>
                                Certificates of participation will be awarded to active participants and winners of the Reading Challenge at the
                                closing ceremony.
                            </p>
                            <p>
                                The library team also welcomes volunteers who wish to assist in organizing or hosting activities throughout the week.
                            </p>
                        </section>

                        <section>
                            <h2>4. Schedule and Venue</h2>
                            <ul>
                                <li>
                                    <strong>Event Period:</strong> Monday, March 4 – Saturday, March 9, 2025
                                </li>
                                <li>
                                    <strong>Venue:</strong> RULE Library, Building I (Second Floor Reading Area)
                                </li>
                                <li>
                                    <strong>Opening Hours:</strong> 8:00 AM – 7:00 PM daily during the event
                                </li>
                            </ul>
                            <p>
                                Participants are encouraged to check the detailed daily schedule on the library notice board or the official
                                university website for updates on specific sessions and speaker line-ups.
                            </p>
                        </section>

                        <section>
                            <h2>5. Conclusion</h2>
                            <p>
                                Reading Week 2025 is more than an event — it is a celebration of curiosity, learning, and the shared love of books.
                                The Royal University of Law and Economic Sciences Library invites everyone to take part, discover new ideas, and
                                strengthen their passion for reading.
                            </p>
                            <p>Together, let’s make Reading Week 2025 a meaningful and inspiring experience for our entire university community.</p>
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
