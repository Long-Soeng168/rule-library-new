import LibraryAbout from '@/components/Section/LibraryAbout';
import LibraryInfo from '@/components/Section/LibraryInfo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import useTranslation from '@/hooks/use-translation';
import LibraryDataFrontPageLayout from '@/layouts/LibraryDataFrontPageLayout';
import { stripHtml } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';
import { ImageOff, MailIcon, SmartphoneIcon } from 'lucide-react';
 

export default function Show() {
    const { showData, app_url } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();

    const aboutText = stripHtml(showData?.about || '');
    const description = aboutText.length > 160 ? aboutText.slice(0, 157) + '…' : aboutText;

    return (
        <LibraryDataFrontPageLayout>
            <Head>
                <title>{showData?.name_of_library}</title>
                <meta name="description" content={description} />
                {/* Open Graph for social sharing */}
                <meta property="og:title" content={showData?.name_of_library} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${app_url}/assets/images/library_data/thumb/${showData.logo}`} />
                {/* Twitter card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={showData?.name_of_library} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={`${app_url}/assets/images/library_data/thumb/${showData.logo}`} />
            </Head>

            <div className="section-container py-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">{t('Home')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/libraries">{t('Libraries')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-foreground font-medium' href={`/libraries/${showData?.id}`}>{showData?.name_of_library}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="section-container relative rounded outline-hidden">
                {/* Banner Image */}
                <div className="overflow-hidden rounded">
                    <Avatar>
                        <AvatarImage
                            className="aspect-[21/8] object-cover"
                            src={`/assets/images/library_data/${showData.banner}`}
                            alt={showData.name_of_library}
                        />
                        <AvatarFallback className="hidden aspect-[21/5] w-full rounded-none bg-primary md:flex">
                            <ImageOff className="size-10 text-primary-foreground opacity-20" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                {/* <img src="/assets/sample_images/banners/library_banner.jpg" alt="Library Banner" className="h-full w-full object-cover" /> */}

                <div className="bottom-0 left-0 flex gap-4 rounded py-6 text-foreground md:absolute md:right-0 md:mx-4 md:bg-gradient-to-t md:from-black/70 md:to-transparent md:p-6 md:pt-20 md:text-white">
                    <img
                        src={`/assets/images/library_data/thumb/${showData.logo}`}
                        alt={showData.name_of_library}
                        className="size-20 rounded-full border-4 bg-white border-white object-cover shadow md:size-24"
                    />

                    {/* Info */}
                    <div className="space-y-1 text-left text-sm md:space-y-2 md:text-base">
                        <h1 className="text-lg font-semibold md:text-2xl">{showData?.name_of_library}</h1>
                        {showData.phone && (
                            <p className="flex items-center gap-2">
                                <SmartphoneIcon size={18} /> {showData.phone}
                            </p>
                        )}
                        {showData.email && (
                            <p className="flex items-center gap-2">
                                <MailIcon size={18} /> {showData.email}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="section-container mb-20">
                <div className="space-y-8">
                    <LibraryInfo />
                    <LibraryAbout />
                </div>
                {/* <Tabs defaultValue="about" className="w-full">
                    <TabsList className="my-6 w-full justify-start rounded-none border-b bg-background p-0">
                        <TabsTrigger
                            value="about"
                            className="h-full rounded-none border-b-2 border-transparent bg-background text-lg data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            About Library
                        </TabsTrigger>
                        <TabsTrigger
                            value="infos"
                            className="h-full rounded-none border-b-2 border-transparent bg-background text-lg data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            Infos
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="about">
                        <LibraryInfo data={data} />
                        <LibraryAbout />
                    </TabsContent>
                    <TabsContent value="infos">
                        <LibraryInfo data={data} />
                    </TabsContent>
                </Tabs> */}
            </div>
        </LibraryDataFrontPageLayout>
    );
}
