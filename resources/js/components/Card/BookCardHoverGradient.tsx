import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronRightIcon } from 'lucide-react';
import { styled } from 'styled-components';
import { Badge } from '../ui/badge';
import { Link } from '@inertiajs/react';
const BookCardHoverGradient = ({
    badgeText,
    title,
    subTitle,
    image_url,
}: {
    badgeText?: string;
    title?: string;
    subTitle?: string;
    image_url?: string;
}) => {
    
    
    return (
        <StyledWrapper>
            <div className="relative">
                <Link
                    href={`/resources/theses/1`}
                    className="btn group relative z-10 h-full w-full overflow-hidden rounded-md border-2 border-background shadow hover:translate-[-8px] active:hover:translate-0 hover:border-transparent dark:border-border dark:hover:border-transparent"
                >
                    <div className="h-full border-none bg-background text-foreground">
                        <img src={image_url} alt={title} className="aspect-[7/10] w-full border-b bg-transparent object-cover" />
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="p-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="w-full text-start">
                                                <p className="line-clamp-2 text-base leading-normal font-medium text-foreground">
                                                    អភិបាលកិច្ចសាជីវកម្មក្នុងការបោះផ្សាយលក់មូលបត្រជាសាធារណៈរបស់ក្រុមហ៊ុន PPSEZ
                                                </p>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            className="w-[var(--radix-tooltip-trigger-width)] max-w-none bg-true-primary text-true-primary"
                                            side="top"
                                        >
                                            <p className="text-base leading-normal text-primary-foreground dark:text-white">
                                                អភិបាលកិច្ចសាជីវកម្មក្នុងការបោះផ្សាយលក់មូលបត្រជាសាធារណៈរបស់ក្រុមហ៊ុន PPSEZ
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                {/* <p className="card__description">{subTitle}</p> */}
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="rounded">
                                        ធនាគារ និងហិរញ្ញវត្ថុ
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-2 bottom-2 flex size-5 translate-x-6 items-center justify-center rounded bg-primary/10 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hover:scale-150">
                        <ChevronRightIcon className="size-5 font-bold" />
                    </div>
                </Link>
                <div className="absolute inset-0 z-0 h-full w-full rounded-lg border border-dashed border-foreground"></div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-size: 300% 300%;
        cursor: pointer;
        backdrop-filter: blur(1rem);
        transition: 0.5s;
        background-origin: border-box;
        background-clip: content-box, border-box;
    }
    .btn:hover {
        animation: gradient_301 2s ease infinite;
        background-image: linear-gradient(#212121, #212121), linear-gradient(137.48deg, #ffdb3b 10%, #fe53bb 45%, #8f51ea 67%, #0044ff 87%);
    }

    @keyframes gradient_301 {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }
`;

export default BookCardHoverGradient;
