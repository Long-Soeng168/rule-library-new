import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';

const NewItemButton = ({ url, permission, label = 'Add New' }: { url?: string; permission?: string; label?: string }) => {
    const hasPermission = usePermission();
    if (permission && !hasPermission(permission)) {
        return null;
    }

    const { t } = useTranslation();

    return url ? (
        <Link href={url} prefetch>
            <Button variant="default" size="lg" className="h-11 shadow-none">
                <PlusIcon /> {t(label)}
            </Button>
        </Link>
    ) : (
        <Button variant="default" size="lg" className="h-11 shadow-none">
            <PlusIcon /> {t(label)}
        </Button>
    );
};

export default NewItemButton;
