import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
 
const Feature6 = () => {
    const { keyValueData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    return (
        <div className="mt-10">
            <div className="grid grid-cols-2 justify-center gap-x-10 gap-y-16 lg:grid-cols-4">
                {keyValueData?.map((stat: any, idx: number) => {
                    const name = currentLocale === 'kh' ? stat?.name_kh || stat?.name : stat?.name;
                    const shortDescription = currentLocale === 'kh' ? stat?.short_description_kh || stat?.short_description : stat?.short_description;

                    return (
                        <div key={idx}>
                            <span className="text-5xl font-bold text-primary md:text-6xl">{stat.value}</span>
                            {name && <p className="mt-6 text-xl font-semibold">{name}</p>}
                            {shortDescription && <p className="mt-2 text-[17px] text-muted-foreground">{shortDescription}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Feature6;
