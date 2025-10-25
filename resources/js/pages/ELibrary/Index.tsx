import SpaceAnimateButton from '@/components/Button/SpaceAnimateButton';
import LibrarySearch from '@/components/Search/LibrarySearch';
import ResourceMainCategory from '@/components/Section/ResourceMainCategory';
import ScrollCardSection from '@/components/Section/ScrollCardSection';
import ELibraryLayout from '@/layouts/ELibraryLayout';
import { Link } from '@inertiajs/react';

const ELibraryPage = () => {
    return (
        <ELibraryLayout>
            <section className="mb-40">
                <div className="section-container my-10">
                    <LibrarySearch />
                </div>
                <div>
                    <ResourceMainCategory />
                </div>

                {/* Theses */}
                <ScrollCardSection title="Theses" />
                <ScrollCardSection title="Publications" />
                <ScrollCardSection title="Journals" />
            </section>
            <div className="section-container my-20 flex justify-center">
                <Link href={`/resources`}>
                    <SpaceAnimateButton title="See All Resources" />
                </Link>
            </div>
        </ELibraryLayout>
    );
};

export default ELibraryPage;
