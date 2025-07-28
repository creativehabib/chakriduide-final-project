'use client';

import React, { useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { SaveIcon } from 'lucide-react';
import { FlashProps } from '@/types/globals';
import toast from 'react-hot-toast';

const SitemapSettings = ({ settings }: any) => {
    const { data, setData, post, processing } = useForm({
        enable_sitemap: String(settings.enable_sitemap) === '1',
        enable_indexNow: String(settings.enable_indexNow) === '1',
        sitemap_items_per_page: settings.sitemap_items_per_page || ''
    });

    const [enabled, setEnabled] = useState(settings.enable_sitemap);
    const [indexNowEnabled, setIndexNowEnabled] = useState(settings.enable_indexNow);
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Submit successfully!')
    }

    const handleToggle = () => {
        const newState = !enabled;
        setEnabled(newState);
    };
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    return (
        <AppLayout>
            <Head title="Sitemap Settings" />
            <SettingsLayout>
                <div className="p-6 rounded shadow dark:bg-gray-900 dark:text-gray-100">
                    <form className="" onSubmit={handleSubmit}>
                        {/* Enable sitemap checkbox */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="enable_sitemap"
                                checked={enabled}
                                onChange={handleToggle}
                                className="mt-1 cursor-pointer"
                            />
                            <div>
                                <label htmlFor="enable_sitemap" className="font-semibold text-sm">
                                    Enable sitemap?
                                </label>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    When enabled, a sitemap.xml file will be automatically generated and accessible at{' '}
                                    <a
                                        href={`${window.location.origin}/sitemap.xml`}
                                        className="text-blue-600 dark:text-blue-400 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {`${window.location.origin}/sitemap.xml`}
                                    </a>{' '}
                                    to help search engines better index your site.
                                </p>
                            </div>
                        </div>

                        {/* Conditionally visible section */}
                        <div
                            className={cn(
                                'transition-all duration-500 overflow-hidden',
                                enabled ? 'max-h-[1000px] mt-6' : 'max-h-0'
                            )}
                        >
                            <div className="border rounded p-4 bg-gray-50 dark:bg-gray-800">
                                {/* Description */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="font-semibold">How Sitemap Works</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Your sitemap is automatically generated and updated whenever content changes.
                                        </p>
                                    </div>
                                </div>

                                {/* Sitemap details */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                    <div className="bg-white dark:bg-gray-900 border rounded p-4 flex-1">
                                        <h3 className="text-sm font-medium mb-2">Sitemap URL</h3>
                                        <a
                                            href={`${window.location.origin}/sitemap.xml`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 underline"
                                        >
                                            View Sitemap
                                        </a>
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 border rounded p-4 flex-1">
                                        <h3 className="text-sm font-medium mb-2">Automatic Generation</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Updates automatically when content changes</p>
                                    </div>
                                </div>

                                <div className="text-green-600 dark:text-green-400 text-sm mb-4">
                                    ✅ The sitemap updates automatically whenever you create, edit, or delete content.
                                </div>

                                {/* Items per page */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Sitemap items per page</label>
                                    <Input
                                        type="number"
                                        value={data.sitemap_items_per_page}
                                        onChange={e => setData('sitemap_items_per_page', Number(e.target.value))}
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Larger values may improve performance but may cause issues for very large sites.
                                    </p>
                                </div>

                                {/* Enable IndexNow checkbox */}
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="enable_index_now"
                                        checked={indexNowEnabled}
                                        onChange={(e) => setIndexNowEnabled(e.target.checked)}
                                        className="mt-1"
                                    />
                                    <label htmlFor="enable_index_now" className="text-sm">
                                        Enable IndexNow? <br />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            Automatically notify search engines when your content is updated using IndexNow.
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Save button */}
                        <Button className="mt-6">
                            <SaveIcon/> Save settings
                        </Button>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
};

export default SitemapSettings;
