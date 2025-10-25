import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import PublishedDatePicker from '@/components/DatePicker/PublishedDatePicker';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedFile from '@/components/Form/UploadedFileDisplay';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import FormFieldMultiSelect from '@/components/Input/FormFieldMultiSelect';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { FormLabel } from '@/components/Input/FormLabel';
import FormRadioStatus from '@/components/Input/FormRadioStatus';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { postStatusData } from '@/data/status-data';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import MyCkeditor5 from '@/pages/plugins/ckeditor5/my-ckeditor5';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface ItemForm {
    code?: string;
    category_code?: string | null;

    name: string;
    name_kh?: string;

    short_description?: string;
    short_description_kh?: string;
    keywords?: string;

    long_description?: string;
    long_description_kh?: string;

    ddc?: string;
    lcc?: string;

    isbn?: string;
    eisbn?: string;
    doi?: string;

    author_ids?: { value: string; label: string }[];

    publisher_id?: string;
    published_year?: string;
    published_month?: string;
    published_day?: string;

    file_type_code?: string;
    language_code?: string;
    status?: string;

    external_link?: string;
    thumbnail?: string;

    total_views_count?: number;
}

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const { fileTypes, languages, categories, publishers, authors } = usePage<any>().props;

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');

    const [files, setFiles] = useState<File[] | null>(null);
    const [imageFiles, setImageFiles] = useState<File[] | null>(null);
    const [thumbnailFiles, setThumbnailFiles] = useState<File[] | null>(null);

    const { data, setData, post, processing, transform, progress, errors, reset } = useForm<ItemForm>({
        code: editData?.code || '',
        category_code: editData?.category_code || null,
        file_type_code: editData?.file_type_code || '',
        language_code: editData?.language_code || languages[0]?.code || '',
        status: editData?.status || postStatusData[0]?.value || '',
        name: editData?.name || '',
        name_kh: editData?.name_kh || '',
        short_description: editData?.short_description || '',
        keywords: editData?.keywords || '',
        short_description_kh: editData?.short_description_kh || '',
        long_description: editData?.long_description || '',
        long_description_kh: editData?.long_description_kh || '',

        ddc: editData?.ddc || '',
        lcc: editData?.lcc || '',

        isbn: editData?.isbn || '',
        eisbn: editData?.eisbn || '',
        doi: editData?.doi || '',

        author_ids:
            editData?.authors?.map((a: any) => {
                return { value: a.id.toString(), label: `(ID:${a.id}) ${a.name}` };
            }) || [],

        publisher_id: editData?.publisher_id?.toString() || '',
        published_year: editData?.published_year?.toString() || '',
        published_month: editData?.published_month?.toString() || '',
        published_day: editData?.published_day?.toString() || '',

        external_link: editData?.external_link || '',
        thumbnail: editData?.thumbnail || '',
        total_views_count: editData?.total_views_count || 0,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({ ...data, thumbnail: thumbnailFiles ? thumbnailFiles[0] : null, images: imageFiles || null, files: files || null }));

        if (editData?.id) {
            post(`/admin/items/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setFiles(null);
                    setThumbnailFiles(null);
                    setImageFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/admin/items', {
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
                    setThumbnailFiles(null);
                    setImageFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Items', href: '/admin/items' },
        { title: editData?.name || 'Create', href: '#' },
    ];

    const { t, currentLocale } = useTranslation();

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
                <div className="sticky top-0">
                    <Tabs value={inputLanguage} onValueChange={(val: any) => setInputLanguage(val)}>
                        <TabsList className="border bg-border/50 p-1 dark:border-white/20">
                            <TabsTrigger value="default" className="h-full dark:data-[state=active]:bg-white/20">
                                {t('Default')}
                            </TabsTrigger>
                            <TabsTrigger value="khmer" className="h-full dark:data-[state=active]:bg-white/20">
                                {t('Khmer')}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="form-field-container md:grid-cols-1">
                    {/* Required Fields */}
                    {inputLanguage == 'default' && (
                        <>
                            <FormField
                                required
                                id="name"
                                name="name"
                                label="Name"
                                value={data.name || ''}
                                onChange={(val) => setData('name', val)}
                                error={errors.name}
                            />
                            <FormFieldTextArea
                                id="short_description"
                                name="short_description"
                                label="Short Description"
                                value={data.short_description || ''}
                                onChange={(val) => setData('short_description', val)}
                                error={errors.short_description}
                            />
                        </>
                    )}

                    {inputLanguage == 'khmer' && (
                        <>
                            <FormField
                                id="name_kh"
                                name="name_kh"
                                label="Name Khmer"
                                value={data.name_kh || ''}
                                onChange={(val) => setData('name_kh', val)}
                                error={errors.name_kh}
                            />

                            <FormFieldTextArea
                                id="short_description_kh"
                                name="short_description_kh"
                                label="Short Description Khmer"
                                value={data.short_description_kh || ''}
                                onChange={(val) => setData('short_description_kh', val)}
                                error={errors.short_description_kh}
                            />
                        </>
                    )}
                </div>
                {inputLanguage == 'default' && (
                    <>
                        <div className="form-field-container">
                            <Tabs defaultValue="ddc" className="w-full rounded-lg bg-muted/80 p-4">
                                <TabsList className="border bg-border/50 p-1 dark:border-white/20">
                                    <TabsTrigger value="ddc" className="h-full dark:data-[state=active]:bg-white/20">
                                        {t('Dewey Decimal Classification')}
                                    </TabsTrigger>
                                    <TabsTrigger value="lcc" className="h-full dark:data-[state=active]:bg-white/20">
                                        {t('Library of Congress Classification')}
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="ddc">
                                    <FormField
                                        className="bg-background"
                                        id="ddc"
                                        name="ddc"
                                        label="DDC"
                                        value={data.ddc || ''}
                                        onChange={(val) => setData('ddc', val)}
                                        error={errors.ddc}
                                    />
                                </TabsContent>
                                <TabsContent value="lcc">
                                    <FormField
                                        className="bg-background"
                                        id="lcc"
                                        name="lcc"
                                        label="LCC"
                                        value={data.lcc || ''}
                                        onChange={(val) => setData('lcc', val)}
                                        error={errors.lcc}
                                    />
                                </TabsContent>
                            </Tabs>

                            <Tabs defaultValue="isbn" className="w-full rounded-lg bg-muted/80 p-4">
                                <TabsList className="border bg-border/50 p-1 dark:border-white/20">
                                    <TabsTrigger value="isbn" className="h-full dark:data-[state=active]:bg-white/20">
                                        {t('ISBN')}
                                    </TabsTrigger>
                                    <TabsTrigger value="eisbn" className="h-full dark:data-[state=active]:bg-white/20">
                                        {t('EISBN')}
                                    </TabsTrigger>
                                    <TabsTrigger value="doi" className="h-full dark:data-[state=active]:bg-white/20">
                                        {t('DOI')}
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="isbn">
                                    <FormField
                                        className="bg-background"
                                        id="isbn"
                                        name="isbn"
                                        label="ISBN"
                                        value={data.isbn || ''}
                                        onChange={(val) => setData('isbn', val)}
                                        error={errors.isbn}
                                    />
                                </TabsContent>
                                <TabsContent value="eisbn">
                                    <FormField
                                        className="bg-background"
                                        id="eisbn"
                                        name="eisbn"
                                        label="EISBN"
                                        value={data.eisbn || ''}
                                        onChange={(val) => setData('eisbn', val)}
                                        error={errors.eisbn}
                                    />
                                </TabsContent>
                                <TabsContent value="doi">
                                    <FormField
                                        className="bg-background"
                                        id="doi"
                                        name="doi"
                                        label="DOI"
                                        value={data.doi || ''}
                                        onChange={(val) => setData('doi', val)}
                                        error={errors.doi}
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div className="form-field-container md:grid-cols-1">
                            {authors?.length > 0 && (
                                <FormFieldMultiSelect
                                    label="Authors"
                                    options={[
                                        ...authors.map((item: any) => ({
                                            value: item.id?.toString(),
                                            label: `(ID:${item.id}) ${item.name}`,
                                        })),
                                    ]}
                                    value={data.author_ids || []}
                                    onChange={(objectValue) => setData('author_ids', objectValue)}
                                    error={errors.author_ids}
                                />
                            )}
                        </div>

                        <div className="form-field-container">
                            {publishers?.length > 0 && (
                                <FormCombobox
                                    name="publisher_id"
                                    label="Publisher"
                                    options={[
                                        {
                                            value: null,
                                            label: t('NA'),
                                        },
                                        ...publishers.map((item: any) => ({
                                            value: item.id?.toString(),
                                            label: `(ID:${item.id}) ${item.name}`,
                                        })),
                                    ]}
                                    value={data.publisher_id?.toString() || ''}
                                    onChange={(val) => setData('publisher_id', val)}
                                    error={errors.publisher_id}
                                />
                            )}
                            <div>
                                <PublishedDatePicker
                                    published_year={data.published_year}
                                    setPublished_year={(val) => setData('published_year', val)}
                                    published_month={data.published_month}
                                    setPublished_month={(val) => setData('published_month', val)}
                                    published_day={data.published_day}
                                    setPublished_day={(val) => setData('published_day', val)}
                                />
                            </div>
                        </div>
                    </>
                )}
                {inputLanguage == 'default' && (
                    <div className="form-field-container">
                        {categories?.length > 0 && (
                            <FormCombobox
                                name="category_code"
                                label="Category"
                                options={[
                                    {
                                        value: null,
                                        label: t('NA'),
                                    },
                                    ...categories.map((item: any) => ({
                                        value: item.code,
                                        label: `(${item.order_index}) ` + (currentLocale == 'kh' ? item.name_kh || item.name : item.name),
                                    })),
                                ]}
                                value={data.category_code || ''}
                                onChange={(val) => setData('category_code', val)}
                                error={errors.category_code}
                                description="Select the category where this item belongs to."
                            />
                        )}

                        {languages?.length > 0 && (
                            <FormCombobox
                                name="language_code"
                                label="Language"
                                options={languages.map((item: any) => ({
                                    value: item.code,
                                    label: currentLocale == 'kh' ? item.name_kh || item.name : item.name,
                                }))}
                                value={data.language_code || ''}
                                onChange={(val) => setData('language_code', val)}
                                error={errors.language_code}
                            />
                        )}
                        <FormField
                            containerClassName="col-span-2"
                            id="external_link"
                            name="external_link"
                            label="External Link"
                            value={data.external_link || ''}
                            onChange={(val) => setData('external_link', val)}
                            error={errors.external_link}
                        />
                        <FormField
                            containerClassName="col-span-2"
                            id="keywords"
                            name="keywords"
                            label="Keywords"
                            value={data.keywords || ''}
                            onChange={(val) => setData('keywords', val)}
                            error={errors.keywords}
                            description="Help users find your content more easily. Example: <b>election, candidates, political debate</b>"
                        />

                        {postStatusData?.length > 0 && (
                            <FormRadioStatus
                                name="status"
                                label="Status"
                                options={postStatusData.map((item: any) => ({
                                    value: item.value,
                                    label: t(item.label),
                                    description: t(item.description),
                                }))}
                                value={data.status || ''}
                                onChange={(val) => setData('status', val)}
                                error={errors.status}
                            />
                        )}
                    </div>
                )}
                <div className="form-field-container md:grid-cols-1">
                    {inputLanguage == 'default' && (
                        <div className="grid content-start gap-2">
                            <FormLabel label="Long Description" />
                            <MyCkeditor5 data={data.long_description || ''} setData={(val: any) => setData('long_description', val)} />
                        </div>
                    )}
                    {inputLanguage == 'khmer' && (
                        <div className="grid content-start gap-2">
                            <FormLabel label="Long Description Khmer" />
                            <MyCkeditor5 data={data.long_description_kh || ''} setData={(val: any) => setData('long_description_kh', val)} />
                        </div>
                    )}
                </div>

                {inputLanguage == 'default' && (
                    <>
                        <div>
                            <Tabs defaultValue="thumbnail" className="w-full rounded-lg bg-muted/80 p-4">
                                <TabsList className="border bg-border/50 p-1 dark:border-white/20">
                                    <TabsTrigger value="thumbnail" className="h-full dark:data-[state=active]:bg-white/20">
                                        {t('Thumbnail')}
                                    </TabsTrigger>
                                    <TabsTrigger value="images" className="h-full dark:data-[state=active]:bg-white/20">
                                        {t('Images')}
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="thumbnail">
                                    <div className={cn('form-field-container', !editData?.thumbnail && 'md:grid-cols-1')}>
                                        <FormFileUpload
                                            key={editData?.thumbnail}
                                            id="thumbnail"
                                            label="Thumbnail"
                                            files={thumbnailFiles}
                                            setFiles={setThumbnailFiles}
                                        />
                                        {editData?.thumbnail && (
                                            <UploadedImage
                                                containerClassName="mt-0"
                                                imageContainerClassName="flex-1"
                                                label="Uploaded Thumbnail"
                                                images={editData?.thumbnail}
                                                basePath="/assets/images/items/thumb/"
                                            />
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="images">
                                    <div>
                                        <FormFileUpload
                                            dropzoneOptions={{
                                                maxFiles: 100,
                                                maxSize: 1024 * 1024 * 4,
                                                multiple: true,
                                                accept: {
                                                    'image/jpeg': ['.jpeg', '.jpg'],
                                                    'image/png': ['.png'],
                                                    'image/gif': ['.gif'],
                                                    'image/webp': ['.webp'],
                                                },
                                            }}
                                            key={editData?.images?.map((img: any) => img.image || img).join('-')}
                                            id="images"
                                            label="Images"
                                            files={imageFiles}
                                            setFiles={setImageFiles}
                                        />
                                        {editData?.images?.length > 0 && (
                                            <UploadedImage
                                                label="Uploaded Images"
                                                permission="item update"
                                                images={editData?.images}
                                                deletePath="/admin/items/images/"
                                                basePath="/assets/images/items/thumb/"
                                            />
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="w-full rounded-lg bg-muted/80 p-4">
                            <div className="form-field-container mb-4">
                                {fileTypes?.length > 0 && (
                                    <FormCombobox
                                        comboboxClassName="dark:border-white/20"
                                        name="file_type_code"
                                        label="File Type"
                                        options={[
                                            {
                                                value: null,
                                                label: t('NA'),
                                            },
                                            ...fileTypes.map((item: any) => ({
                                                value: item.code,
                                                label: currentLocale == 'kh' ? item.name_kh || item.name : item.name,
                                            })),
                                        ]}
                                        value={data.file_type_code || ''}
                                        onChange={(val) => setData('file_type_code', val)}
                                        error={errors.file_type_code}
                                    />
                                )}
                            </div>
                            <FormFileUpload
                                dropzoneOptions={{
                                    maxFiles: 100,
                                    maxSize: 1024 * 1024 * 50,
                                    multiple: true,
                                    accept: {},
                                }}
                                key={editData?.files?.map((img: any) => img.image || img).join('-')}
                                id="files"
                                label="Files"
                                files={files}
                                setFiles={setFiles}
                            />
                            {editData?.files?.length > 0 && (
                                <UploadedFile
                                    fileClassName="bg-background"
                                    label="Uploaded Files"
                                    permission="item update"
                                    files={editData?.files}
                                    deletePath="/admin/items/files/"
                                    basePath="/assets/files/items/"
                                />
                            )}
                        </div>
                    </>
                )}

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
