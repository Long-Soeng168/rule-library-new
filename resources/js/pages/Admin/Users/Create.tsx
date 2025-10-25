import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import GenerateRandomEmailButton from '@/components/Button/GerateRandomEmailButton';
import SubmitButton from '@/components/Button/SubmitButton';
import CheckboxCardOption from '@/components/Card/CheckboxCardOption';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormErrorLabel } from '@/components/Input/FormErrorLabel';
import { FormField } from '@/components/Input/FormField';
import { FormLabel } from '@/components/Input/FormLabel';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import RadioSelect from '@/components/Section/RadioSelect';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface UserForm {
    name: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
    password_confirmation: string;
    image: string | null;
    roles: string[];
}

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [files, setFiles] = useState<File[] | null>(null);
    const { roles, auth } = usePage<any>().props;

    const { data, setData, post, processing, transform, progress, errors, reset } = useForm<UserForm>({
        name: editData?.name || '',
        email: editData?.email || '',
        phone: editData?.phone || '',
        gender: editData?.gender || '',
        password: '',
        password_confirmation: '',
        image: editData?.image || null,
        roles: editData?.roles?.map((r: any) => r.name) || [],
    });

    const handleRoleToggle = (roleName: string) => {
        const updatedRoles = data.roles.includes(roleName) ? data.roles.filter((r) => r !== roleName) : [...data.roles, roleName];

        setData('roles', updatedRoles);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({ ...data, image: files ? files[0] : null }));

        if (editData?.id) {
            post(`/admin/users/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/admin/users', {
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Users', href: '/admin/users' },
        { title: editData?.name || 'Create', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={onSubmit} className="form">
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />
                {errors && <AllErrorsAlert title="Please fix the following errors" errors={errors} />}
                <div className="form-field-container">
                    <FormField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        error={errors.name}
                    />

                    <FormField
                        required
                        type="number"
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        value={data.phone}
                        onChange={(val) => setData('phone', val)}
                        error={errors.phone}
                    />

                    <div>
                        <FormField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            value={data.email}
                            onChange={(val) => setData('email', val)}
                            error={errors.email}
                        />
                        <GenerateRandomEmailButton setData={setData} />
                    </div>

                    <div className="grid content-start gap-2">
                        <FormLabel id="gender" label="Gender" required={true} />
                        <RadioSelect
                            name="gender"
                            options={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                                { label: 'Other', value: 'other' },
                            ]}
                            value={data.gender}
                            onChange={(val) => setData('gender', val)}
                        />
                        <FormErrorLabel error={errors.gender} />
                    </div>

                    <FormField
                        required={editData?.id ? false : true}
                        id="password"
                        name="password"
                        label={editData?.id ? 'New Password' : 'Password'}
                        value={data.password}
                        onChange={(val) => setData('password', val)}
                        error={errors.password}
                        type="password"
                    />

                    <FormField
                        required={editData?.id ? false : true}
                        id="password_confirmation"
                        name="password_confirmation"
                        label={editData?.id ? 'Confirm New Password' : 'Confirm Password'}
                        value={data.password_confirmation}
                        onChange={(val) => setData('password_confirmation', val)}
                        error={errors.password_confirmation}
                        type="password"
                    />
                </div>

                {roles.length > 0 && (
                    <div className="grid content-start gap-2">
                        <FormLabel id="roles" label="Roles" required />
                        <div className="flex flex-wrap gap-3">
                            {roles.map(({ name }: { name: string }) => {
                                const isSuperAdmin = auth.roles.includes('Super Admin');
                                const isAdmin = auth.roles.includes('Admin');

                                // If not Super Admin:
                                if (!isSuperAdmin) {
                                    // Admins can't assign Super Admin
                                    if (isAdmin && name === 'Super Admin') return null;

                                    // Non-admins can't assign Admin or Super Admin
                                    if (!isAdmin && (name === 'Super Admin' || name === 'Admin')) return null;
                                }

                                return (
                                    <CheckboxCardOption
                                        className="max-w-[130px] rounded py-2"
                                        checkBoxClassName="top-0 right-0"
                                        key={name}
                                        option={{ value: name, label: name, icon: () => null }} // no icon needed for roles
                                        checked={data.roles.includes(name)}
                                        onChange={(value) => handleRoleToggle(value)}
                                    />
                                );
                            })}
                        </div>
                        <FormErrorLabel error={errors.roles} />
                    </div>
                )}

                <div>
                    <FormFileUpload key={editData?.image} id="profile-image" label="Profile Image" files={files} setFiles={setFiles} />
                    {editData?.image && <UploadedImage label="Uploaded Image" images={editData?.image} basePath="/assets/images/users/thumb/" />}
                </div>

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
