import { Maximize2Icon, Minimize2Icon, RotateCwSquareIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Label } from '../ui/label';

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

type ImageInput = string | { image: string; id: number };

interface UploadedImageProps {
    label?: string;
    containerClassName?: string;
    imageContainerClassName?: string;
    imageClassName?: string;
    images?: ImageInput | ImageInput[];
    basePath?: string; // default: "/assets/images/thumb/"
}

export default function ({
    containerClassName,
    imageContainerClassName,
    imageClassName,
    label = 'Images',
    images,
    basePath = '/assets/images/thumb/',
}: UploadedImageProps) {
    if (!images) return null;

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
            // overlayRender={() => (
            //     <div className="absolute right-0 bottom-0 left-0 z-10 flex bg-transparent">
            //         <div className="z-20 mx-auto flex w-full items-center justify-center text-sm text-white lg:justify-end">
            //             <div className="flex w-full justify-center gap-2 bg-black/50 p-2">
            //                 <button className="flex h-[44px] w-40 cursor-pointer flex-row items-center justify-center gap-1 bg-white/10 py-2 transition hover:bg-white/20">
            //                     <BookOpenIcon size={20} />
            //                     <span>Read PDF</span>
            //                 </button>
            //                 <button className="flex h-[44px] w-40 cursor-pointer flex-row items-center justify-center gap-1 bg-white/10 py-2 transition hover:bg-white/20">
            //                     <FileDownIcon size={20} />
            //                     <span>Download PDF</span>
            //                 </button>
            //             </div>
            //         </div>
            //     </div>
            // )}
        >
            <div className='grid content-start gap-2 mt-4'>
                <Label>{label}</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {images.map((objectImage, idx) => (
                        <PhotoView key={idx} src={basePath + objectImage.image}>
                            <div className="group relative overflow-hidden cursor-pointer rounded border bg-muted/20">
                                <img
                                    src={basePath + 'thumb/' + objectImage.image}
                                    alt={`Image ${idx + 1}`}
                                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Optional hover overlay */}
                                <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        </PhotoView>
                    ))}
                </div>
            </div>
        </PhotoProvider>
    );
}
