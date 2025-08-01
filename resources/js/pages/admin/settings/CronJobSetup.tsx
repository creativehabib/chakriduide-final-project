import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import toast from 'react-hot-toast';
import { InfoIcon } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cronjob Setting', href: '/cronjob' },
];
const CronJobSetup = () => {
  const cronCommand =
    "* * * * * /usr/local/bin/php path-to-your-project/artisan schedule:run >> /dev/null 2>&1";

    const handleCopy = () => {
        navigator.clipboard.writeText(cronCommand);
        toast.success("Cronjob command copied to clipboard!");
    };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={'Cronjob'}/>
        <SettingsLayout>
            <div className="max-w-4xl space-y-6">
                {/* Instructions Card */}
                <Card className="border shadow-md">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <Input type='text' value={cronCommand} readOnly/>
                            <Button
                                onClick={handleCopy}
                                className="ml-4"
                            >
                                Copy
                            </Button>
                        </div>
                        <div className="mt-4 flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-md p-3">
                            <InfoIcon size={18} className='text-blue-700'/>
                            <p className="text-sm text-black dark:text-blue-100">
                                To run the cronjob, follow the instructions below.
                            </p>
                        </div>
                        <hr/>
                        <h2 className="font-semibold text-lg">Setting up the Cronjob</h2>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                            <li>Connect to your server via SSH or any preferred method.</li>
                            <li>
                                Open the crontab file using a text editor (e.g.,{" "}
                                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                                    crontab -e
                                </code>
                                ).
                            </li>
                            <li>
                                Add the above command to the crontab file and save it.
                            </li>
                            <li>
                                The cronjob will now run every minute and execute the specified
                                command.
                            </li>
                        </ol>
                        <hr/>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            You can learn more about cronjob from the Laravel{" "}
                            <a
                                href="https://laravel.com/docs/scheduling#running-the-scheduler"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 underline"
                            >
                                documentation
                            </a>
                            .
                        </p>
                    </CardContent>
                </Card>
            </div>
        </SettingsLayout>
    </AppLayout>
  );
};

export default CronJobSetup;
