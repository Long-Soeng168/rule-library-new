import ScrollToTopButton2 from '@/components/Button/ScrollToTopButton2';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

export default function LibraryDataFrontPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="min-h-screen flex-1 bg-background">
                <main>{children}</main>
            </div>

            <Footer />

            {/* <ScrollToTopButton /> */}
            <ScrollToTopButton2 />
        </div>
    );
}
