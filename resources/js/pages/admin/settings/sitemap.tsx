import React, { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlashProps } from '@/types/globals';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Sitemap', href: '/settings/sitemap' },
];

const Sitemap = ({settings} : any) => {
    const { data, setData, post, processing } = useForm({
        sitemap_include_posts: String(settings.sitemap_include_posts) === '1',
        sitemap_include_pages: String(settings.sitemap_include_pages) === '1',
        sitemap_include_categories: String(settings.sitemap_include_categories) === '1',
        enable_sitemap: String(settings.enable_sitemap) === '1',
        enable_indexNow: String(settings.enable_indexNow) === '1',
        sitemap_items_per_page: settings.sitemap_items_per_page || ''
    })
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
        console.log(data)
    };
    const generateSitemap = () => {
        router.post(route('admin.settings.generate-sitemap'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sitemap generated successfully!');
            },
        });
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={'Sitemap'}/>
                <SettingsLayout>
                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardContent>
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold">Sitemap Settings</h2>
                                    <div className="flex items-center justify-between">
                                        <span>Include Posts</span>
                                        <Switch checked={data.sitemap_include_posts} onCheckedChange={value => setData('sitemap_include_posts', value)} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Include Pages</span>
                                        <Switch checked={data.sitemap_include_pages} onCheckedChange={value => setData('sitemap_include_pages', value)} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Include Categories</span>
                                        <Switch checked={data.sitemap_include_categories} onCheckedChange={value => setData('sitemap_include_categories', value)} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold">Sitemap Settings</h2>

                                    <div className="flex items-center justify-between">
                                        <span>Enable Sitemap?</span>
                                        <Switch checked={data.enable_sitemap} onCheckedChange={val => setData('enable_sitemap', val)} />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span>Enable IndexNow?</span>
                                        <Switch checked={data.enable_indexNow} onCheckedChange={val => setData('enable_indexNow', val)} />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">Sitemap items per page</label>
                                        <Input type="number" value={data.sitemap_items_per_page} onChange={e => setData('sitemap_items_per_page', Number(e.target.value))} />
                                    </div>

                                    <div className="pt-4">
                                        <Button type={'button'} onClick={generateSitemap}>Generate Sitemap Manually</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Actions */}
                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                            <Button type="submit" disabled={processing}>Save Settings</Button>
                        </div>
                    </form>
                </SettingsLayout>
            </AppLayout>
        </>
    );
};

export default Sitemap;
