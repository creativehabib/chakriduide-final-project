import { useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

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
        <AppLayout>
            <SettingsLayout>
                <div className="max-w-4xl p-6 space-y-6 shadow rounded-md bg-white">
                    <h1 className="text-xl font-bold">Robots.txt Content</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Textarea */}
                        <Textarea
                            rows={10}
                            value={form.data.robots_txt}
                            onChange={(e) => form.setData('robots_txt', e.target.value)}
                            className="font-mono"
                        />

                        <p className="text-sm text-gray-500">
                            After saving, check your robots.txt here:{' '}
                            <a href={robots_file_url} target="_blank" className="text-blue-600 underline">
                                {robots_file_url}
                            </a>
                        </p>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <label className="font-medium">Upload robots.txt file</label>
                            <Input type="file" accept=".txt" onChange={handleFileChange} />
                            <p className="text-sm text-gray-500">
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
