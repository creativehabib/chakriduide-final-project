import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { LucideMail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import AppInstallLayout from '@/pages/installation/AppInstallLayout';
interface FlashProps{
    success?: string;
    error?: string;
}
type FormData = {
    username: string;
    email: string;
    purchase_code: string;
}
const Step2 = () => {
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const { data, setData, post, processing, errors } = useForm<FormData>({
        username: '',
        email: '',
        purchase_code: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verify.purchase'));
    };
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
            <Head title="Step 2" />
            <div className="flex h-full flex-1 flex-col rounded-xl border p-8 text-[#1b1b18] dark:text-[#EDEDEC]">
                <h1 className="mb-2 text-center text-2xl font-bold">Verify purchase</h1>
                <p className="mb-3 text-center">Fill this form with valid purchase code and author username</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="website-admin" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Author Username
                        </label>
                        <div className="flex">
                            <span className="rounded-e-0 inline-flex items-center rounded-s-md border border-e-0 border-gray-300 px-3 text-sm text-gray-900 dark:border-gray-600 dark:text-gray-400">
                                <User/>
                            </span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent"
                                placeholder="elonmusk"
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <div className="flex">
                            <span className="rounded-e-0 inline-flex items-center rounded-s-md border border-e-0 border-gray-300 px-3 text-sm text-gray-900 dark:border-gray-600 dark:text-gray-400">
                                <LucideMail/>
                            </span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent"
                                placeholder="email@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="purchase_code" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Purchase Code
                        </label>
                        <div>
                            <input
                                type="text"
                                id="purchase_code"
                                name="purchase_code"
                                value={data.purchase_code}
                                onChange={(e) => setData('purchase_code', e.target.value)}
                                className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent"
                                placeholder="Enter your purchase code"
                            />
                            {errors.purchase_code && <p className="text-red-500 text-sm mt-1">{errors.purchase_code}</p>}
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-block rounded-sm border cursor-pointer border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            {processing ? 'Verifying...' : 'Verify'}
                        </button>
                    </div>
                </form>
            </div>
        </AppInstallLayout>
    );
};

export default Step2;
