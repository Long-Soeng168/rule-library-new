import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { RotateCwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { TooltipButton } from './TooltipButton';

const RefreshButton = ({ className }: { className?: string }) => {
    const { url } = usePage();
    const { t } = useTranslation();

    const handleRefresh = () => {
        // remove query string from current url
        const cleanUrl = url.split('?')[0];
        // router.get(cleanUrl, {}, { replace: true, preserveScroll: false, preserveState: false });
        window.location.href = window.location.pathname;
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = router.on('start', () => setLoading(true));
        const finish = router.on('finish', () => setLoading(false));

        return () => {
            start();
            finish();
        };
    }, []);

    return (
        <TooltipButton tooltip={t('Refresh and Clear Filter')}>
            <Button
                onClick={handleRefresh}
                variant="ghost"
                size="icon"
                className={cn('size-11 rounded-md bg-muted text-foreground hover:bg-primary hover:text-white', className)}
            >
                <RotateCwIcon className={`h-5 w-5 transition ${loading ? 'animate-spin' : ''}`} />
            </Button>
        </TooltipButton>
    );
};

export default RefreshButton;
