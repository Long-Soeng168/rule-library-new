import ScrollToTopButton2 from '@/components/Button/ScrollToTopButton2';
import Footer from '@/components/Footer/Footer';
import BottomNavbarHideAndShow from '@/components/Navbar/BottomNavbarHideAndShow';
import Navbar2 from '@/components/Navbar/Navbar2';
import NavbarHideAndShow from '@/components/Navbar/NavbarHideAndShow';
import React from 'react';

export default function FrontPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar2 />
            <NavbarHideAndShow />
            <div className="min-h-screen flex-1 bg-background">
                <main>{children}</main>
            </div>

            <Footer />

            {/* <ScrollToTopButton /> */}
            <ScrollToTopButton2 />
            <BottomNavbarHideAndShow />
        </div>
    );
}
