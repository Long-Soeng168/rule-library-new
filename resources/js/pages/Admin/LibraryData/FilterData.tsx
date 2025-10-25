import CheckboxCardOption from '@/components/Card/CheckboxCardOption';
import FilterSheet from '@/components/Filter/FilterSheet';
import { FormLabel } from '@/components/Input/FormLabel';
import { ComboboxSelect } from '@/components/Section/ComboboxSelect';
import useTranslation from '@/hooks/use-translation';
import { router, usePage } from '@inertiajs/react';
import { CheckCircleIcon, CircleCheckBigIcon, ClockIcon, ListChecksIcon, OctagonAlertIcon, ReplaceAllIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

const FilterData = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const { libraryTypes, fundingTypes, classTypes, annualBudgetTypes, librarySystemsTypes, targetUserTypes, targetAgeUserTypes, provincesData } =
        usePage<any>().props;

    const initialQueryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

    const [filters, setFilters] = useState({
        library_type_code: initialQueryParams.get('library_type_code') || '',
        source_of_funding_type_code: initialQueryParams.get('source_of_funding_type_code') || '',
        class_type_code: initialQueryParams.get('class_type_code') || '',
        annual_budget_type_code: initialQueryParams.get('annual_budget_type_code') || '',
        library_system_type_code: initialQueryParams.get('library_system_type_code') || '',
        province_code: initialQueryParams.get('province_code') || '',
        trashed: initialQueryParams.get('trashed') || '',
        status: initialQueryParams.get('status') || '',

        target_user_type_code: initialQueryParams.get('target_user_type_code') || '',
        target_age_user_type_code: initialQueryParams.get('target_age_user_type_code') || '',
    });

    const updateFilters = (updates: Partial<typeof filters>) => {
        const newFilters = { ...filters, ...updates };
        setFilters(newFilters);
        applyFilter(newFilters);
    };

    const applyFilter = (appliedFilters?: typeof filters) => {
        if (!currentPath) return;
        const f = appliedFilters ?? filters;
        const queryParams = new URLSearchParams(window.location.search);

        Object.entries(f).forEach(([key, value]) => {
            if (value) {
                queryParams.set(key, value);
            } else {
                queryParams.delete(key);
            }
        });

        queryParams.set('page', '1');

        router.get(`${currentPath}?${queryParams.toString()}`, {}, { preserveState: true, preserveScroll: true });
    };

    const resetFilter = () =>
        updateFilters({
            library_type_code: '',
            source_of_funding_type_code: '',
            class_type_code: '',
            annual_budget_type_code: '',
            library_system_type_code: '',
            province_code: '',
            trashed: '',
            status: '',
            target_user_type_code: '',
            target_age_user_type_code: '',
        });

    const { t, currentLocale } = useTranslation();

    const trashedOptions = [
        { value: '', label: t('Without Trashed'), icon: CircleCheckBigIcon },
        { value: 'with', label: t('With Trashed'), icon: ReplaceAllIcon },
        { value: 'only', label: t('Only Trashed'), icon: Trash2Icon },
    ];
    const statusOptions = [
        { value: 'pending', label: t('Pending'), icon: ClockIcon },
        { value: 'approved', label: t('Approved'), icon: CheckCircleIcon },
        { value: 'rejected', label: t('Rejected'), icon: OctagonAlertIcon },
        { value: '', label: t('All'), icon: ListChecksIcon },
    ];

    const typeFilters = [
        { key: 'library_type_code', label: 'Library Type', options: libraryTypes },
        { key: 'source_of_funding_type_code', label: 'Funding Type', options: fundingTypes },
        { key: 'class_type_code', label: 'Class Type', options: classTypes },
        { key: 'annual_budget_type_code', label: 'Annual Budget', options: annualBudgetTypes },
        { key: 'library_system_type_code', label: 'Library System', options: librarySystemsTypes },

        { key: 'target_user_type_code', label: 'Target User', options: targetUserTypes },
        { key: 'target_age_user_type_code', label: 'Target Age User', options: targetAgeUserTypes },
    ];

    return (
        <FilterSheet handleFilter={applyFilter} resetFilter={resetFilter} isFiltered={Object.values(filters).some((val) => !!val)}>
            {/* Trashed Filter */}
            <div className="mb-4">
                <FormLabel label={t('Trashed')} />
                <div className="mt-1 grid w-full max-w-sm grid-cols-3 gap-3">
                    {trashedOptions.map((option) => (
                        <CheckboxCardOption
                            key={option.value}
                            option={option}
                            checked={filters.trashed === option.value}
                            onChange={(value) => updateFilters({ trashed: value })}
                        />
                    ))}
                </div>
            </div>
            {/* Status Filter */}
            <div className="mb-4">
                <FormLabel label={t('Status')} />
                <div className="mt-1 grid w-full max-w-sm grid-cols-3 gap-2">
                    {statusOptions.map((option) => (
                        <CheckboxCardOption
                            key={option.value}
                            option={option}
                            checked={filters.status === option.value}
                            className="flex items-center justify-center gap-1 space-y-0 p-2"
                            checkBoxClassName="-top-2 -right-2"
                            labelClassName="text-[12px] sm:text-[14px]"
                            onChange={(value) => updateFilters({ status: value })}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <FormLabel label={t('Province')} />
                <ComboboxSelect
                    options={[
                        { value: '', label: t('All') },
                        ...provincesData.map((province: any) => ({
                            value: province.code,
                            label: (currentLocale === 'kh' ? province.name_kh || province.name : province.name) + ` (${province.libraries_count})`,
                        })),
                    ]}
                    value={filters.province_code || ''}
                    onChange={(val) => updateFilters({ province_code: val })}
                    placeholder={t('Select Province...')}
                    searchPlaceholder={t('Search Province...')}
                    className="mt-1"
                />
            </div>

            {/* Dynamic Type Filters */}
            {typeFilters.map((filter) => (
                <div key={filter.key} className="mb-4">
                    <FormLabel label={t(filter.label)} />
                    <ComboboxSelect
                        options={[
                            { value: '', label: t('All') },
                            ...filter.options.map((item: any) => ({
                                value: item.code,
                                label: (currentLocale === 'kh' ? item.name_kh || item.name : item.name) + ` (${item.libraries_count})`,
                            })),
                        ]}
                        value={filters[filter.key as keyof typeof filters]}
                        onChange={(val) => updateFilters({ [filter.key]: val })}
                        placeholder={`Select ${filter.label}...`}
                        searchPlaceholder={`Search ${filter.label}...`}
                        className="mt-1"
                    />
                </div>
            ))}
        </FilterSheet>
    );
};

export default FilterData;
