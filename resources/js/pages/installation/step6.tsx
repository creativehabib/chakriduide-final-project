import { Head, usePage } from '@inertiajs/react';
import AppInstallLayout from '@/pages/installation/AppInstallLayout';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

interface FlashProps {
    success?: string;
    error?: string;
}


const Step6 = () => {
    const { flash } = usePage<{flash: FlashProps}>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppInstallLayout>
            <Head title="Done" />
            <div className="rounded-xl border p-6 ">
                <h1 className="mb-2 text-center text-2xl font-bold">🎉 Congratulations!</h1>
                <p className="mb-3 text-center">
                    You have successfully completed the installation process. You may now proceed to the site.
                </p>
                <div className="text-center space-x-4 mt-4">
                    <a href="/" className="btn btn-primary">Go to Frontend Website</a>
                    <a href="/login" className="btn btn-success">Login to Admin panel</a>
                </div>
            </div>
        </AppInstallLayout>
    );
};

export default Step6;
