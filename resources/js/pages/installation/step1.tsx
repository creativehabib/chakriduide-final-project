import {Head, Link, usePage } from '@inertiajs/react';

import { Check, X } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import AppInstallLayout from '@/pages/installation/AppInstallLayout';

interface Props {
    phpVersion: string;
    permissions: {
        curl_enabled: boolean;
        symlink_enabled: boolean;
        db_file_write_perm: boolean;
    };
}
interface FlashProps{
    success?: string;
    error?: string;
}
const Step1  = ({ phpVersion, permissions }: Props) => {
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const phpValid = parseFloat(phpVersion) >= 8.2;
    const allValid =
        phpValid &&
        permissions.curl_enabled &&
        permissions.symlink_enabled &&
        permissions.db_file_write_perm;

    const renderItem = (label: string, valid: boolean) => (
        <li className="border py-3 px-4 font-semibold flex justify-between items-center">
            <span>{label}</span>
            {valid ? <Check className="text-green-600" /> : <X className="text-red-600" />}
        </li>
    );
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
            <Head title="Installation" />
            <div
                className="flex h-full flex-1 flex-col rounded-xl p-8 border  text-[#1b1b18] dark:text-[#EDEDEC]">
                <h1 className="text-2xl font-bold text-center mb-2">Checking file permissions</h1>
                <p className="text-center mb-3"> We ran diagnosis on your server. Review the items that have a red mark on it. <br />
                    If everything is green, you are good to go to the next step.</p>

                <ul className="shadow rounded divide-y">
                    {renderItem('PHP version 8.2 +', phpValid)}
                    {renderItem('Curl Enabled', permissions.curl_enabled)}
                    {renderItem('Symlink Enabled', permissions.symlink_enabled)}
                    {renderItem('.env File Permission', permissions.db_file_write_perm)}
                </ul>

                {allValid && (
                    <div className="text-center mt-6">

                        <Link
                            href={route('step2')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Go To Next Step
                        </Link>
                    </div>
                )}

            </div>
        </AppInstallLayout>
    );
}
export default Step1;
