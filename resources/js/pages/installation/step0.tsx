import AppInstallLayout from '@/pages/installation/AppInstallLayout';
import { Head, Link } from '@inertiajs/react';
import { Check } from 'lucide-react';

export default function Step0() {
    return (
        <AppInstallLayout>
            <Head title="Installation" />
            <div
                className="flex h-full flex-1 flex-col rounded-xl p-8 border  text-[#1b1b18] dark:text-[#EDEDEC]">
                <h1 className="text-2xl font-bold text-center mb-2">Welcome to the Installation</h1>
                <p className="text-center mb-3">You will need to know the following items before proceeding.</p>
                <ul className="text-left mt-4">
                    <li className="flex items-center gap-2 px-2 py-2 border"><Check/> Database Name</li>
                    <li className="flex items-center gap-2 px-2 py-2 border"><Check/> Database User</li>
                    <li className="flex items-center gap-2 px-2 py-2 border"><Check/> Database Password</li>
                    <li className="flex items-center gap-2 px-2 py-2 border"><Check/> Database Host (usually localhost)</li>
                </ul>
                <p className="mt-3">
                    During the installation process, we will check if the files that are needed to be written
                    (<strong>.env file</strong>) have
                    <strong>write permission</strong>. We will also check if <strong>curl</strong> are enabled on your
                    server or not.
                </p>
                <p>
                    Gather the information mentioned above before hitting the start installation button. If you are
                    ready....
                </p>
                <br />
                <div className="text-center">
                    <Link
                        href={route('step1')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Start Installation
                    </Link>
                </div>
            </div>
        </AppInstallLayout>
    )
}
