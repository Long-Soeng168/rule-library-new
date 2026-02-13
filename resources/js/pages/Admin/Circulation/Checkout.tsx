import { ArrowRightLeft, ArrowUpCircle, Barcode, CheckCircleIcon, LoaderCircleIcon, User, X } from 'lucide-react';
import React, { useState } from 'react';

import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import { FormErrorLabel } from '@/components/Input/FormErrorLabel';
import LoadingOnPrefetch from '@/components/Loading/LoadingOnPrefetch';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm, usePage } from '@inertiajs/react';
import CheckinAndCheckoutLayout from './CheckinAndCheckoutLayout';
import RecentCheckouts from './RecentCheckouts';
import UserCheckoutSearch from './UserCheckoutSearch';

export default function CirculationDesk() {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });
    const [refreshKeyRecentCheckout, setRefreshKeyRecentCheckout] = useState(0);

    const { users_searched } = usePage<any>().props;
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedBarcode, setSelectedBarcode] = useState('');

    const { data, setData, post, processing, transform, progress, errors, clearErrors, reset } = useForm<any>({
        borrower_id: '',
        item_physical_copy_barcode: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({ ...data, borrower_id: selectedUser?.id, item_physical_copy_barcode: selectedBarcode }));

        post('/admin/circulations', {
            onSuccess: (page: any) => {
                setSelectedUser((prev: any) => ({
                    ...prev,
                    total_active_loan: (prev?.total_active_loan ?? 0) + 1,
                }));
                reset();
                setSelectedBarcode('');
                setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                setRefreshKeyRecentCheckout((prev) => prev + 1);
            },
        });
    };

    return (
        <CheckinAndCheckoutLayout>
            <AlertFlashMessage
                key={flashMessage.message}
                type={flashMessage.type}
                flashMessage={flashMessage.message}
                setFlashMessage={setFlashMessage}
            />
            {/* {errors && <AllErrorsAlert title="Errors" errors={errors} />} */}

            <div className="grid grid-cols-1 gap-8 pt-3 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-4">
                    {/* User SELECTION */}
                    {selectedUser ? (
                        <Card className="relative gap-0 border-primary/50 p-0 shadow-none">
                            <CheckCircleIcon className="pointer-events-none absolute -top-2 -right-2 size-6 bg-background text-primary/80" />
                            <CardContent className="p-3">
                                <div className="relative mb-4 flex items-center gap-4">
                                    <Avatar className="h-14 w-14 border-2 border-background">
                                        <AvatarImage
                                            src={`/assets/images/users/thumb/${selectedUser.image}`}
                                            className="overflow-hidden rounded"
                                            alt={selectedUser.name}
                                        />
                                        <AvatarFallback className="rounded bg-primary/10 font-bold text-primary">
                                            {selectedUser.name?.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-base font-semibold">{selectedUser.name}</p>
                                        <div className="from-muted-foreground text-sm">
                                            <p>
                                                <span className="text-muted-foreground">Card: </span>
                                                <span className="font-medium">{selectedUser.card_number ?? '---'}</span>
                                            </p>
                                            <p>
                                                <span className="text-muted-foreground">Phone: </span>
                                                <span className="font-medium">{selectedUser.phone ?? '---'}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 border-t pt-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-[13px]">
                                            <span className="flex items-center gap-1.5 font-medium text-muted-foreground/80">
                                                <ArrowRightLeft className="size-3.5" />
                                                Active Loans
                                            </span>
                                            <span className="h-3 w-px bg-border" /> {/* Vertical Separator */}
                                            <span className="font-bold text-primary">{selectedUser?.total_active_loan ?? 0}</span>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)} className="rounded">
                                            <X className="size-4" /> Cancel
                                        </Button>
                                    </div>

                                    {/* Optional: Expiry Date Alert if it exists in your data */}
                                    {selectedUser.expired_at && (
                                        <div className="flex items-center justify-between text-[11px] font-bold">
                                            <span className="tracking-tighter text-muted-foreground uppercase">Account Expires</span>
                                            <span className="text-orange-600 dark:text-orange-400">
                                                {new Date(selectedUser.expired_at).toLocaleDateString()}
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
                                    <User className="size-3.5 text-primary" /> 1. Select User
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 pr-0">
                                <div className="pr-3">
                                    <div className="h-5">
                                        <LoadingOnPrefetch />
                                    </div>
                                    <UserCheckoutSearch value={selectedUser?.id || ''} />
                                </div>

                                {users_searched?.length > 0 && (
                                    <div className="mt-3 max-h-80 overflow-y-scroll rounded-none bg-muted/20 pr-2.5">
                                        <div className="space-y-2">
                                            {users_searched.map((user: any) => (
                                                <div
                                                    key={user.id}
                                                    onClick={() => setSelectedUser(user)}
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
                    )}
                    {/* ITEM SCANNER */}
                    {selectedUser && (
                        <Card className="gap-0 border-primary p-0 shadow-none ring-3 ring-primary/10">
                            <CardHeader className="p-3 pt-5">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold tracking-widest text-muted-foreground uppercase">
                                    <Barcode className="size-4" /> 2. Scan Item
                                </CardTitle>
                                <CardDescription>Scan barcode to process Checkout</CardDescription>
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
                                                <ArrowUpCircle className="mr-2" />
                                            </span>
                                        )}
                                        Check Out
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Recent Checkouts PREVIEW */}
                <RecentCheckouts key={refreshKeyRecentCheckout} />
            </div>
        </CheckinAndCheckoutLayout>
    );
}
