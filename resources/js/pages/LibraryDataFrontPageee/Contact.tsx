import ContactFormSubmit from '@/components/Form/ContactFormSubmit';
import useTranslation from '@/hooks/use-translation';
import LibraryDataFrontPageLayout from '@/layouts/LibraryDataFrontPageLayout';
import { Head, usePage } from '@inertiajs/react';
import { Clock2Icon, Globe2Icon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

const Contact = () => {
    const { website_info } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    return (
        <LibraryDataFrontPageLayout>
            <Head>
                <title>Contact Us</title>
                <meta
                    name="description"
                    content="Get in touch with Cambodia Library Association. Contact our team for inquiries about libraries and services across Cambodia."
                />
            </Head>

            <div className="flex min-h-screen items-start justify-center">
                <div className="mx-auto w-full max-w-screen-xl px-4">
                    <div className="my-20 grid gap-16 md:gap-10 lg:grid-cols-1">
                        {/* Contact Info */}
                        <div className="grid h-auto grid-cols-1 content-start gap-x-8 gap-y-12 sm:grid-cols-2">
                            <div className="flex flex-col items-center justify-center sm:items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <MapPinIcon />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">{t('Address')}</h3>
                                <p className="font-medium text-primary max-w-lg">
                                    {currentLocale === 'kh' ? website_info?.address_kh || website_info?.address : website_info?.address}
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center sm:items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <PhoneIcon />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">{t('Phone')}</h3>
                                <p className="font-medium text-primary">{website_info?.phone}</p>
                            </div>

                            <div className="flex flex-col items-center justify-center sm:items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <MailIcon />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">{t('Email')}</h3>
                                <a className="font-medium text-primary" href={`mailto:${website_info?.email}`}>
                                    {website_info?.email}
                                </a>
                            </div>

                            <div className="flex flex-col items-center justify-center sm:items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Clock2Icon />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">{t('Working Hours')}</h3>
                                <p className="font-medium text-primary">
                                    {currentLocale === 'kh'
                                        ? website_info?.working_hours_kh || website_info?.working_hours
                                        : website_info?.working_hours}
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        {/* <ContactFormSubmit /> */}
                    </div>
                </div>
            </div>

            {/* Google Map */}
            {/* <div>
                <iframe
                    className="h-[400px] w-full"
                    src={application_info.google_map}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Cambodia Library Location"
                ></iframe>
            </div> */}
        </LibraryDataFrontPageLayout>
    );
};

export default Contact;
