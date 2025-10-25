import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';

export default function ResultCounts({ containerClassName }: { containerClassName?: string }) {
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;

    if (!tableData) return null;

    return (
        <div className="flex items-center gap-2 pb-6 pl-2">
            <span className="text-sm whitespace-nowrap text-muted-foreground">
                {t('Total')} : <b>{tableData.total}</b> {t('records')}
            </span>
        </div>
    );
}
