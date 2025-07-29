import React, { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import SettingsLayout from '@/layouts/settings/layout';
import toast from 'react-hot-toast';
import { FlashProps, MediaItem } from '@/types/globals';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import SetFeaturedImage from '@/components/media-image-select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Settings', href: '/settings' },
];

export default function Edit({ settings }: any) {
    const { data, setData, post, processing } = useForm({
        site_name: settings.site_name || '',
        site_email: settings.site_email || '',
        site_description: settings.site_description || '',
        site_logo: settings.site_logo || '',
        favicon: settings.favicon || '',
        cache_blog_enabled: String(settings.cache_blog_enabled) === '1',
        cache_blog_duration: settings.cache_blog_duration || 10,
        meta_title: settings.meta_title || '',
        site_keywords: settings.site_keywords || '',
        og_image: settings.og_image || '',
        google_analytics_id: settings.google_analytics_id || '',
        google_adsense_id: settings.google_adsense_id || '',
        adsense_auto_enabled: String(settings.adsense_auto_enabled) === '1',
        meta_pixel_id: settings.meta_pixel_id || '',
        header_script: settings.header_script || '',
        footer_script: settings.footer_script || '',
        cookie_consent_text: settings.cookie_consent_text || '',
        allow_registration: String(settings.allow_registration) === '1',
        allow_indexing: String(settings.allow_indexing) === '1',
        sitemap_include_posts: String(settings.sitemap_include_posts) === '1',
        sitemap_include_pages: String(settings.sitemap_include_pages) === '1',
        sitemap_include_categories: String(settings.sitemap_include_categories) === '1'
    });

    const { flash } = usePage<{ flash: FlashProps }>().props;
    const [selectedImage] = useState<MediaItem | undefined>();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    const clearCache = () => {
        post(route('admin.settings.clear'), { preserveScroll: true });
    };

    const handleImageSelect = (media: Partial<MediaItem> | null) => {
        if (media?.id !== undefined) {
            setData('og_image', media?.path ?? null);
        }
    };

    const handleFaviconSelect = (media: Partial<MediaItem> | null) => {
        if (media?.id !== undefined) {
            setData('favicon', media?.path ?? null);
        }
    }

    const handleSiteLogo = (media: Partial<MediaItem> | null) => {
        if (media?.id !== undefined) {
            setData('site_logo', media?.path ?? null);
        }
    }
    const generateSitemap = () => {
        router.post(route('admin.settings.generate-sitemap'), {}, {
            preserveScroll: true
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
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <Card className="w-full">
                        <CardContent className="space-y-4">
                            <h2 className="text-lg font-semibold">General</h2>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Site Name</label>
                                <Input value={data.site_name} onChange={e => setData('site_name', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Site Email</label>
                                <Input value={data.site_email} onChange={e => setData('site_email', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Site Description</label>
                                <Textarea value={data.site_description} onChange={e => setData('site_description', e.target.value)} rows={3} />
                            </div>
                            <div className="space-y-1">
                                <SetFeaturedImage
                                    onSelect={handleSiteLogo}
                                    initial={selectedImage}
                                />
                                <label className="text-sm font-medium">Site Logo (Image URL or Path)</label>
                                <Input value={data.site_logo} onChange={e => setData('site_logo', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <SetFeaturedImage
                                    onSelect={handleFaviconSelect}
                                    initial={selectedImage}
                                />
                                <label className="text-sm font-medium">Favicon (Image URL or Path)</label>
                                <Input value={data.favicon} onChange={e => setData('favicon', e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Enable Blog Cache</span>
                                <Switch checked={data.cache_blog_enabled} onCheckedChange={value => setData('cache_blog_enabled', value)} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Blog Cache Duration (minutes)</label>
                                <Input type="number" min={1} value={String(data.cache_blog_duration)} onChange={e => setData('cache_blog_duration', Number(e.target.value))} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Column 2 */}
                    <Card className="w-full">
                        <CardContent className="space-y-4">
                            <h2 className="text-lg font-semibold">SEO & Ads</h2>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Meta Title</label>
                                <Input value={data.meta_title} onChange={e => setData('meta_title', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Website keywords (Job, Quiz, news etc)</label>
                                <Textarea value={data.site_keywords} onChange={e => setData('site_keywords', e.target.value)} rows={3} />
                            </div>
                            <div className="space-y-1">
                                <SetFeaturedImage
                                    onSelect={handleImageSelect}
                                    initial={selectedImage}
                                />
                                <label className="text-sm font-medium">OG Image (Image URL or Path)</label>
                                <Input value={data.og_image} onChange={e => setData('og_image', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Google Analytics ID</label>
                                <Input value={data.google_analytics_id} onChange={e => setData('google_analytics_id', e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Enable AdSense Auto Ads</span>
                                <Switch checked={data.adsense_auto_enabled} onCheckedChange={value => setData('adsense_auto_enabled', value)} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">AdSense Publisher ID (<small>ca-pub-XXXXXXXXXXXXXXX</small>)</label>
                                <Input value={data.google_adsense_id} onChange={e => setData('google_adsense_id', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Full-width fields */}
                    <Card className="md:col-span-2 w-full">
                        <CardContent className="space-y-4">
                            <h2 className="text-lg font-semibold">Advanced Settings</h2>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Meta Pixel ID</label>
                                <Input value={data.meta_pixel_id} onChange={e => setData('meta_pixel_id', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Header Script</label>
                                <Textarea value={data.header_script} onChange={e => setData('header_script', e.target.value)} rows={3} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Footer Script</label>
                                <Textarea value={data.footer_script} onChange={e => setData('footer_script', e.target.value)} rows={3} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Cookie Consent Text</label>
                                <Textarea value={data.cookie_consent_text} onChange={e => setData('cookie_consent_text', e.target.value)} rows={2} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between">
                                    <span>Allow Registration</span>
                                    <Switch checked={data.allow_registration} onCheckedChange={value => setData('allow_registration', value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Allow Indexing</span>
                                    <Switch checked={data.allow_indexing} onCheckedChange={value => setData('allow_indexing', value)} />
                                </div>
                            </div>
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

                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                        <Button type="button" onClick={generateSitemap}>Generate Sitemap</Button>
                        <Button type={'button'} variant="destructive" onClick={clearCache}>Clear Cache</Button>
                        <Button type="submit" disabled={processing}>Save Settings</Button>
                    </div>
                </form>
            </SettingsLayout>
        </AppLayout>
    );
}
