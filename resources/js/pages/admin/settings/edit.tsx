import React, { useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import SettingsLayout from '@/layouts/settings/layout';
import toast from 'react-hot-toast';
import { FlashProps } from '@/types/globals';

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
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        google_analytics_id: settings.google_analytics_id || '',
        meta_pixel_id: settings.meta_pixel_id || '',
        header_script: settings.header_script || '',
        footer_script: settings.footer_script || '',
        cookie_consent_text: settings.cookie_consent_text || '',
        allow_registration: settings.allow_registration ? '1' : '0',
        allow_indexing: settings.allow_indexing ? '1' : '0',
        robots_txt: settings.robots_txt || '',
    });

    const { flash } = usePage<{ flash: FlashProps }>().props;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    const clearCache = () => {
        post(route('admin.settings.clear'), {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            <SettingsLayout>
                <div className="p-6 max-w-4xl mx-auto space-y-6">
                    <h1 className="text-2xl font-bold mb-6">Site & SEO Settings</h1>
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
                            <input type="number" min="1" value={data.cache_blog_duration} onChange={e => setData('cache_blog_duration', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        </div>

                        <div>
                            <label>Site Name</label>
                            <input value={data.site_name} onChange={e => setData('site_name', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        </div>

                        <div>
                            <label>Site Email</label>
                            <input value={data.site_email} onChange={e => setData('site_email', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        </div>

                        <div>
                            <label>Site Description</label>
                            <textarea value={data.site_description} onChange={e => setData('site_description', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        </div>

                        <div>
                            <label>Meta Title</label>
                            <input value={data.meta_title} onChange={e => setData('meta_title', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        </div>

                        <div>
                            <label>Meta Description</label>
                            <textarea value={data.meta_description} onChange={e => setData('meta_description', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        </div>

                        <div>
                            <label>Google Analytics ID</label>
                            <input value={data.google_analytics_id} onChange={e => setData('google_analytics_id', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        </div>

                        <div>
                            <label>Meta Pixel ID</label>
                            <input value={data.meta_pixel_id} onChange={e => setData('meta_pixel_id', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        </div>

                        <div>
                            <label>Header Script</label>
                            <textarea value={data.header_script} onChange={e => setData('header_script', e.target.value)} className="border rounded px-2 py-1 w-full" rows={3} />
                        </div>

                        <div>
                            <label>Footer Script</label>
                            <textarea value={data.footer_script} onChange={e => setData('footer_script', e.target.value)} className="border rounded px-2 py-1 w-full" rows={3} />
                        </div>

                        <div>
                            <label>Cookie Consent Text</label>
                            <textarea value={data.cookie_consent_text} onChange={e => setData('cookie_consent_text', e.target.value)} className="border rounded px-2 py-1 w-full" rows={2} />
                        </div>

                        <div>
                            <label>Allow Registration</label>
                            <select value={data.allow_registration} onChange={e => setData('allow_registration', e.target.value)} className="border rounded px-2 py-1">
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>

                        <div>
                            <label>Allow Indexing</label>
                            <select value={data.allow_indexing} onChange={e => setData('allow_indexing', e.target.value)} className="border rounded px-2 py-1">
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>

                        <div>
                            <label>Custom robots.txt</label>
                            <textarea value={data.robots_txt} onChange={e => setData('robots_txt', e.target.value)} className="border rounded px-2 py-1 w-full" rows={6} />
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">Save Settings</button>
                            <button type="button" onClick={clearCache} className="bg-red-600 text-white px-4 py-2 rounded">Clear All Cache</button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
