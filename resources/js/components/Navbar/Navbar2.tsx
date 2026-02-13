import { NavbarLogo2 } from '../Logo/NavbarLogo2';
import LibrarySearchSheet from '../Search/LibrarySearchSheet';
import { SwitchDarkModeSmoothAnimated } from '../Switch/SwitchDarkModeSmoothAnimated';
import NavLanguage from './NavLanguage';
import { NavMenu2 } from './NavMenu2';
import { NavSheet } from './NavSheet';

const Navbar2 = () => {
    return (
        <div>
            {/* Start Top Navbar */}
            <div className="min-[1000px]:border-b">
                <div className="section-container mx-auto w-full py-4">
                    <div className="flex h-full items-center justify-between">
                        <div className="max-w-full">
                            <NavbarLogo2 />
                        </div>

                        <div className="max-[1000px]:hidden">
                            <NavMenu2 />
                        </div>
                        <div className="max-[1000px]:hidden">
                            <div className="flex items-center gap-3">
                                <LibrarySearchSheet />
                                <SwitchDarkModeSmoothAnimated />
                                <NavLanguage />

                                {/* Start Mobile Menu */}
                                <div className="hidden max-[1000px]:block">
                                    <NavSheet />
                                </div>
                                {/* End Mobile Menu */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Top Navbar */}

            {/* Start Bottom Navbar */}
            <div className="z-30 mx-auto w-full border-b bg-background pb-4 min-[1000px]:hidden">
                <nav className="section-container">
                    <div className="flex h-full items-center justify-between">
                        <div></div>

                        <div className="flex items-center gap-3">
                            <LibrarySearchSheet />
                            <SwitchDarkModeSmoothAnimated />
                            <NavLanguage />

                            {/* Start Mobile Menu */}
                            <div className="hidden max-[1000px]:block">
                                <NavSheet />
                            </div>
                            {/* End Mobile Menu */}
                        </div>
                    </div>
                </nav>
            </div>
            {/* End Bottom Navbar */}
        </div>
    );
};

export default Navbar2;
