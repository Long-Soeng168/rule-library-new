import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import useTranslation from '@/hooks/use-translation';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { FormCheckboxSelect } from '@/components/Input/FormCheckboxSelect';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { FormRadioSelect } from '@/components/Input/FormRadioSelect';
import { NavbarLogo } from '@/components/Logo/NavbarLogo';
import TextMiddleSeparator from '@/components/Separator/TextMiddleSeparator';
import usePermission from '@/hooks/use-permission';
import { cn } from '@/lib/utils';
import { FormLabel } from '@/components/Input/FormLabel';
import MyCkeditor5Mini from '@/pages/plugins/ckeditor5/my-ckeditor5-mini';

interface TypeLibraryDataForm {
    year_of_data: string;
    user_id: string;

    // General info
    name_of_library: string;
    affiliated_institution: string;
    source_of_funding_type_code: string;
    class_type_code: string;
    library_type_code: string;
    province_code: string;
    facebook_name: string;
    website: string;
    phone: string;
    email: string;
    address: string;

    // Target users & age groups
    target_users: string[];
    age_target_users: string[];

    // Statistics
    memberships: string;
    partnerships: string;
    programs_and_projects: string;
    annual_budget_type_code: string;

    // Staff
    full_time_staff_count: string | '';
    part_time_staff_count: string | '';
    volunteers_count: string | '';
    physical_size: string | '';

    // Facilities
    table_count: string | '';
    chair_count: string | '';
    computer_count: string | '';
    meeting_room_count: string | '';
    library_system_type_code: string;

    // Collections
    monograph_title_count: string | '';
    monograph_count: string | '';
    serial_title_count: string | '';
    article_databases_count: string | '';

    // Usage
    user_count: string | '';
    unique_user_count: string | '';
    unique_borrower_count: string | '';
    book_or_material_borrowed_count: string | '';
    online_resource_downloaded_count: string | '';
    online_resource_viewer_count: string | '';
    website_visitor_count: string | '';
    facebook_like_count: string | '';

    // Files
    logo: string;
    banner: string;
    about: string;

    status: string;
}

export default function Register({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const {
        auth,
        users,
        provincesData,
        libraryTypes,
        fundingTypes,
        classTypes,
        targetUserTypes,
        targetAgeUserTypes,
        annualBudgetTypes,
        librarySystemsTypes,
    } = usePage<any>().props;

    const [files, setFiles] = useState<File[] | null>(null);
    const [bannerfiles, setBannerFiles] = useState<File[] | null>(null);

    const { data, setData, post, processing, transform, progress, errors, reset } = useForm<TypeLibraryDataForm>({
        year_of_data: editData?.year_of_data?.toString() || new Date().getFullYear().toString(),
        user_id: auth?.user.id || '',
        name_of_library: editData?.name_of_library || '',
        affiliated_institution: editData?.affiliated_institution || '',
        source_of_funding_type_code: editData?.source_of_funding_type_code || '',
        class_type_code: editData?.class_type_code || '',
        library_type_code: editData?.library_type_code || '',
        province_code: editData?.province_code || '',
        facebook_name: editData?.facebook_name || '',
        website: editData?.website || '',
        phone: editData?.phone || '',
        email: editData?.email || '',
        address: editData?.address || '',

        target_users: editData?.target_users_pluck || ([] as string[]),
        age_target_users: editData?.age_target_users_pluck || ([] as string[]),

        memberships: editData?.memberships || '',
        partnerships: editData?.partnerships || '',
        programs_and_projects: editData?.programs_and_projects || '',
        annual_budget_type_code: editData?.annual_budget_type_code || '',
        full_time_staff_count: editData?.full_time_staff_count || '',
        part_time_staff_count: editData?.part_time_staff_count || '',
        volunteers_count: editData?.volunteers_count || '',
        physical_size: editData?.physical_size || '',
        table_count: editData?.table_count || '',
        chair_count: editData?.chair_count || '',
        computer_count: editData?.computer_count || '',
        meeting_room_count: editData?.meeting_room_count || '',
        library_system_type_code: editData?.library_system_type_code || '',

        monograph_title_count: editData?.monograph_title_count || '',
        monograph_count: editData?.monograph_count || '',
        serial_title_count: editData?.serial_title_count || '',
        article_databases_count: editData?.article_databases_count || '',

        user_count: editData?.user_count || '',
        unique_user_count: editData?.unique_user_count || '',
        unique_borrower_count: editData?.unique_borrower_count || '',
        book_or_material_borrowed_count: editData?.book_or_material_borrowed_count || '',
        online_resource_downloaded_count: editData?.online_resource_downloaded_count || '',
        online_resource_viewer_count: editData?.online_resource_viewer_count || '',
        website_visitor_count: editData?.website_visitor_count || '',
        facebook_like_count: editData?.facebook_like_count || '',

        logo: editData?.logo || '',
        banner: editData?.banner || '',
        about: editData?.about || '',

        status: editData?.status || 'pending',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        transform(() => ({ ...data, logo: files ? files[0] : null, banner: bannerfiles ? bannerfiles[0] : null }));

        if (editData?.id) {
            post(`/register-library/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setFiles(null);
                    setBannerFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/register-library', {
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
                    setBannerFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Register Library', href: '/register-library' },
        { title: editData?.name || 'Create', href: '#' },
    ];

    const { t, currentLocale } = useTranslation();
    const hasPermission = usePermission();

    return (
        <>
            <form onSubmit={onSubmit} className="form section-container">
                <div className="py-6">
                    <NavbarLogo />
                </div>
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />
                {errors && <AllErrorsAlert title="Please fix the following errors" errors={errors} />}

                <div>
                    {/* I. General Information */}
                    <section className="rounded-t-lg">
                        <h1 className="mb-6 text-start text-2xl font-bold">
                            {t("Register Library")} <span className="text-primary">({data.year_of_data})</span>
                        </h1>

                        <h2 className="mb-4 text-xl font-semibold">{t("I. General Information")}</h2>

                        <div className="form-field-container mb-4">
                            <FormField
                                disable={!hasPermission('library_data create')}
                                id="year_of_data"
                                name="year_of_data"
                                label="Year of data"
                                value={data.year_of_data}
                                onChange={(val) => setData('year_of_data', val)}
                                error={errors.year_of_data}
                                description="Year this data represents."
                            />
                            <FormCombobox
                                disable={!hasPermission('library_data create')}
                                name="user_id"
                                label="User"
                                options={users.map((item: any) => ({
                                    value: item.id,
                                    label: `${item.name} (${item.email})`,
                                }))}
                                value={data.user_id || ''}
                                onChange={(val) => setData('user_id', val)}
                                error={errors.user_id}
                                description="User Library that this data belong to."
                            />
                        </div>
                        <div className="form-field-container">
                            {/* Name of library */}
                            <FormField
                                id="name_of_library"
                                name="name_of_library"
                                label="Name of library"
                                value={data.name_of_library}
                                onChange={(val) => setData('name_of_library', val)}
                                error={errors.name_of_library}
                            />

                            {/* Affiliated institution */}
                            <FormField
                                id="affiliated_institution"
                                name="affiliated_institution"
                                label="Affiliated institution"
                                value={data.affiliated_institution}
                                onChange={(val) => setData('affiliated_institution', val)}
                                error={errors.affiliated_institution}
                            />

                            {/* Funding */}
                            <FormRadioSelect
                                name="source_of_funding_type_code"
                                label="Sources of funding"
                                options={fundingTypes.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? item.name_kh || item.name : item.name,
                                }))}
                                value={data.source_of_funding_type_code}
                                onChange={(val) => setData('source_of_funding_type_code', val)}
                                error={errors?.source_of_funding_type_code}
                            />

                            {/* Class */}
                            <FormRadioSelect
                                name="class_type_code"
                                label="Class"
                                options={classTypes.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? item.name_kh || item.name : item.name,
                                }))}
                                value={data.class_type_code}
                                onChange={(val) => setData('class_type_code', val)}
                                error={errors?.class_type_code}
                            />

                            {/* Library type */}
                            <FormCombobox
                                name="library_type"
                                label="Type"
                                options={libraryTypes.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? item.name_kh || item.name : item.name,
                                }))}
                                value={data.library_type_code || ''}
                                onChange={(val) => setData('library_type_code', val)}
                                error={errors.library_type_code}
                            />

                            {/* Province */}
                            <FormCombobox
                                name="province_code"
                                label="Province"
                                options={provincesData.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? item.name_kh || item.name : item.name,
                                }))}
                                value={data.province_code || ''}
                                onChange={(val) => setData('province_code', val)}
                                error={errors.province_code}
                            />

                            {/* Target users */}
                            <FormCheckboxSelect
                                name="target_users"
                                label="Target users"
                                options={targetUserTypes.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? item.name_kh || item.name : item.name,
                                }))}
                                value={data.target_users}
                                onChange={(vals) => setData('target_users', vals)}
                                error={errors?.target_users}
                            />

                            {/* Age groups */}
                            <FormCheckboxSelect
                                name="age_target_users"
                                label="Ages of target users"
                                options={targetAgeUserTypes.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? item.name_kh || item.name : item.name,
                                }))}
                                value={Array.isArray(data.age_target_users) ? data.age_target_users : []}
                                onChange={(vals: string[]) => setData('age_target_users', vals)}
                                error={errors?.age_target_users}
                            />

                            {/* Facebook */}
                            <FormField
                                id="facebook_name"
                                name="facebook_name"
                                label="Facebook Name"
                                value={data.facebook_name}
                                onChange={(val) => setData('facebook_name', val)}
                                error={errors.facebook_name}
                            />

                            {/* Website */}
                            <FormField
                                id="website"
                                name="website"
                                label="Website"
                                value={data.website}
                                onChange={(val) => setData('website', val)}
                                error={errors.website}
                            />

                            {/* Phone */}
                            <FormField
                                id="phone"
                                name="phone"
                                label="Phone number"
                                value={data.phone}
                                onChange={(val) => setData('phone', val)}
                                error={errors.phone}
                            />

                            {/* Email */}
                            <FormField
                                id="email"
                                name="email"
                                label="Email"
                                value={data.email}
                                onChange={(val) => setData('email', val)}
                                error={errors.email}
                            />

                            <div className="md:col-span-2">
                                <FormField
                                    id="address"
                                    name="address"
                                    label="Address (Village, Commune, District, Province)"
                                    value={data.address}
                                    onChange={(val) => setData('address', val)}
                                    error={errors?.address}
                                />
                            </div>
                        </div>

                        {/* Address */}
                    </section>

                    {/* II. Statistics */}
                    <section className="mt-10">
                        <h2 className="mb-4 text-xl font-semibold">{t("II. Statistics")}</h2>
                        {/* Membership & Partnerships */}
                        <div className="form-field-container">
                            <FormField
                                id="memberships"
                                name="memberships"
                                label="Membership (Write the name of groups/organizations)"
                                value={data.memberships}
                                onChange={(val) => setData('memberships', val)}
                                error={errors.memberships}
                                description="e.g : National Library Association, Phnom Penh Book Club"
                            />
                            <FormField
                                id="partnerships"
                                name="partnerships"
                                label="Partnerships (write the names of partners)"
                                value={data.partnerships}
                                onChange={(val) => setData('partnerships', val)}
                                error={errors.partnerships}
                                description="e.g : Ministry of Education, Local NGO XYZ"
                            />

                            {/* Programs */}
                            <div className="md:col-span-2">
                                <FormFieldTextArea
                                    id="programs_and_projects"
                                    name="programs_and_projects"
                                    label="Programs and other special projects"
                                    value={data.programs_and_projects}
                                    onChange={(val) => setData('programs_and_projects', val)}
                                    error={errors?.programs_and_projects}
                                    description="e.g : Summer reading program, Mobile library outreach, Digital literacy workshops"
                                />
                            </div>
                            <div className="md:col-span-2">
                                {/* Annual Budget */}
                                <FormRadioSelect
                                    name="annual_budget_type_code"
                                    label="Annual budget (purchasing library books, materials, furniture and equipment, cost for programs and services)"
                                    options={annualBudgetTypes.map((item: any) => ({
                                        value: item.code,
                                        label: currentLocale === 'kh' ? item.name_kh || item.name : item.name,
                                    }))}
                                    value={data.annual_budget_type_code}
                                    onChange={(val) => setData('annual_budget_type_code', val)}
                                    error={errors?.annual_budget_type_code}
                                />
                            </div>
                        </div>

                        {/* Staff Statistics */}
                        <TextMiddleSeparator title="Staff Statistics" className="mt-10" />
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                id="full_time_staff_count"
                                name="full_time_staff_count"
                                label="Number of Full-time staff members"
                                type="number"
                                value={data.full_time_staff_count}
                                onChange={(val) => setData('full_time_staff_count', val)}
                                error={errors.full_time_staff_count}
                            />
                            <FormField
                                id="part_time_staff_count"
                                name="part_time_staff_count"
                                label="Number of Part-time staff members"
                                type="number"
                                value={data.part_time_staff_count}
                                onChange={(val) => setData('part_time_staff_count', val)}
                                error={errors.part_time_staff_count}
                            />
                            <FormField
                                id="volunteers_count"
                                name="volunteers_count"
                                label="Number of Volunteers/Interns"
                                type="number"
                                value={data.volunteers_count}
                                onChange={(val) => setData('volunteers_count', val)}
                                error={errors.volunteers_count}
                            />
                            <FormField
                                id="physical_size"
                                name="physical_size"
                                label="Physical size (sqm)"
                                type="number"
                                value={data.physical_size}
                                onChange={(val) => setData('physical_size', val)}
                                error={errors.physical_size}
                            />
                        </div>
                        {/* Facilities */}
                        <TextMiddleSeparator title="Statistics of Facilities" className="mt-10" />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                id="table_count"
                                name="table_count"
                                label="Number of tables"
                                type="number"
                                value={data.table_count}
                                onChange={(val) => setData('table_count', val)}
                                error={errors.table_count}
                            />
                            <FormField
                                id="chair_count"
                                name="chair_count"
                                label="Number of chairs/seating spaces"
                                type="number"
                                value={data.chair_count}
                                onChange={(val) => setData('chair_count', val)}
                                error={errors.chair_count}
                            />
                            <FormField
                                id="computer_count"
                                name="computer_count"
                                label="Number of computers"
                                type="number"
                                value={data.computer_count}
                                onChange={(val) => setData('computer_count', val)}
                                error={errors.computer_count}
                            />
                            <FormField
                                id="meeting_room_count"
                                name="meeting_room_count"
                                label="Number of meeting rooms"
                                type="number"
                                value={data.meeting_room_count}
                                onChange={(val) => setData('meeting_room_count', val)}
                                error={errors.meeting_room_count}
                            />
                            <FormRadioSelect
                                name="library_system_type_code"
                                label="Library management system"
                                options={librarySystemsTypes.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale === 'kh' ? item.name_kh || item.name : item.name,
                                }))}
                                value={data.library_system_type_code}
                                onChange={(val) => setData('library_system_type_code', val)}
                                error={errors?.library_system_type_code}
                            />
                        </div>
                        {/* Collections */}
                        <TextMiddleSeparator title="Statistics of Collections" className="mt-10" />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                id="monograph_title_count"
                                name="monograph_title_count"
                                label="Number of monograph titles (books, publications …)"
                                type="number"
                                value={data.monograph_title_count}
                                onChange={(val) => setData('monograph_title_count', val)}
                                error={errors.monograph_title_count}
                            />
                            <FormField
                                id="monograph_count"
                                name="monograph_count"
                                label="Number of monographs (books, publications …)"
                                type="number"
                                value={data.monograph_count}
                                onChange={(val) => setData('monograph_count', val)}
                                error={errors.monograph_count}
                            />
                            <FormField
                                id="serial_title_count"
                                name="serial_title_count"
                                label="Number of serial titles"
                                type="number"
                                value={data.serial_title_count}
                                onChange={(val) => setData('serial_title_count', val)}
                                error={errors.serial_title_count}
                            />
                            <FormField
                                id="article_databases_count"
                                name="article_databases_count"
                                label="Number of article databases"
                                type="number"
                                value={data.article_databases_count}
                                onChange={(val) => setData('article_databases_count', val)}
                                error={errors.article_databases_count}
                            />
                        </div>

                        {/* Usage */}
                        <TextMiddleSeparator title="Usage Statistics" className="mt-10" />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                id="user_count"
                                name="user_count"
                                label="Number of users"
                                type="number"
                                value={data.user_count}
                                onChange={(val) => setData('user_count', val)}
                                error={errors.user_count}
                            />
                            <FormField
                                id="unique_user_count"
                                name="unique_user_count"
                                label="Number of unique users"
                                type="number"
                                value={data.unique_user_count}
                                onChange={(val) => setData('unique_user_count', val)}
                                error={errors.unique_user_count}
                            />
                            <FormField
                                id="unique_borrower_count"
                                name="unique_borrower_count"
                                label="Number of unique borrowers"
                                type="number"
                                value={data.unique_borrower_count}
                                onChange={(val) => setData('unique_borrower_count', val)}
                                error={errors.unique_borrower_count}
                            />
                            <FormField
                                id="book_or_material_borrowed_count"
                                name="book_or_material_borrowed_count"
                                label="Number of books/materials borrowed"
                                type="number"
                                value={data.book_or_material_borrowed_count}
                                onChange={(val) => setData('book_or_material_borrowed_count', val)}
                                error={errors.book_or_material_borrowed_count}
                            />
                            <FormField
                                id="online_resource_downloaded_count"
                                name="online_resource_downloaded_count"
                                label="Number of online resources loaned/downloaded"
                                type="number"
                                value={data.online_resource_downloaded_count}
                                onChange={(val) => setData('online_resource_downloaded_count', val)}
                                error={errors.online_resource_downloaded_count}
                            />
                            <FormField
                                id="online_resource_viewer_count"
                                name="online_resource_viewer_count"
                                label="Number of online resources’ viewers"
                                type="number"
                                value={data.online_resource_viewer_count}
                                onChange={(val) => setData('online_resource_viewer_count', val)}
                                error={errors.online_resource_viewer_count}
                            />
                            <FormField
                                id="website_visitor_count"
                                name="website_visitor_count"
                                label="Number of website visitors"
                                type="number"
                                value={data.website_visitor_count}
                                onChange={(val) => setData('website_visitor_count', val)}
                                error={errors.website_visitor_count}
                            />
                            <FormField
                                id="facebook_like_count"
                                name="facebook_like_count"
                                label="Number of Facebook likes"
                                type="number"
                                value={data.facebook_like_count}
                                onChange={(val) => setData('facebook_like_count', val)}
                                error={errors.facebook_like_count}
                            />
                        </div>
                    </section>
                </div>
                <div className={cn('form-field-container', !editData?.logo && 'md:grid-cols-1')}>
                    <FormFileUpload
                        key={editData?.logo}
                        id="logo"
                        label="Logo (512 x 512 pixels)"
                        files={files}
                        setFiles={setFiles}
                        error={errors?.logo}
                    />
                    {editData?.logo && (
                        <UploadedImage
                            containerClassName="mt-0"
                            imageContainerClassName="flex-1"
                            label="Uploaded Logo"
                            images={editData?.logo}
                            basePath="/assets/images/library_data/thumb/"
                        />
                    )}
                </div>

                <div className={cn('form-field-container', !editData?.banner && 'md:grid-cols-1')}>
                    <FormFileUpload
                        key={editData?.banner}
                        id="banner"
                        label="Banner (2100 x 800 pixels)"
                        files={bannerfiles}
                        setFiles={setBannerFiles}
                        error={errors?.banner}
                    />
                    {editData?.banner && (
                        <UploadedImage
                            containerClassName="mt-0"
                            imageContainerClassName="flex-1"
                            label="Uploaded Banner"
                            images={editData?.banner}
                            basePath="/assets/images/library_data/thumb/"
                        />
                    )}
                </div>
                <div className="form-field-container mt-4 md:grid-cols-1">
                    <div>
                        <FormLabel label="About" />
                        <MyCkeditor5Mini data={data.about || ''} setData={(val: any) => setData('about', val)} />
                    </div>
                </div>
                {progress && <ProgressWithValue value={progress.percentage} position="start" />}
                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </>
    );
}
