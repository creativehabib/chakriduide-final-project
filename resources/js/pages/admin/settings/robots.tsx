import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import type { BreadcrumbItem } from '@/types';
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Robots TXT Edit', href: '/robots-txt' },
];

interface RobotsProps {
    robots_txt: string;
    robots_file_url: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function RobotsTXTSettings({ robots_txt, robots_file_url }: RobotsProps) {
    const { flash } = usePage<{ flash: FlashProps }>().props;

    const form = useForm({
        robots_txt: robots_txt || 'User-agent: *\nDisallow:',
        robots_file: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) form.setData('robots_file', e.target.files[0]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('robots.txt.update'), {
            forceFormData: true,
            preserveScroll: true,
            preserveState: true,
        });
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Robots TXT Edit'}/>
            <SettingsLayout>
                <div className="max-w-4xl p-6 space-y-6 shadow-md border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Robots.txt Content</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Textarea */}
                        <div>
                            <Textarea
                                rows={10}
                                value={form.data.robots_txt}
                                onChange={(e) => form.setData('robots_txt', e.target.value)}
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 font-mono w-full min-h-[200px]"
                            />
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                After saving, check your robots.txt here:{' '}
                                <a href={robots_file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
                                    {robots_file_url}
                                </a>
                            </p>
                        </div>

                        {/* File Upload section */}
                        <div className="space-y-2">
                            <label className="font-medium text-gray-900 dark:text-gray-100">Upload robots.txt file</label>
                            <Input type="file" accept=".txt" onChange={handleFileChange} className={'cursor-pointer'}/>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Uploading a file will overwrite the text content above.
                            </p>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <Button disabled={form.processing}>Save</Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
