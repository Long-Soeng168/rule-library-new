import { cn } from '@/lib/utils';
import { BookOpenIcon, FileDownIcon, Maximize2Icon, Minimize2Icon, RotateCwSquareIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const images = [
    'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(107).jpg',
    // 'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(106).jpg',
    // 'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(105).jpg',
    // 'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(104).jpg',
    // 'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(103).jpg',
    // 'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(102).jpg',
    // 'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(101).jpg',
    // 'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(108).jpg',
    // 'https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(109).jpg',
];

export default function BookImagesGallery({
    images = ['https://www.elibrary-rule.com/assets/images/theses/Thesis2019%20(107).jpg'],
    mainImageClassName = '',
}) {
    const [mainImage, setMainImage] = useState(images[0]);

    const [visible, setVisible] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        const doc = document;
        const el = doc.documentElement;

        if (!doc.fullscreenElement) {
            el.requestFullscreen().then(() => setIsFullScreen(true));
        } else {
            doc.exitFullscreen().then(() => setIsFullScreen(false));
        }
    };

    const handleVisibleChange = (visible: boolean) => {
        // when PhotoView closes, exit fullscreen if still active
        if (!visible && document.fullscreenElement) {
            document.exitFullscreen().then(() => setIsFullScreen(false));
        }
    };

    return (
        <PhotoProvider
            onVisibleChange={handleVisibleChange}
            maskOpacity={0.9}
            toolbarRender={({ scale, onScale, rotate, onRotate }) => (
                <div className="flex h-[44px] items-center gap-2 bg-black/50 px-2">
                    <button onClick={() => onScale(scale + 0.25)} className="bg-white/15 p-2 hover:bg-white/20">
                        <ZoomInIcon size={16} />
                    </button>
                    <button onClick={() => onScale(scale - 0.25)} className="bg-white/15 p-2 hover:bg-white/20">
                        <ZoomOutIcon size={16} />
                    </button>
                    <button onClick={() => onRotate(rotate + 90)} className="bg-white/15 p-2 hover:bg-white/20">
                        <RotateCwSquareIcon size={16} />
                    </button>
                    <button onClick={toggleFullScreen} className="bg-white/15 p-2 hover:bg-white/20">
                        {isFullScreen ? <Minimize2Icon size={16} /> : <Maximize2Icon size={16} />}
                    </button>
                </div>
            )}
            overlayRender={() => (
                <div className="absolute right-0 bottom-0 left-0 z-10 flex bg-transparent">
                    <div className="z-20 mx-auto flex w-full items-center justify-center text-sm text-white lg:justify-end">
                        <div className="flex w-full justify-center gap-2 bg-black/50 p-2">
                            <button className="flex h-[44px] w-40 cursor-pointer flex-row items-center justify-center gap-1 bg-white/10 py-2 transition hover:bg-white/20 active:scale-95">
                                <FileDownIcon size={20} />
                                <span>Download PDF</span>
                            </button>
                            <button className="flex h-[44px] w-40 cursor-pointer flex-row items-center justify-center gap-1 bg-white/10 py-2 transition hover:bg-white/20 active:scale-95">
                                <BookOpenIcon size={20} />
                                <span>Read PDF</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        >
            <div className="flex flex-col items-center">
                {/* Main image */}
                {images.map((src, idx) => (
                    <PhotoView key={idx} src={src}>
                        <img
                            src={src}
                            alt="Main preview"
                            className={cn(
                                `max-h-[800px] w-full max-w-sm cursor-pointer rounded-none border border-primary object-cover ${src === mainImage ? '' : 'hidden'}`,
                                mainImageClassName,
                            )}
                        />
                    </PhotoView>
                ))}

                {/* Thumbnails */}
                {images?.length > 1 && (
                    <ScrollArea className="w-full rounded-md whitespace-nowrap">
                        <div className="flex w-full justify-center space-x-3 py-3">
                            {images.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`Thumbnail ${idx + 1}`}
                                    onClick={() => setMainImage(src)}
                                    className={`h-20 w-20 shrink-0 cursor-pointer rounded border object-cover transition-all ${
                                        src === mainImage ? 'border-primary' : 'opacity-70 hover:opacity-100'
                                    }`}
                                />
                            ))}
                        </div>

                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                )}
            </div>
        </PhotoProvider>
    );
}
