import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings',
    },
];
export default function Edit({ settings }: any) {
    const { data, setData, post, processing } = useForm({
        site_name: settings.site_name || '',
        site_email: settings.site_email || '',
        site_description: settings.site_description || '',
        cache_blog_enabled: settings.cache_blog_enabled || '1',
        cache_blog_duration: settings.cache_blog_duration || '10',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Cache Settings</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Enable Blog Cache</label>
                        <select value={data.cache_blog_enabled} onChange={e => setData('cache_blog_enabled', e.target.value)} className="border rounded px-2 py-1">
                            <option value="1">Enabled</option>
                            <option value="0">Disabled</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Blog Cache Duration (minutes)</label>
                        <input
                            type="number"
                            min="1"
                            value={data.cache_blog_duration}
                            onChange={e => setData('cache_blog_duration', e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>

                    <div>
                        <label>Site Name</label>
                        <input value={data.site_name} onChange={e => setData('site_name', e.target.value)} />
                    </div>

                    <div>
                        <label>Site Email</label>
                        <input value={data.site_email} onChange={e => setData('site_email', e.target.value)} />
                    </div>

                    <div>
                        <label>Site Description</label>
                        <textarea value={data.site_description} onChange={e => setData('site_description', e.target.value)} />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">Save Settings</button>
                        <form method="POST" action={route('admin.settings.clear')}>
                            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Clear All Cache</button>
                        </form>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
