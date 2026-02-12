import { ArrowDownCircle, ArrowRightLeft, ArrowUpCircle, Barcode, LoaderCircleIcon, User, X } from 'lucide-react';
import React, { useState } from 'react';

import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import { FormErrorLabel } from '@/components/Input/FormErrorLabel';
import LoadingOnPrefetch from '@/components/Loading/LoadingOnPrefetch';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useForm, usePage } from '@inertiajs/react';
import RecentCheckins from './RecentCheckins';
import RecentCheckouts from './RecentCheckouts';
import UserCheckoutSearch from './UserCheckoutSearch';

export default function CirculationDesk() {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });
    const [refreshKeyRecentCheckout, setRefreshKeyRecentCheckout] = useState(0);
    const [refreshKeyRecentCheckin, setRefreshKeyRecentCheckin] = useState(0);

    const { users_searched } = usePage<any>().props;
    const [selectedPatron, setSelectedPatron] = useState<any>(null);
    const [selectedBarcode, setSelectedBarcode] = useState('');

    const { data, setData, post, processing, transform, progress, errors, clearErrors, reset } = useForm<any>({
        borrower_id: '',
        item_physical_copy_barcode: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({ ...data, borrower_id: selectedPatron?.id, item_physical_copy_barcode: selectedBarcode }));

        if (activeTab === 'checkout') {
            post('/admin/circulations', {
                onSuccess: (page: any) => {
                    reset();
                    setSelectedBarcode('');
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                    setRefreshKeyRecentCheckout((prev) => prev + 1);
                },
            });
        } else {
            post('/admin/circulations/checkin', {
                onSuccess: (page: any) => {
                    reset();
                    setSelectedBarcode('');
                    setSelectedPatron(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                    setRefreshKeyRecentCheckin((prev) => prev + 1);
                },
            });
        }
    };

    const [activeTab, setActiveTab] = useState('checkout');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    return (
        <div className="section-container my-10">
            <div className="mb-3 flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-2">
                        <ArrowRightLeft className="size-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Circulation</h1>
                    <div>
                        <p>Selected User ID: {selectedPatron?.id}</p>
                        <p>Selected Barcode: {selectedBarcode}</p>
                    </div>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-lg border bg-muted p-1 shadow-sm">
                    {/* Check Out Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab('checkout');
                            setSelectedPatron(null);
                            setMessage(null);
                            setSelectedBarcode('');
                            clearErrors();
                        }}
                        className={cn(
                            'inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-bold whitespace-nowrap transition-all',
                            activeTab === 'checkout'
                                ? 'bg-background text-primary shadow-sm'
                                : 'text-muted-foreground hover:bg-background/50 hover:text-foreground',
                        )}
                    >
                        Check Out
                    </button>

                    {/* Check In Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab('checkin');
                            setSelectedPatron(null);
                            setMessage(null);
                            setSelectedBarcode('');
                            clearErrors();
                        }}
                        className={cn(
                            'inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-bold whitespace-nowrap transition-all',
                            activeTab === 'checkin'
                                ? 'bg-background text-primary shadow-sm'
                                : 'text-muted-foreground hover:bg-background/50 hover:text-foreground',
                        )}
                    >
                        Check In
                    </button>
                </div>
            </div>

            <AlertFlashMessage
                key={flashMessage.message}
                type={flashMessage.type}
                flashMessage={flashMessage.message}
                setFlashMessage={setFlashMessage}
            />
            {/* {errors && <AllErrorsAlert title="Errors" errors={errors} />} */}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 pt-3">
                <div className="space-y-6 lg:col-span-4">
                    {/* PATRON SELECTION */}
                    {activeTab === 'checkout' &&
                        (selectedPatron ? (
                            <Card className="gap-0 border p-0 shadow-none">
                                <CardContent className="p-3">
                                    <div className="relative mb-4 flex items-center gap-4">
                                        <Avatar className="h-14 w-14 border-2 border-background">
                                            <AvatarImage src={selectedPatron.image} alt={selectedPatron.name} />
                                            <AvatarFallback className="rounded bg-primary/10 font-bold text-primary">
                                                {selectedPatron.name?.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <p className="text-base font-semibold">{selectedPatron.name}</p>
                                            <div className="flex flex-col gap-1">
                                                <p className="font-mono text-[10px] font-bold text-muted-foreground uppercase">
                                                    Card Number: {selectedPatron.card_number ?? '---'}
                                                </p>
                                                {selectedPatron.email && (
                                                    <p className="max-w-[180px] truncate text-[11px] text-primary/70">{selectedPatron.email}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 border-t pt-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-muted-foreground">
                                                Total Borrowed : <span className="font-semibold text-primary">--</span>
                                            </p>
                                            <Button variant="outline" size="sm" onClick={() => setSelectedPatron(null)} className="rounded">
                                                <X className="size-4" /> Cancel
                                            </Button>
                                        </div>

                                        {/* Optional: Expiry Date Alert if it exists in your data */}
                                        {selectedPatron.expired_at && (
                                            <div className="flex items-center justify-between text-[11px] font-bold">
                                                <span className="tracking-tighter text-muted-foreground uppercase">Account Expires</span>
                                                <span className="text-orange-600 dark:text-orange-400">
                                                    {new Date(selectedPatron.expired_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="gap-0 border-primary p-0 shadow-none ring-3 ring-primary/10">
                                <CardHeader className="p-3 pt-5 pb-0">
                                    <CardTitle className="flex items-center gap-2 text-sm font-black text-muted-foreground uppercase">
                                        <User className="size-3.5 text-primary" /> 1. Select Patron
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 pt-0 pr-0">
                                    <div className="pr-3">
                                        <div className="h-5">
                                            <LoadingOnPrefetch />
                                        </div>
                                        <UserCheckoutSearch value={selectedPatron?.id || ''} />
                                    </div>

                                    {users_searched?.length > 0 && (
                                        <div className="mt-3 max-h-80 overflow-y-scroll rounded-none bg-muted/20 pr-2.5">
                                            <div className="space-y-2">
                                                {users_searched.map((user: any) => (
                                                    <div
                                                        key={user.id}
                                                        onClick={() => setSelectedPatron(user)}
                                                        className="group flex cursor-pointer items-center justify-between space-x-4 rounded-md border bg-background p-3 transition-all hover:border-primary/50 hover:shadow-sm"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <Avatar className="h-9 w-9 border-muted transition-transform group-hover:scale-105">
                                                                <AvatarImage src={user.image} alt={user.name} />
                                                                <AvatarFallback className="rounded bg-primary/10 font-medium text-primary">
                                                                    {user.name?.substring(0, 2).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <p className="line-clamp-3 text-sm">{user.name}</p>
                                                                <div className="mt-1.5 flex items-center gap-2">
                                                                    <p className="font-mono text-[10px] font-bold text-muted-foreground uppercase">
                                                                        Card Number: {user.card_number ?? '---'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            className="rounded px-3 text-[12px] transition-colors hover:bg-primary hover:text-primary-foreground"
                                                        >
                                                            Select
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}

                    {/* ITEM SCANNER */}
                    {(activeTab === 'checkin' || (activeTab === 'checkout' && selectedPatron)) && (
                        <Card className="gap-0 border-primary p-0 shadow-none ring-3 ring-primary/10">
                            <CardHeader className="p-3 pt-5">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold tracking-widest text-muted-foreground uppercase">
                                    <Barcode className="size-4" /> {activeTab === 'checkout' ? '2. Scan Item' : 'Return Item'}
                                </CardTitle>
                                <CardDescription>Scan barcode to process {activeTab}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-3">
                                <form onSubmit={onSubmit} className="space-y-4">
                                    <Input
                                        autoFocus
                                        placeholder="Enter Barcode..."
                                        className={`dark:border-white/20 ${errors.item_physical_copy_barcode ? 'border-destructive ring-4 ring-destructive/10' : ''} py-6 font-mono text-lg focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20`}
                                        value={selectedBarcode}
                                        onChange={(e) => setSelectedBarcode(e.target.value)}
                                    />
                                    <FormErrorLabel error={errors.item_physical_copy_barcode || errors[0]} />
                                    {/* Checkoute */}
                                    {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                                    <Button className="h-12 w-full font-bold" type="submit">
                                        {processing ? (
                                            <span className="mr-2 size-6 animate-spin">
                                                <LoaderCircleIcon />
                                            </span>
                                        ) : (
                                            <span>
                                                {activeTab === 'checkout' ? <ArrowUpCircle className="mr-2" /> : <ArrowDownCircle className="mr-2" />}
                                            </span>
                                        )}
                                        {activeTab === 'checkout' ? 'Check Out' : 'Check In'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Recent Checkouts PREVIEW */}
                {activeTab == 'checkout' ? <RecentCheckouts key={refreshKeyRecentCheckout} /> : <RecentCheckins key={refreshKeyRecentCheckin} />}
            </div>
        </div>
    );
}
